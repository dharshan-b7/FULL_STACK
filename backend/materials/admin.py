from django.contrib import admin
from .models import Material

@admin.register(Material)
class MaterialAdmin(admin.ModelAdmin):
    list_display = ['material_type', 'weight', 'purity', 'source', 'status', 
                    'submitted_by', 'created_at']
    list_filter = ['material_type', 'status', 'created_at']
    search_fields = ['source', 'notes', 'submitted_by__full_name']
    readonly_fields = ['created_at']
    ordering = ['-created_at']
    
    fieldsets = (
        ('Material Information', {
            'fields': ('material_type', 'weight', 'purity', 'source')
        }),
        ('Status & Notes', {
            'fields': ('status', 'notes')
        }),
        ('Metadata', {
            'fields': ('submitted_by', 'created_at'),
            'classes': ('collapse',)
        }),
    )