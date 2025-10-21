from django.urls import path,re_path,include
from .views import (CreateOrUpdateUserApiView,
                   
                )

urlpatterns = [
    re_path(r'^users/',include([

        path('create-or-update-user',CreateOrUpdateUserApiView.as_view()),


    ]))
]