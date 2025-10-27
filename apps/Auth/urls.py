from django.urls import path,re_path,include
from .views import (CreateOrUpdateUserApiView,
                   LoginApiview
                )

urlpatterns = [
    re_path(r'^authentication/',include([
        path('create-or-update-user',CreateOrUpdateUserApiView.as_view()),
        path('login',LoginApiview.as_view()),


    ]))
]