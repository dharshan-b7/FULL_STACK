from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from analysis.models import MaterialAnalysis


# ----------------------------------------
# MODEL TESTS
# ----------------------------------------
class MaterialAnalysisModelTest(TestCase):
    def test_create_material_analysis(self):
        item = MaterialAnalysis.objects.create(
            material_name="Aluminum",
            quality_percent=98.5,
            weight=150.0
        )

        self.assertEqual(item.material_name, "Aluminum")
        self.assertEqual(item.quality_percent, 98.5)
        self.assertEqual(item.weight, 150.0)
        self.assertIsNotNone(item.created_at)


# ----------------------------------------
# API TESTS
# ----------------------------------------
class MaterialAnalysisAPITest(APITestCase):

    def test_analyze_material_api(self):
        """
        POST /analysis/analyze/
        Should create a MaterialAnalysis record
        """

        # URL based on your urlpatterns
        url = "/analysis/analyze/"

        data = {
            "material_name": "Copper",
            "quality_percent": 87.3,
            "weight": 50.0
        }

        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(MaterialAnalysis.objects.count(), 1)

        item = MaterialAnalysis.objects.first()
        self.assertEqual(item.material_name, "Copper")
        self.assertEqual(item.quality_percent, 87.3)
        self.assertEqual(item.weight, 50.0)

    def test_list_materials_api(self):
        """
        GET /analysis/list/
        Should return a list of existing materials
        """

        MaterialAnalysis.objects.create(
            material_name="Iron",
            quality_percent=92.1,
            weight=120
        )
        MaterialAnalysis.objects.create(
            material_name="Steel",
            quality_percent=89.5,
            weight=200
        )

        url = "/analysis/list/"

        response = self.client.get(url, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)