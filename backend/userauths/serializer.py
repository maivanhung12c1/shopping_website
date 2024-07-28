from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import Token
from django.contrib.auth.password_validation import validate_password
from userauths.models import User, Profile

# Define a custom serializer that inherits from TokenObtainPairSerializer
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    '''
    class MyTokenObtainPairSerializer(TokenObtainPairSerializer):: This line creates a new token serializer called MyTokenObtainPairSerializer that
    is based on an existing one called TokenObtainPairSerializer. Think of it as customizing the way tokens works.

    @classmethod: This is line indicates that the following function is a class method, which means it belongs to the class itself and not to an
    instance of class

    def get_token(cls, user):: This is a function that gets called when we want to create a token for user. The user is the person who's trying to
    access something on the website.

    token = super().get_token(user):: Here, it's asking for a regular token from the original token serializer (the one it's based on). The regular
    token is like a key to enter the website.

    token['full_name'] = user.full_name, token['email'] = user.email, token['username'] = user.username: This code is customizing the token by adding
    extra information to it. For example, it's putting the user's full name, email, and username into token. These are like special notes attached
    to the key

    return token:: Finally, the customized token is given back to the user. Now, when this token is used, it not only lets the user in but also
    carries their full name, email, and username as extra information, which the website can use as needed
    '''
    @classmethod
    def get_token(cls, user: User) -> Token:
        token = super().get_token(user)
        token['full_name'] = user.full_name
        token['email'] = user.email
        token['username'] = user.username
        try:
            token['vendor_id'] = user.vendor_id
        except:
            token['vendor_id'] = 0
        
        return token


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        # Specify the model that this serializer is associated with
        model = User
        # Define the fieds from the model that should be included in the serilizer
        fields = ['full_name', 'email', 'phone', 'password', 'password2']

    def validate(self, attrs):
        # Define a validation method to check if the passwords match
        if  attrs['password'] != attrs['password2']:
            # Raise a validation error if the passwords don't match
            raise serializers.ValidationError({'password': "Password fields didn't match."})
        return attrs
    
    def create(self, validated_data):
        # Define a method to create a new user based on validated data
        user = User.objects.create(
            full_name=validated_data['full_name'],
            email=validated_data['email'],
            phone=validated_data['phone']
        )

        email_user, mobile = user.email.split("@")
        user.username = email_user
        user.set_password(validated_data['password'])
        user.save()
        return user


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = '__all__'

class ProfileSerilizer(serializers.ModelSerializer):

    class Profile:
        model = Profile
        fields = '__all__'

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['user'] = UserSerializer(instance.user).data
        return response
    
class PasswordResetSerializer(serializers.Serializer):
    email = serializers.EmailField()
