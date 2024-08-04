# Django Packages
from django.shortcuts import render, get_list_or_404, redirect

# Restframework Packages
from rest_framework.response import Response
from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework import status

# Serializers
from userauths.serializer import ProfileSerilizer
from store.serializers import NotificationSerializer, CartOrderSerializer, WishlistSerializer

# Models
from userauths.models import Profile, User
from store.models import Notification, Product, CartOrder, Wishlist


class OrdersAPIView(generics.ListAPIView):
    serializer_class = CartOrderSerializer
    permission_classes = (AllowAny,)

    def get_queryset(self):
        user_id = self.kwargs['user_id']
        user = User.objects.get(id=user_id)

        orders = CartOrder.objects.filter(buyer=user, payment_status='paid')

        return orders

class OrdersDetailAPIView(generics.RetrieveAPIView):
    serializer_class = CartOrderSerializer
    permission_classes = (AllowAny,)
    lookup_field = 'user_id'

    def get_object(self):
        user_id = self.kwargs['user_id']
        order_oid = self.kwargs['order_oid']

        user = User.objects.get(id=user_id)

        order = CartOrder.objects.get(buyer=user, payment_status='paid', oid=order_oid)
        return order

class WishlistCreateAPIView(generics.CreateAPIView):
    serializer_class = WishlistSerializer
    permission_classes = (AllowAny,)

    def create(self, request, *args, **kwargs):
        payload = request.data

        product_id = payload['product_id']
        user_id = payload['user_id']

        product = Product.objects.get(id=product_id)
        user = User.objects.get(id=user_id)

        wishlish = Wishlist.objects.filter(product=product, user=user)
        if wishlish:
            wishlish.delete()
            return Response({'message': 'Removed From Wishlist'}, status=status.HTTP_200_OK)
        else:
            wishlish = Wishlist.objects.create(product=product, user=user)
            return Response({'message': 'Added to Wishlist'}, status=status.HTTP_201_CREATED)

class WishlistAPIView(generics.ListAPIView):
    serializer_class = WishlistSerializer
    permission_classes = (AllowAny,)

    def get_queryset(self):
        user_id = self.kwargs['user_id']
        user = User.objects.get(id=user_id)
        wishlist = Wishlist.objects.filter(user=user)
        return wishlist
    
class CustomerNotificationView(generics.ListAPIView):
    serializer_class = NotificationSerializer
    permission_classes = (AllowAny,)

    def get_queryset(self):
        user_id = self.kwargs['user_id']
        user = User.objects.get(id=user_id)
        return Notification.objects.filter(user=user)
    
class CustomerUpdateView(generics.RetrieveAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerilizer
    permission_classes = (AllowAny,)