from django.shortcuts import render
from django.http import HttpRequest, HttpResponse

def about(request: HttpRequest) -> HttpResponse:
    return render(request, 'about/about.html')