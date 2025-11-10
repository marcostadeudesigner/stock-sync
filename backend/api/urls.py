from django.urls import path
from .views import ProductListCreateView, ProductDetailView, ProductDeleteView, UserCreateView

urlpatterns = [
    path('products/', ProductListCreateView.as_view(), name='product-list-create'),
    path('products/<int:pk>/', ProductDetailView.as_view(), name='product-detail'),
    path('products/delete/<int:pk>/', ProductDeleteView.as_view(), name='product-delete'),
    path('register/', UserCreateView.as_view(), name='user-create'),
]