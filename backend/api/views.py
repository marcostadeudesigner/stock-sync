from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, ProductSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Products

class ProductListCreateView(generics.ListCreateAPIView):
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Products.objects.filter(author=user)
    
    def perform_create(self, serializer):
        if serializer.is_valid():   
            serializer.save(author=self.request.user)
        else:
           print(serializer.errors)

class ProductDeleteView(generics.DestroyAPIView):
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Products.objects.filter(author=user)
        

class UserCreateView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]  