import sys, os
from rest_framework import generics,status
from apps.user.models import Users
from .serializers import CreateOrUpdateUserSerializer
from drf_yasg.utils import swagger_auto_schema
from e_commerce_core.helpers.helper import get_object_or_none
from rest_framework.response import Response

class CreateOrUpdateUserApiView(generics.GenericAPIView):
        
    serializer_class = CreateOrUpdateUserSerializer
    # permission_classes = (IsAuthenticated,)
    
    @swagger_auto_schema(tags=["Users"])
    def post(self, request):
        try:

            serializer = self.serializer_class(data=request.data, context = {'request' : request})

            if not serializer.is_valid():
                return Response(
                    {
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
                        "status":False,
                        'errors':serializer.errors
                    },
                    status.HTTP_400_BAD_REQUEST)
            
            serializer.save()
            
            return Response({
                'status':True,
                'messages':"Sucess",
            }, status=status.HTTP_201_CREATED)
            
        except Exception as e:
            exc_type, exc_obj, exc_tb = sys.exc_info()
            fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
            return Response(
                {
                    'status':False,
                    'error':f'exc_type : {exc_type},fname : {fname},tb_lineno : {exc_tb.tb_lineno},error : {str(e)}'

                },
                status.HTTP_500_INTERNAL_SERVER_ERROR) 