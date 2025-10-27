from django.db import models
from django.contrib.auth.models import AbstractBaseUser,BaseUserManager,PermissionsMixin
from e_commerce_core.mixins import AbstractDateFieldMix
from django.utils.translation import gettext_lazy as _


# Create your models here.


class UserManager(BaseUserManager):
    def create_user(self,email,password=None,**extra_fields):
        if not email:
            raise ValueError(_('The username must be set'))
        email = self.normalize_email(email)
        user = self.model(email=email,**extra_fields)

        if password:
            user.set_password(password.strip())
        user.save()

        return user
    

    def create_superuser(self,email,password,**extra_fields):
        extra_fields.setdefault('is_superuser',True)
        extra_fields.setdefault('is_staff',True)
        extra_fields.setdefault('is_active',True)
        extra_fields.setdefault("is_admin",True)
        extra_fields.setdefault('is_verified',True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError(_('Superuser must have is_staff = True.'))
        
        if extra_fields.get('is_superuser') is not True:
            raise ValueError(_('Superuser must have is_superuser = True'))
        
        return self.create_user(email,password,**extra_fields)




class Users(AbstractBaseUser,PermissionsMixin):
    class Gender(models.TextChoices):
        male = "Male"
        female = "Female"
        other = "Other"
    
    email = models.EmailField(blank=True, null=True,unique=True)
    username = models.CharField(max_length=255,blank=True, null=True,unique=True)
    name = models.CharField(max_length=30,blank=True, null=True)
    password = models.CharField(max_length=255,blank=True, null=True,editable=False)
    profile_image = models.FileField(blank=True, null=True)
    phone_number = models.CharField(max_length=12,blank=True, null=True,unique=True)
    gender = models.CharField(max_length=30,choices=Gender.choices,blank=True, null=True,default=Gender.other)
    is_verified = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = []

    objects = UserManager()


class GeneratedAcsessToken(AbstractDateFieldMix):
    token = models.TextField()
    user = models.ForeignKey(Users,on_delete=models.CASCADE,blank=True, null=True)

    def __str__(self):
        return self.token