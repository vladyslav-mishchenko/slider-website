from django.urls import path
from .views import docs_index
from .views import docs_article

app_name = 'docs'

urlpatterns = [
    path('', docs_index, name='docs-index'),
    path('/<slug:docs_article>', docs_article, name='docs-article'),
]