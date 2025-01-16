from django.db import models
class feedback(models.Model):
    name = models.CharField('Имя пользователя', max_length=30)
    email = models.EmailField('E-mail пользователя', max_length=50)
    feedback_text = models.TextField('Текст отзыва')
    created_at = models.DateTimeField('Время написания отзыва', auto_now_add=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Отзыв'
        verbose_name_plural = 'Отзывы'
