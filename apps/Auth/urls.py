from django.urls import path,re_path,include
from .views import (CreateOrUpdateUserApiView,
                   LoginApiview,
                   LogoutApiView,
                   TokenRefreshApiView
                )

urlpatterns = [
    re_path(r'^authentication/',include([
        path('create-or-update-user',CreateOrUpdateUserApiView.as_view()),
        path('login',LoginApiview.as_view()),
        path('logout',LogoutApiView.as_view()),
        path('refresh-token',TokenRefreshApiView.as_view()),

    ]))
]