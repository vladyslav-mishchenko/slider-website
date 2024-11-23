from django.shortcuts import render
from django.http import HttpRequest, HttpResponse

from pages.models import Page

from .models import DocsLink
from .models import DocsArticle

def docs_index(request: HttpRequest) -> HttpResponse:
    docs_links = DocsLink.objects.all()
    docs_page = Page.objects.get(pk=2)

    context = {
        'docs': docs_page,
        'links': docs_links,
    }

    return render(request, 'docs/docs.html', context)


def docs_article(request: HttpRequest, docs_article) -> HttpResponse:
    docs_links = DocsLink.objects.all()
    docs_article = DocsArticle.objects.get(docs_category__docs_slug=docs_article)

    context = {
        'docs': docs_article,
        'links': docs_links,
    }

    return render(request, 'docs/docs-article.html', context)