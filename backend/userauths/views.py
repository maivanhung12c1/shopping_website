from django.shortcuts import render
from django.http import JsonResponse
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.conf import settings
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_decode
from django.utils.encoding import force_bytes

# Restframework
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken


# Others
import json
import random

# Serializers
from userauths.serializer import MyTokenObtainPairSerializer, RegisterSerializer, UserSerializer, ProfileSerilizer

# Models
from userauths.models import Profile, User


class MyTokenObtainPairView(TokenObtainPairView):
    # Here, it specifies the serializer class to be used with this view
    serializer_class = MyTokenObtainPairSerializer

class RegisterView(generics.CreateAPIView):
    # It sets the queryset for this view to retrieve all User objects
    queryset = User.objects.all()
    # It specifies that the view allows any user (no authentication required)
    permission_classes = (AllowAny, )
    # It sets the serilizer class to be used with this view
    serializer_class = RegisterSerializer

@api_view(['GET'])
def getRoutes(request):
    # It defines a list of API routes that can be accessed
    routes = [
        "/api/token/",
        "/api/register/",
        "/api/token/refresh/",
        "/api/test/"
    ]

    # It returns a DRF Response object containing the list of routes.
    return Response(routes)

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def testEndPoint(request):
    if request.method == 'GET':
        data = f"Congratulations {request.user}, your API just reponded to a GET request."
        return Response({'response': data}, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        try:
            # Decode the request body from UTF-8 and load it as JSON
            body = request.body.decode('utf-8')
            data = json.loads(body)

            if 'text' not in data:
                return Response("Invalid JSON data", status=status.HTTP_400_BAD_REQUEST)
            text = data.get('text')
            data = f"Congratulations, your API just responded to a POST request with text: {text}"
            return Response({'response': data}, status=status.HTTP_200_OK)
        except json.JSONDecodeError:
            # If there's an error decoding the JSON data, it return a response with an error message and an HTTP 400
            return Response("Invalid JSON data", status=status.HTTP_400_BAD_REQUEST)
    # If the request method is neither GET or POST, it return a response with an error message and an HTTP 400
    return Response("Invalid JSON data", status=status.HTTP_400_BAD_REQUEST)

class ProfileView(generics.RetrieveUpdateAPIView):
    permission_classes = (AllowAny,)
    serializer_class = ProfileSerilizer

    def get_object(self):
        user_id = self.kwargs['user_id']
        user = User.objects.get(id=user_id)
        profile = Profile.objects.get(user=user)
        return profile

def generate_numeric_otp(length=7):
        # Generate a random 7-digit OTP
        otp = ''.join([str(random.randint(0, 9)) for _ in range(length)])
        return otp
 
class PasswordEmailVerify(generics.RetrieveAPIView):
    permission_classes = (AllowAny,)
    serializer_class = UserSerializer
    
    def get_object(self):
        email = self.kwargs['email']
        user = User.objects.get(email=email)
        
        if user:
            user.otp = generate_numeric_otp()
            uidb64 = user.pk
            
             # Generate a token and include it in the reset link sent via email
            refresh = RefreshToken.for_user(user)
            reset_token = str(refresh.access_token)
 
            # Store the reset_token in the user model for later verification
            user.reset_token = reset_token
            user.save()
 
            link = f"http://localhost:5173/create-new-password?otp={user.otp}&uidb64={uidb64}&reset_token={reset_token}"
            
            merge_data = {
                'link': link, 
                'username': user.username, 
            }
            subject = f"Password Reset Request"
            text_body = render_to_string("email/password_reset.txt", merge_data)
            html_body = render_to_string("email/password_reset.html", merge_data)
            
            msg = EmailMultiAlternatives(
                subject=subject, from_email=settings.FROM_EMAIL,
                to=[user.email], body=text_body
            )
            msg.attach_alternative(html_body, "text/html")
            msg.send()
        return user
    
 
class PasswordChangeView(generics.CreateAPIView):
    permission_classes = (AllowAny,)
    serializer_class = UserSerializer
    
    def create(self, request, *args, **kwargs):
        payload = request.data
        
        otp = payload['otp']
        uidb64 = payload['uidb64']
        reset_token = payload['reset_token']
        password = payload['password']
 
        print("otp ======", otp)
        print("uidb64 ======", uidb64)
        print("reset_token ======", reset_token)
        print("password ======", password)
 
        user = User.objects.get(id=uidb64, otp=otp)
        if user:
            user.set_password(password)
            user.otp = ""
            user.reset_token = ""
            user.save()
 
            return Response( {"message": "Password Changed Successfully"}, status=status.HTTP_201_CREATED)
        else:
            return Response( {"message": "An Error Occured"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)