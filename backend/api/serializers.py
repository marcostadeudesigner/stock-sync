from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Products

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    
class ProductSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.username')

    class Meta:
        model = Products
        fields = ['id', 'name', 'price', 'author', 'created_at']
        extra_kwargs = {'author': {'read_only': True}}