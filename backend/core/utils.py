import json
from django.shortcuts import render
from django.core.serializers.json import DjangoJSONEncoder
from django.forms.models import model_to_dict

def serialize_data(data):
    """
    Serializes a Django QuerySet or Model instance to a Python dict/list 
    ready for JSON serialization.
    """
    if data is None:
        return None
        
    # If it's a list (queryset), serialize each item
    if hasattr(data, '__iter__') and not isinstance(data, dict):
        return [serialize_model(item) for item in data]
        
    # If it's a single model instance
    return serialize_model(data)

def serialize_model(instance):
    """
    Helper to convert a single model instance to a dict.
    We handle specific fields manually to ensure relationships are useful.
    """
    if not hasattr(instance, '_meta'):
        # It's already a dict or primitive
        return instance
        
    data = model_to_dict(instance)
    
    # Handle specific fields that model_to_dict might miss or that we want to customize
    # For example, foreign keys usually return IDs, but we might want username
    if hasattr(instance, 'user') and instance.user:
        data['user'] = {
            'id': instance.user.id,
            'username': instance.user.username,
        }
        
    if hasattr(instance, 'helper') and instance.helper:
        helper_phone = "Not provided"
        # Try to access profile safely
        if hasattr(instance.helper, 'profile'):
             helper_phone = instance.helper.profile.phone

        data['helper'] = {
            'id': instance.helper.id,
            'username': instance.helper.username,
            'phone': helper_phone
        }
        
    # Add ID if missing (model_to_dict sometimes excludes it)
    if 'id' not in data:
        data['id'] = instance.pk
        
    return data

def render_react(request, context=None):
    """
    Renders the single 'index.html' template but injects the context 
    as a JSON script variable so React can pick it up.
    """
    if context is None:
        context = {}
        
    # Always include user info
    user_data = None
    if request.user.is_authenticated:
        user_data = {
            'id': request.user.id,
            'username': request.user.username,
            'email': request.user.email,
        }
    
    # Merge user data into context
    final_context = context.copy()
    final_context['user'] = user_data
    final_context['request'] = {'user': user_data} # Redundant but safe for legacy checks

    # Serialize the entire context to JSON
    # We use DjangoJSONEncoder to handle dates, etc.
    context_json = json.dumps(final_context, cls=DjangoJSONEncoder)
    
    return render(request, 'index.html', {
        'context_json': context_json
    })
