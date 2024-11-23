from django.contrib import admin
from .models import DocsArticle, DocsLink

admin.site.register(DocsArticle)
admin.site.register(DocsLink)
