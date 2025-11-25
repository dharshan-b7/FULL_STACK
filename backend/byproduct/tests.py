from django.test import TestCase
from rest_framework.test import APITestCase
from rest_framework import status
from .models import ByProduct


# ---------------------------------------
# MODEL TESTS
# ---------------------------------------
class ByProductModelTest(TestCase):

    def test_create_byproduct(self):
        item = ByProduct.objects.create(
            name="Red Mud",
            quantity=50.5,
            status="pending",
            source="Aluminum Plant",
            potential_uses="Cement, bricks"
        )

        self.assertEqual(item.name, "Red Mud")
        self.assertEqual(item.quantity, 50.5)
        self.assertEqual(item.status, "pending")
        self.assertEqual(item.source, "Aluminum Plant")
        self.assertEqual(str(item), "Red Mud")  # __str__ test


# ---------------------------------------
# API TESTS
# ---------------------------------------
class ByProductAPITest(APITestCase):

    def test_list_byproducts(self):
        ByProduct.objects.create(name="Mud", quantity=10, status="pending")
        ByProduct.objects.create(name="Slag", quantity=20, status="processing")

        url = "/byproduct/list/"

        response = self.client.get(url, format="json")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

    def test_add_byproduct(self):
        url = "/byproduct/add/"

        data = {
            "name": "Red Mud",
            "quantity": 75.2,
            "status": "pending",
            "source": "Unit A",
            "potential_uses": "Construction material"
        }

        response = self.client.post(url, data, format="json")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(ByProduct.objects.count(), 1)
        self.assertEqual(ByProduct.objects.first().name, "Red Mud")

    def test_add_byproduct_invalid(self):
        url = "/byproduct/add/"

        data = {
            "name": "",  # invalid
            "quantity": 40
        }

        response = self.client.post(url, data, format="json")

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_update_byproduct_status(self):
        item = ByProduct.objects.create(name="Residue", quantity=45, status="pending")

        url = f"/byproduct/update/{item.id}/"

        data = {"status": "completed"}

        response = self.client.patch(url, data, format="json")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        item.refresh_from_db()
        self.assertEqual(item.status, "completed")

    def test_update_byproduct_not_found(self):
        url = "/byproduct/update/9999/"  # ID does not exist

        data = {"status": "recycled"}

        response = self.client.patch(url, data, format="json")

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data["error"], "Not found")
