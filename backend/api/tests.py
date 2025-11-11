from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.test import APIClient
from rest_framework import status
from .models import Products
from decimal import Decimal

class ProductModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpass123')
        self.product = Products.objects.create(
            product='Test Product',
            price='99.99',
            author=self.user
        )

    def test_product_creation(self):
        self.assertEqual(self.product.product, 'Test Product')
        # DecimalField stores as Decimal, but when retrieved from DB it's a string in serializer
        self.assertEqual(str(self.product.price), '99.99')
        self.assertEqual(self.product.author, self.user)

    def test_product_str(self):
        self.assertEqual(str(self.product), 'Test Product')

    def test_product_has_created_at(self):
        self.assertIsNotNone(self.product.created_at)


class ProductAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='testuser', password='testpass123')
        self.product = Products.objects.create(
            product='API Test Product',
            price='49.99',
            author=self.user
        )

    def test_list_products_authenticated(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get('/api/products/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['product'], 'API Test Product')

    def test_list_products_unauthenticated(self):
        response = self.client.get('/api/products/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_product(self):
        self.client.force_authenticate(user=self.user)
        data = {'product': 'New Product', 'price': '29.99'}
        response = self.client.post('/api/products/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Products.objects.count(), 2)
        self.assertEqual(response.data['product'], 'New Product')

    def test_retrieve_product(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get(f'/api/products/{self.product.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['product'], 'API Test Product')
        self.assertEqual(response.data['price'], '49.99')

    def test_update_product(self):
        self.client.force_authenticate(user=self.user)
        data = {'product': 'Updated Product', 'price': '59.99'}
        response = self.client.put(f'/api/products/{self.product.id}/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.product.refresh_from_db()
        self.assertEqual(self.product.product, 'Updated Product')
        self.assertEqual(str(self.product.price), '59.99')

    def test_delete_product(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.delete(f'/api/products/{self.product.id}/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Products.objects.count(), 0)

    def test_cannot_access_other_users_product(self):
        other_user = User.objects.create_user(username='otheruser', password='testpass123')
        self.client.force_authenticate(user=other_user)
        response = self.client.get(f'/api/products/{self.product.id}/')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
