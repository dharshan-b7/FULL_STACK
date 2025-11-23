from django.urls import path
from . import views

urlpatterns = [
    path("list/", views.list_byproducts),
    path("add/", views.add_byproduct),
    path("update/<int:id>/", views.update_byproduct_status),
]
