from django.shortcuts import render

# Create your views here.
class AdminCreateOrUpdateUserApiView():

    def post(self,request):
        return Response({"message":"User created successfully"},status=status.HTTP_201_CREATED)