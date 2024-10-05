from django.shortcuts import render
from django.http import HttpRequest, HttpResponse

def contacts(request: HttpRequest) -> HttpResponse:
    return render(request, 'contacts/contacts.html')
