from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.validators import UniqueValidator

from store.models import (CancelledOrder, Cart, CartOrder, CartOrderItem, Category, Color, CouponUsers, Notification, Size, Address,
                          Coupon, Tag, Product, ProductFaq, DeliveryCouriers, Review, Specification, Gallery, Brand, Wishlist, Vendor)
from addon.models import ConfigSettings
from store.models import Gallery
from userauths.serializer import ProfileSerilizer, UserSerializer

class ConfigSettingsSerializer(serializers.ModelSerializer):

    class Meta:
        model = ConfigSettings
        fields = '__all__'

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'

class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = '__all__'

class GallerySerializer(serializers.ModelSerializer):
    class Meta:
        model = Gallery
        fields = '__all__'

class SpecificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Specification
        fields = '__all__'

class SizeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Size
        fields = '__all__'

class ColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Color
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    
    gallery = GallerySerializer(many=True, read_only=True)
    color = ColorSerializer(many=True, read_only=True)
    size = SizeSerializer(many=True, read_only=True)
    specification = SpecificationSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = [
            "id",
            "title",
            "image",
            "description",
            "category",
            "tags",
            "brand",
            "price",
            "old_price",
            "shipping_amount",
            "stock_qty",
            "in_stock",
            "status",
            "type",
            "featured",
            "hot_deal",
            "special_offer",
            "digital",
            "views",
            "orders",
            "saved",
            "vendor",
            "sku",
            "pid",
            "slug",
            "date",
            "gallery",
            "specification",
            "size",
            "color",
            "product_rating",
            "rating_count",
            "order_count",
            "get_precentage",
        ]
    
    def __init__(self, *args, **kwargs):
        super(ProductSerializer, self).__init__(*args, **kwargs)
        # Customize serialization depth based on the request method.
        request = self.context.get('request')
        if request and request.method == 'POST':
            # When creating a new product, set serialization depth to 0.
            self.Meta.depth = 0
        else:
            # For other methods, set serialization depth to 3.
            self.Meta.depth = 3

class ProductFaqSerializer(serializers.ModelSerializer):
    
    product = ProductSerializer()

    class Meta:
        model = ProductFaq
        fields = '__all__'
    
    def __init__(self, instance=None, data=..., **kwargs):
        super(ProductFaqSerializer, self).__init__(instance, data, **kwargs)
        request = self.context.get('request')
        if request and request.method == 'POST':
            # When creating a new product FAQ, set serialization depth to 0
            self.Meta.depth = 0
        else:
            self.Meta.depth = 3

class CartSerializer(serializers.ModelSerializer):
    product = ProductSerializer()

    class Meta:
        model = Cart
        fields = '__all__'

    def __init__(self, instance=None, data=..., **kwargs):
        super(CartSerializer, self).__init__(instance, data, **kwargs)
        request = self.context.get('request')
        if request and request.method == 'POST':
            # When creating a new cart order item, set serialization depth to 0.
            self.Meta.depth = 0
        else:
            self.Meta.depth = 3

class CartOrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer()

    class Meta:
        model = CartOrderItem
        fields = '__all__'

    def __init__(self, instance=None, data=..., **kwargs):
        super(CartOrderItemSerializer, self).__init__(instance, data, **kwargs)
        request = self.context.get('request')
        if request and request.method == 'POST':
            # When creating a new cart order item, set serialization depth to 0.
            self.Meta.depth = 0
        else:
            self.Meta.depth = 3

class CartOrderSerializer(serializers.ModelSerializer):
    orderitem = CartOrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = CartOrder
        fields = '__all__'

    def __init__(self, instance=None, data=..., **kwargs):
        super(CartOrderSerializer, self).__init__(instance, data, **kwargs)
        request = self.context.get('request')
        if request and request.method == 'POST':
            # When creating a new cart order, set serialization depth to 0.
            self.Meta.depth = 0
        else:
            self.Meta.depth = 3

class VendorSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Vendor
        fields = '__all__'

    def __init__(self, instance=None, data=..., **kwargs):
        super(VendorSerializer, self).__init__(instance, data, **kwargs)
        request = self.context.get('request')
        if request and request.method == 'POST':
            # When creating a new vendor, set serialization depth to 0.
            self.Meta.depth = 0
        else:
            self.Meta.depth = 3

