from django.core.management.base import BaseCommand
# from django.contrib.contenttypes.models import ContentType
from django.core.management import call_command
from django.db.models import Q
from django.contrib.auth import get_user_model

# from django.contrib.auth.models import Permission

class Command(BaseCommand):
    help = 'Closes the specified poll for voting'


    def handle(self, *args, **options):
        
        call_command('makemigrations')
        call_command('migrate')
        
        
        if get_user_model().objects.filter(is_superuser=1).count() == 0:
            call_command('createsuperuser')
            
            
        # content_type = ContentType.objects.get(model='role')
        
        # Permission.objects.filter(~Q(content_type=content_type)).delete()
        
        
        