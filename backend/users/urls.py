from django.urls import path
from .views import RegisterView, LoginView, PendingUsersView, ApproveUserView

urlpatterns = [
    path('register', RegisterView.as_view()),
    path('login', LoginView.as_view()),
    path('admin/pending-users', PendingUsersView.as_view()),
    path('admin/approve-user/<int:pk>', ApproveUserView.as_view()),
]