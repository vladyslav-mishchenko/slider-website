from django.shortcuts import render
from django.http import HttpRequest, HttpResponse
from pages.models import Page

def about(request: HttpRequest) -> HttpResponse:
    about_page = Page.objects.get(pk=1)

    context = {
        'about': about_page
    }
    
    return render(request, 'about/about.html', context)