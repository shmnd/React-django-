import sys, os
from rest_framework import generics,status
from django.contrib import auth
from apps.user.models import Users,GeneratedAcsessToken
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import CreateOrUpdateUserSerializer,LoginSerializer
from drf_yasg.utils import swagger_auto_schema
from e_commerce_core.helpers.helper import get_object_or_none
from rest_framework.response import Response
from .schemas import LoginResponseSchema
import logging
class CreateOrUpdateUserApiView(generics.GenericAPIView):
        
    serializer_class = CreateOrUpdateUserSerializer
    # permission_classes = (IsAuthenticated,)
    
    @swagger_auto_schema(tags=["Autherization"])
    def post(self, request):
        try:

            serializer = self.serializer_class(data=request.data, context = {'request' : request})

            if not serializer.is_valid():
                return Response(
                    {
                        'status_code':status.HTTP_400_BAD_REQUEST,
                        "status": False,
                        "errors": serializer.errors,
                    },
                    status=status.HTTP_400_BAD_REQUEST
                )

            user_instance = get_object_or_none(Users,pk=serializer.validated_data.get('user', None))

            serializer = self.serializer_class(user_instance, data=request.data, context = {'request' : request})
            if not serializer.is_valid():
                return Response(
                    {
                        'status_code':status.HTTP_400_BAD_REQUEST,
                        "status":False,
                        'errors':serializer.errors
                    },
                    status.HTTP_400_BAD_REQUEST)
            
            serializer.save()
            
            return Response({
                'status_code': status.HTTP_201_CREATED,
                'status':True,
                'messages':"Sucess",
            }, status=status.HTTP_201_CREATED)
            
        except Exception as e:
            exc_type, exc_obj, exc_tb = sys.exc_info()
            fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
            return Response(
                {
                    'status_code': status.HTTP_500_INTERNAL_SERVER_ERROR,
                    'status':False,
                    'error':f'exc_type : {exc_type},fname : {fname},tb_lineno : {exc_tb.tb_lineno},error : {str(e)}'

                },
                status.HTTP_500_INTERNAL_SERVER_ERROR) 
        

class LoginApiview(generics.GenericAPIView):

    serializer_class = LoginSerializer

    @swagger_auto_schema(tags=["Autherization"])

    def post(self,request):
        try:
            serializer = self.serializer_class(data=request.data)

            if not serializer.is_valid():
                return Response(
                    {
                        "status": False,
                        "errors": serializer.errors,
                    },
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            user = auth.authenticate(
                username = serializer.validated_data.get('username',''),
                password = serializer.validated_data.get('password','')
            )

            if user:
                serializer = LoginResponseSchema(user,context={'request':request})
                refresh = RefreshToken.for_user(user)
                token = str(refresh.access_token)
                data = {
                    'user': serializer.data,
                    'access':token,
                    'refresh':str(refresh)
                }
                GeneratedAcsessToken.objects.create(user=user,token=token)
                return Response(
                    {
                        'status_code': status.HTTP_202_ACCEPTED,
                        "status":True,
                        "data" : data
                    },status=status.HTTP_202_ACCEPTED
                )
            else:
                return Response(
                    {
                        'status_code': status.HTTP_400_BAD_REQUEST,
                        'status':False,
                        'message':"Invalid credentials. Please try again."
                    },status=status.HTTP_400_BAD_REQUEST
                )

        except Exception as e:
            exc_type,exc_obj,exc_tb = sys.exc_info()
            file_name = os.path.split(exc_tb.tb_frame.f_code.co_filename)
            return Response(
                {
                    'status_code':status.HTTP_500_INTERNAL_SERVER_ERROR,
                    'status':False,
                    'error':f'exc_type:{exc_type}, file_name:{file_name}, tb_line_no:{exc_tb.tb_lineno}, error:{str(e)}'
                },status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

