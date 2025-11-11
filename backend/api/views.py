from django.shortcuts import render
from django.core.cache import cache
import logging
from sentry_sdk import capture_message, capture_exception
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, ProductSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Products

logger = logging.getLogger(__name__)

class ProductListCreateView(generics.ListCreateAPIView):
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        cache_key = f'products_{request.user.id}'  # Chave única por usuário
        cached_data = cache.get(cache_key)
        
        if cached_data is not None:
            return Response(cached_data)

        products = self.get_queryset()
        serializer = self.get_serializer(products, many=True)
        response_data = serializer.data

        cache.set(cache_key, response_data, 600)
        return Response(response_data)

        try:
            # Log de informação para auditoria
            logger.info(f"User {request.user.id} accessed product list")
            
            response = super().get(request, *args, **kwargs)
            
            # Log de métricas de performance
            logger.info(f"Product list retrieved successfully for user {request.user.id}")
            
            return response
            
        except Exception as e:
            # Captura erro crítico no Sentry
            logger.error(f"Error retrieving product list for user {request.user.id}: {str(e)}")
            capture_exception(e)
            raise

        
    def get_queryset(self):
        user = self.request.user
        return Products.objects.filter(author=user)

    def perform_create(self, serializer):

        try:
            if serializer.is_valid():   
                instance = serializer.save(author=self.request.user)
                logger.info(f"User {self.request.user.id} created product {instance.id}")
                
                # Captura evento de negócio importante
                capture_message(
                    f"Product created: {instance.product} by user {self.request.user.id}",
                    level="info"
                )
            else:
                logger.warning(f"Validation error for user {self.request.user.id}: {serializer.errors}")
                capture_message(
                    f"Validation error in product creation: {serializer.errors}",
                    level="warning"
                )
        except Exception as e:
            logger.error(f"Error creating product for user {self.request.user.id}: {str(e)}")
            capture_exception(e)
            raise

        if serializer.is_valid():   
            serializer.save(author=self.request.user)
            cache.delete(f'products_{self.request.user.id}')
        else:
            print(serializer.errors)

class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Products.objects.filter(author=user)

    def perform_update(self, serializer):
        serializer.save()
        cache.delete(f'products_{self.request.user.id}')

    def perform_destroy(self, instance):
        instance.delete()
        cache.delete(f'products_{self.request.user.id}')

class ProductDeleteView(generics.DestroyAPIView):
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Products.objects.filter(author=user)

    def perform_destroy(self, instance):
        instance.delete()
        cache.delete(f'products_{self.request.user.id}')
        

class UserCreateView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]