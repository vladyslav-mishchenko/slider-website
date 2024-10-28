from django.shortcuts import render
from django.http import HttpRequest, HttpResponse

from .models import Category
from .models import Post


def blog(request: HttpRequest) -> HttpResponse:
    categories = Category.objects.all()
    posts = Post.objects.all()
    
    context = {
        'categories': categories,
        'posts': posts
    }

    return render(request, 'blog/blog.html', context=context)


def category(request: HttpRequest, category) -> HttpResponse:    
    categories = Category.objects.all()
    posts = Post.objects.filter(category_id__category_slug=category)

    context = {
        'categories': categories,
        'posts': posts
    }

    return render(request, 'blog/category.html', context)


def post(request: HttpRequest, category, post) -> HttpResponse:
    categories = Category.objects.all()
    post = Post.objects.filter(category_id__category_slug=category, post_slug=post)

    context = {
        'categories': categories,
        'post': post
    }

    return render(request, 'blog/post.html', context)