from django.urls import path
from userauths import views as userauths_views
from store import views as store_views
from customer import views as customer_views
from vendor import views as vendor_views

from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('', userauths_views.getRoutes),

    # Userauths API Endpoints
    path('user/token/', userauths_views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('user/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('user/register/', userauths_views.RegisterView.as_view(), name='auth_register'),
    path('user/profile/<user_id>/', userauths_views.ProfileView.as_view(), name='user_profile'),
    path('user/test/', userauths_views.testEndPoint, name='auth_register'),
    path('user/password-reset/<email>/', userauths_views.PasswordEmailVerify.as_view(), name='password-reset'),
    path('user/password-change/', userauths_views.PasswordChangeView.as_view(), name='password-reset'),

    # Store API Endpoints
    path('category/', store_views.CategoryListView.as_view(), name='category'),
    path('brand/', store_views.BrandListView.as_view(), name='brand'),
    path('products/', store_views.ProductListView.as_view(), name='products'),
    path('featured-products', store_views.FeaturedProductListView.as_view(), name='featured-products'),
    path('products/<slug:slug>/', store_views.ProductDetailView.as_view(), name='product-detail'),
    path('cart-view/', store_views.CartApiView.as_view(), name='cart-view'),
    path('cart-list/<str:cart_id>/', store_views.CartListView.as_view(), name='cart-list'),
    path('cart-list/<str:cart_id>/<int:user_id>/', store_views.CartListView.as_view(), name='cart-list-with-user'),
    path('cart-detail/<str:cart_id>/', store_views.CartDetailView.as_view(), name='cart-detail'),
    path('cart-detail/<str:cart_id>/<int:user_id>', store_views.CartDetailView.as_view(), name='cart-detail-with-user'),
    path('cart-delete/<str:cart_id>/<int:item_id>', store_views.CartItemDeleteView.as_view(), name='cart-delete'),
    path('cart-delete/<str:cart_id>/<int:item_id>/<int:user_id>', store_views.CartItemDeleteView.as_view(), name='cart-delete-with-user'),
    path('create-order/', store_views.CreateOrderView.as_view(), name='create-order'),
    path('checkout/<order_oid>/', store_views.CheckoutView.as_view(), name='checkout'),
    path('coupon/', store_views.CouponApiView.as_view(), name='coupon'),
    path('create-review/', store_views.ReviewRatingAPIView.as_view(), name='create-review'),
    path('reviews/<product_id>', store_views.ReviewListView.as_view(), name='review-list'),
    path('search/', store_views.SearchProductsAPIView.as_view(), name='search'),

    # Payment
    path('stripe-checkout/<order_oid>/', store_views.StripeCheckoutView.as_view(), name='stripe-checkout'),
    path('payment-success/', store_views.PaymentSuccessView.as_view(), name='payment-success'),

    # Customer API Endpoints
    path('customer/orders/<user_id>/', customer_views.OrdersAPIView.as_view(), name='customer-orders'),
    path('customer/order/detail/<user_id>/<order_oid>/', customer_views.OrdersDetailAPIView.as_view(), name='customer-order-detail'),
    path('customer/wishlist/create/', customer_views.WishlistCreateAPIView.as_view(), name='customer-wishlist-create'),
    path('customer/wishlist/<user_id>/', customer_views.WishlistAPIView.as_view(), name='customer-wishlist'),
    path('customer/notification/<user_id>/', customer_views.CustomerNotificationView.as_view(), name='customer-notification'),
    path('customer/setting/<int:pk>/', customer_views.CustomerUpdateView.as_view(), name='customer-settings'),

]