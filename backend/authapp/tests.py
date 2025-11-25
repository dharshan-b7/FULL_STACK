from django.test import TestCase
from rest_framework.test import APITestCase
from rest_framework import status
from authapp.models import User


class UserModelTest(TestCase):

    def test_create_user(self):
        user = User.objects.create_user(
            email="test@example.com",
            password="password123",
            role="analyst"
        )

        self.assertEqual(user.email, "test@example.com")
        self.assertEqual(user.role, "analyst")
        self.assertTrue(user.check_password("password123"))
        self.assertTrue(user.is_active)

    def test_create_superuser(self):
        admin = User.objects.create_superuser(
            email="admin@example.com",
            password="admin123"
        )

        self.assertTrue(admin.is_staff)
        self.assertTrue(admin.is_superuser)
        self.assertEqual(admin.role, "admin")


class AuthAPItest(APITestCase):

    def test_user_registration_api(self):
        url = "/auth/register/"
        data = {
            "email": "newuser@example.com",
            "password": "password123",
            "confirm_password": "password123",   # FIXED
            "role": "analyst"
        }

        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 1)

    def test_user_login_api(self):
        User.objects.create_user(
            email="login@example.com",
            password="mypassword",
            role="analyst"
        )

        url = "/auth/login/"
        data = {
            "email": "login@example.com",
            "password": "mypassword"
        }

        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_invalid_login(self):
        url = "/auth/login/"
        data = {
            "email": "wrong@example.com",
            "password": "wrong"
        }

        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_user_list_api(self):
        User.objects.create_user(
            email="user1@example.com",
            password="pass1",
            role="analyst"
        )
        User.objects.create_user(
            email="user2@example.com",
            password="pass2",
            role="manager"
        )

        url = "/auth/users/"

        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)
