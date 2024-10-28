from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=32, unique=True)
    category_slug = models.SlugField(max_length=128, unique=True, null=True)

    def __str__(self):
        return self.name


class Post(models.Model):
    title = models.CharField(max_length=256, null=True)
    description = models.TextField(null=True)
    text = models.TextField(null=True)
    image_path = models.CharField(max_length=256, null=True)
    post_slug = models.SlugField(max_length=128, unique=True, null=True)
    category = models.ForeignKey(Category, on_delete=models.RESTRICT, null=True)

