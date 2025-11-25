from django.urls import path
from .views import analyze_material, list_materials, report_summary

urlpatterns = [
    path('analyze/', analyze_material, name='analyze-material'),
    path('list/', list_materials, name='list-materials'),


]
