# views.py
from django.shortcuts import render, redirect
from django.contrib import messages  # Для сообщений
from .models import feedback

def index(request):
    if request.method == 'POST':
        # Получаем данные из формы
        name = request.POST.get('name')
        email = request.POST.get('email')
        feedback_text = request.POST.get('feedback')

        # Сохраняем данные в базе данных
        new_feedback = feedback(name=name, email=email, feedback_text=feedback_text)
        new_feedback.save()

        # Добавляем сообщение для пользователя
        messages.success(request, 'Ваш отзыв успешно отправлен!')

        # После отправки формы возвращаем на главную страницу
        return redirect('index')  # Перенаправление на главную страницу

    return render(request, 'main/index.html')  # Отображаем главную страницу с формой