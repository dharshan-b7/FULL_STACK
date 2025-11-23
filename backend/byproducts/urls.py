from django.urls import path
from .views import ByProductListView, ByProductStatusUpdateView

urlpatterns = [
    path('byproducts', ByProductListView.as_view()),
    path('byproducts/<int:pk>/status', ByProductStatusUpdateView.as_view()),
]