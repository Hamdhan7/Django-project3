from rest_framework_simplejwt.tokens import RefreshToken

from .models import Product
from .models import Order
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from .serializers import UserSerializer, RegisterSerializer
from django.contrib.auth.models import User
from rest_framework.authentication import TokenAuthentication
from rest_framework import generics, status
from django.contrib.auth import login
from django.middleware.csrf import rotate_token
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated



class HomeView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        content = {'message': 'Welcome to the JWTAuthentication page using React Js and Django!'}
        return Response(content)


class CustomAuthToken(ObtainAuthToken):
    @method_decorator(ensure_csrf_cookie)  # Ensure CSRF cookie is set
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']

        # Create a session and log in the user
        login(request, user)

        # Rotate CSRF token to ensure security
        rotate_token(request)

        # Generate or retrieve the auth token
        token, created = Token.objects.get_or_create(user=user)

        # Set user ID in session for future use
        request.session['user_id'] = user.id

        response = Response({
            'token': token.key,
            'username': user.username
        })

        return response


# Create your views here.


def get_products(request):
    products = Product.objects.all()
    data = {'products': list(products.values())}
    return JsonResponse(data)


def get_orders(request):
    orders = Order.objects.all()
    data = {'orders': list(orders.values())}
    return JsonResponse(data)


def create_order(request):
    if request.method == 'POST':
        pid = request.POST.get('product_id')
        quantity = request.POST.get('quantity')
        product = Product.objects.get(product_id="11")
        order = Order(user=request.user, product_id=product, quantity_bought=quantity, status='Pending')
        order.save()
        return JsonResponse({'success': True})


class CustomAuthToken(ObtainAuthToken):
    @method_decorator(ensure_csrf_cookie)  # Ensure CSRF cookie is set
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']

        # Create a session and log in the user
        login(request, user)

        # Rotate CSRF token to ensure security
        rotate_token(request)

        # Generate or retrieve the auth token
        token, created = Token.objects.get_or_create(user=user)

        # Set user ID in session for future use
        request.session['user_id'] = user.id

        response = Response({
            'token': token.key,
            'username': user.username
        })

        return response


def login_view(request):
    username = request.POST.get('username')
    password = request.POST.get('password')
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        return JsonResponse({'message': 'Login successful'})
    else:
        return JsonResponse({'message': 'Login failed'})


class LogoutView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):

        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)


def session_view(request):
    if request.user.is_authenticated:
        username = request.user.username
        return JsonResponse({'username': username})
    else:
        return JsonResponse({'message': 'Not logged in'})


# new


# Class based view to Get User Details using Token Authentication
class UserDetailAPI(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (AllowAny,)

    def get(self, request, *args, **kwargs):
        user = User.objects.get(id=request.user.id)
        serializer = UserSerializer(user)
        return Response(serializer.data)


# Class based view to register user
class RegisterUserAPIView(generics.CreateAPIView):
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer
