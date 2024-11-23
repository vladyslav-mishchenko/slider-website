from django.db import models

class DocsLink(models.Model):
    name = models.CharField(max_length=32, unique=True)
    docs_slug = models.SlugField(max_length=128, unique=True, null=True)


class DocsArticle(models.Model):
    title = models.CharField(max_length=256, null=True)
    text = models.TextField(null=True)
    docs_category = models.OneToOneField(
        DocsLink, 
        on_delete=models.CASCADE,
        primary_key=True
    )