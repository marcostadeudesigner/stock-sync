from django.shortcuts import render
from django.core.cache import cache
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, ProductSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Products

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

    def get_queryset(self):
        user = self.request.user
        return Products.objects.filter(author=user)

    def perform_create(self, serializer):
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