class ReviewSerializer(serializers.ModelSerializer):
    product = ProductSerializer()
    profile = ProfileSerilizer()

    class Meta:
        model = Review
        fields = '__all__'

    def __init__(self, instance=None, data=..., **kwargs):
        super(ReviewSerializer, self).__init__(instance, data, **kwargs)
        request = self.context.get('request')
        if request and request.method == 'POST':
            # When creating a new review, set serialization depth to 0.
            self.Meta.depth = 0
        else:
            self.Meta.depth = 3

class WishlistSerializer(serializers.ModelSerializer):
    product = ProductSerializer()

    class Meta:
        model = Wishlist
        fields = '__all__'

    def __init__(self, instance=None, data=..., **kwargs):
        super(WishlistSerializer, self).__init__(instance, data, **kwargs)
        request = self.context.get('request')
        if request and request.method == 'POST':
            # When creating a new wishlist, set serialization depth to 0.
            self.Meta.depth = 0
        else:
            self.Meta.depth = 3

class AddressSerializer(serializers.ModelSerializer):

    class Meta:
        model = Address
        fields = '__all__'

    def __init__(self, instance=None, data=..., **kwargs):
        super(AddressSerializer, self).__init__(instance, data, **kwargs)
        request = self.context.get('request')
        if request and request.method == 'POST':
            # When creating a new address, set serialization depth to 0.
            self.Meta.depth = 0
        else:
            self.Meta.depth = 3

class CancelledOrderSerializer(serializers.ModelSerializer):

    class Meta:
        model = CancelledOrder
        fields = '__all__'

    def __init__(self, instance=None, data=..., **kwargs):
        super(CancelledOrderSerializer, self).__init__(instance, data, **kwargs)
        request = self.context.get('request')
        if request and request.method == 'POST':
            # When creating a new cancelled order, set serialization depth to 0.
            self.Meta.depth = 0
        else:
            self.Meta.depth = 3

class CouponSerializer(serializers.ModelSerializer):

    class Meta:
        model = Coupon
        fields = '__all__'

    def __init__(self, instance=None, data=..., **kwargs):
        super(CouponSerializer, self).__init__(instance, data, **kwargs)
        request = self.context.get('request')
        if request and request.method == 'POST':
            # When creating a new coupon, set serialization depth to 0.
            self.Meta.depth = 0
        else:
            self.Meta.depth = 3

class CouponUsersSerializer(serializers.ModelSerializer):

    class Meta:
        model = CouponUsers
        fields = '__all__'

    def __init__(self, instance=None, data=..., **kwargs):
        super(CouponUsersSerializer, self).__init__(instance, data, **kwargs)
        request = self.context.get('request')
        if request and request.method == 'POST':
            # When creating a new coupon user, set serialization depth to 0.
            self.Meta.depth = 0
        else:
            self.Meta.depth = 3

class DeliveryCouriersSerializer(serializers.ModelSerializer):

    class Meta:
        model = DeliveryCouriers
        fields = '__all__'

class NotificationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Notification
        fields = '__all__'

    def __init__(self, instance=None, data=..., **kwargs):
        super(NotificationSerializer, self).__init__(instance, data, **kwargs)
        request = self.context.get('request')
        if request and request.method == 'POST':
            # When creating a new coupon user, set serialization depth to 0.
            self.Meta.depth = 0
        else:
            self.Meta.depth = 3

class SummarySerializer(serializers.ModelSerializer):
    product = serializers.IntegerField()
    orders = serializers.IntegerField()
    revenue = serializers.DecimalField(max_digits=10, decimal_places=2)

class EarningSummarySerializer(serializers.ModelSerializer):
    monthly_total = serializers.DecimalField(max_digits=10, decimal_places=2)
    monthly_revenue = serializers.DecimalField(max_digits=10, decimal_places=2)

class CouponSummarySerializer(serializers.ModelSerializer):
    total_coupons = serializers.IntegerField(default=0)
    active_coupons = serializers.IntegerField(default=0)

class NotificationSummarySerializer(serializers.ModelSerializer):
    read_noti = serializers.IntegerField(default=0)
    all_noti = serializers.IntegerField(default=0)
    un_read_noti = serializers.IntegerField(default=0)

