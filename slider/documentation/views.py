from django.shortcuts import render
from django.http import HttpRequest, HttpResponse

def documentation(request: HttpRequest) -> HttpResponse:
    return render(request, 'documentation/documentation.html')
