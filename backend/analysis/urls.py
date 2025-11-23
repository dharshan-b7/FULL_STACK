from django.urls import path
from .views import MaterialAnalysisView, DashboardView

urlpatterns = [
    path('analyze', MaterialAnalysisView.as_view()),
    path('dashboard', DashboardView.as_view()),
]