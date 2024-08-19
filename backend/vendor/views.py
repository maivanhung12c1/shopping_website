from django.shortcuts import render
from django.db import models, transaction
from django.conf import settings
from django.db.models.functions import ExtractMonth
from django.core.mail import EmailMultiAlternatives, send_mail
from django.template.loader import render_to_string

# DRF packages
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser

# Serializers
from userauths.serializer import ProfileSerilizer
from store.serializers import (
    CouponSummarySerializer, EarningSummarySerializer, NotificationSerializer, NotificationSummarySerializer,
    SummarySerializer, CartOrderItemSerializer, ProductSerializer, DeliveryCouriersSerializer, CartOrderSerializer,
    GallerySerializer, ReviewSerializer, SpecificationSerializer, CouponSerializer, ColorSerializer, SizeSerializer, VendorSerializer
    )

# Models
from userauths.models import Profile
from store.models import Notification, CartOrderItem, Product, DeliveryCouriers, CartOrder, Review, Coupon
from vendor.models import Vendor

# Others packages
import requests
import stripe
from datetime import datetime, timedelta

# Create your views here.

class ProductsAPIView(generics.ListAPIView):
    serializer_class = ProductSerializer
    permission_classes = (AllowAny,)

    def get_queryset(self):
        vendor_id = self.kwargs['vendor_id']
        vendor = Vendor.objects.get(id=vendor_id)
        products = Product.objects.filter(vendor=vendor)
        return products
    
class OrdersAPIView(generics.ListAPIView):
    serializer_class = CartOrderSerializer
    permission_classes = (AllowAny,)

    def get_queryset(self):
        vendor_id = self.kwargs['vendor_id']
        vendor = Vendor.objects.get(id=vendor_id)
        orders = CartOrder.objects.filter(vendor=vendor, payment_status="paid")
        return orders
    
class VendorProfileUpdateView(generics.RetrieveUpdateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerilizer
    permission_classes = (AllowAny,)
    parser_classes = (MultiPartParser, FormParser)

class ShopUpdateView(generics.RetrieveUpdateAPIView):
    queryset = Vendor.objects.all()
    serializer_class = VendorSerializer
    permission_classes = (AllowAny,)
    parser_classes = (MultiPartParser, FormParser)

class ShopAPIView(generics.RetrieveUpdateAPIView):
    queryset = Product.objects.all()
    serializer_class = VendorSerializer
    permission_classes = (AllowAny,)

    def get_object(self):
        vendor_slug = self.kwargs['vendor_slug']
        vendor = Vendor.objects.get(slug=vendor_slug)
        return vendor
    
class ShopProductsAPIView(generics.ListAPIView):
    serializer_class = ProductSerializer
    permission_classes = (AllowAny,)

    def get_queryset(self):
        vendor_slug = self.kwargs['vendor_slug']
        vendor = Vendor.objects.get(slug=vendor_slug)
        products = Product.objects.filter(vendor=vendor)
        return products

class VendorRegister(generics.CreateAPIView):
    serializer_class = VendorSerializer
    queryset = Vendor.objects.all()
    permission_classes = (AllowAny,)

    def create(self, request, *args, **kwargs):
        payload = request.data
        
        image = payload['image']
        name = payload['name']
        email = payload['email']
        description = payload['description']
        mobile = payload['mobile']
        user_id = payload['user_id']

        Vendor.objects.create(
            image=image,
            name=name,
            email=email,
            description=description,
            mobile=mobile,
            user_id=user_id,
        )
        return Response({'message': 'Created vendor account'})
    
