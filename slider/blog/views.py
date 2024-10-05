from django.shortcuts import render
from django.http import HttpRequest, HttpResponse

def blog(request: HttpRequest) -> HttpResponse:
    return render(request, 'blog/blog.html')