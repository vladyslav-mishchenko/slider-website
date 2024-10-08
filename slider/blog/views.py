from django.shortcuts import render
from django.http import HttpRequest, HttpResponse


def blog(request: HttpRequest) -> HttpResponse:
    return render(request, 'blog/blog.html')


def category(request: HttpRequest, category) -> HttpResponse:
    return render(request, 'blog/category.html')


def post(request: HttpRequest, category, post) -> HttpResponse:
    return render(request, 'blog/post.html')