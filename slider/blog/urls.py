from django.urls import path
from .views import blog
from .views import category
from .views import post

app_name = 'blog'

urlpatterns = [
    path('', blog, name='blog'),
    path('/<slug:category>', category, name='category'),
    path('/<slug:category>/<slug:post>', post, name='post'),
]