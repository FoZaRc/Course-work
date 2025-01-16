# urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),  # Добавили имя 'index' для главной страницы
]