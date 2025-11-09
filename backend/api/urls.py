from django.urls import path, include
from .import views

urlpatterns = [
    path('products/', views.ProductListCreateView.as_view(), name='product_list_create'),
    path('products/delete/<int:pk>/', views.ProductDeleteView.as_view(), name='product_delete'),
]