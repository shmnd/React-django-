from rest_framework import serializers
from apps.user.models import Users
from django.contrib.auth.models import Permission


class LoginResponseSchema(serializers.ModelSerializer):
    phone_number = serializers.SerializerMethodField('get_phone_number')

    class Meta:
        model = Users
        fields = ['id','name','username','phone_number','gender','is_admin']


    def get_phone_number(self,data):
        return data.phone_number if data.phone_number else None
