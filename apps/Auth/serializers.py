import re
from rest_framework import serializers
from apps.user.models import Users
from e_commerce_core.helpers.helper import get_object_or_none
from rest_framework_simplejwt.tokens import RefreshToken,TokenError

class CreateOrUpdateUserSerializer(serializers.ModelSerializer):
    user = serializers.IntegerField(allow_null=True,required=False)
    phone_number = serializers.CharField(required=True,allow_null=True,allow_blank=True)
    # profile_image             = serializers.CharField(required=False, allow_null=True, allow_blank=True)
    username = serializers.CharField(required=True)
    gender = serializers.CharField(required=False)
    name = serializers.CharField(required=False)
    email = serializers.EmailField(required=False,allow_null=True,allow_blank=True)
    password = serializers.CharField(required=False, write_only=True)
    is_admin = serializers.BooleanField(default=False)
    is_staff = serializers.BooleanField(default=True)
    is_active = serializers.BooleanField(default=True)

    class Meta:
        model = Users
        fields = ['user','phone_number','username','gender','name','email','password','is_admin','is_staff',"is_active"]

        extra_kwargs = {
            'password': {'write_only': True}  # Never return password in response
        }


    def validate(self, attrs):
        email           = attrs.get('email', '')
        user            = attrs.get('user', None)
        username        = attrs.get('username', None)
        password        = attrs.get('password', None)
        phone_number = attrs.get('phone_number',None)

        
        user_query_set = Users.objects.filter(email=email)
        user_object    = Users.objects.filter(username=username)
        user_phone = Users.objects.filter(phone_number=phone_number)

        if username is not None:
            if not re.match("^[a-zA-Z0-9._@]*$", username):
                raise serializers.ValidationError({'username':("Enter a valid Username. Only alphabets, numbers, '@', '_', and '.' are allowed.")})
            
        if user is not None:
            user_instance = get_object_or_none(Users,pk=user)
            user_query_set = user_query_set.exclude(pk=user_instance.pk)
            user_object    = user_object.exclude(pk=user_instance.pk)
            user_phone = user_phone.exclude(pk=user_instance.pk)
        
        if user_object.exists():
            raise serializers.ValidationError({"username":('Username already exists!')})
        
        if user_query_set.exists():
            raise serializers.ValidationError({"email":('Email already exists!')})
        
        if user_phone.exists():
            raise serializers.ValidationError({"number":('Phone number already exists!')})
        
        if password is not None and (len(password) < 8 or not any(char.isupper() for char in password) or not any(char.islower() for char in password) or not any(char.isdigit() for char in password) or not any(char in '!@#$%^&*()_+-=[]{}|;:,.<>?\'\"\\/~`' for char in password)):
            raise serializers.ValidationError({"password":('Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Character')})
            
            
        return super().validate(attrs)
    

    def create(self, validated_data):
        password                  = validated_data.get('password')
        
        instance                  = Users()
        instance.username         = validated_data.get('username')
        instance.name            = validated_data.get('name')
        instance.phone_number = validated_data.get('phone_number')
        instance.email            = validated_data.get('email')
        instance.set_password(password) 
        instance.is_active        = validated_data.get('is_active')
        instance.is_admin         = validated_data.get('is_admin')
        instance.is_staff         = True
        instance.save()
        
        # groups = validated_data.pop('groups')
        
        # for group_instance in groups:
        #     if group_instance is not None:
        #         group_instance.user_set.add(instance)
        
        return instance
    


    def update(self, instance, validated_data):
        
        # groups = validated_data.pop('groups')
        
        # active_groups = instance.user_groups.all().values_list('id',flat=True)
                
        # remove_groups = [item for item in active_groups if str(item) not in groups]
        
        # [groups.remove(str(item)) for item in active_groups if str(item) in groups]
        
        password = validated_data.get('password','')
        # emp_id = validated_data.get('emp_id')
        # name = validated_data.get('name')
     
 
        instance.username = validated_data.get('username')
        instance.email = validated_data.get('email')
        instance.name            = validated_data.get('name')
        instance.phone_number = validated_data.get('phone_number')

        instance.phone_number = validated_data.get('phone_number ')
        if password:
            instance.set_password(password) 

        if validated_data.get('is_active',''):
            instance.is_active = validated_data.get('is_active')
            
            
        if validated_data.get('is_admin',''):
            instance.is_admin = validated_data.get('is_admin')
            
        if validated_data.get('is_staff',''):
            instance.is_staff = validated_data.get('is_staff')
        
        instance.save()

        
        # for remove_group in remove_groups:
        #     remove_group_instance = get_object_or_none(Group,id=remove_group)
        #     if remove_group_instance is not None:
        #         remove_group_instance.user_set.remove(instance)
        
        # if instance is not None:
        #     for group_instance in groups:
        #         if group_instance is not None:
        #             group_instance.user_set.add(instance)
                
        return instance
    

class LoginSerializer(serializers.ModelSerializer):
    username = serializers.CharField()
    password = serializers.CharField()

    class Meta:
        model = Users
        fields = ['username','password']



class LogoutSerializer(serializers.Serializer):
    refresh = serializers.CharField()

    default_error_message = {
        'bad_token':('Token is expired or invalid')
    }

    def validate(self,attrs):
        self.token = attrs['refresh']
        return attrs

    def save(self, **kwargs):
        try:
            RefreshToken(self.token).blacklist()

        except TokenError:
            self.fail('bad_token')