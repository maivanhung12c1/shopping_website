from django.urls import path
from userauths import views as userauths_views
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('user/token/', userauths_views.MyTokenObtainPairView.as_view()),
    path('user/register/', userauths_views.RegisterView.as_view()),
    path('user/token/refreesh', TokenRefreshView.as_view())
]