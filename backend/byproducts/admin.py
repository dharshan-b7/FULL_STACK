from django.contrib import admin
from .models import ByProduct

@admin.register(ByProduct)
class ByProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'quantity', 'source', 'status', 'date', 'managed_by']
    list_filter = ['status', 'date']
    search_fields = ['name', 'source', 'potential_uses']
    readonly_fields = ['date', 'created_at']
    ordering = ['-created_at']
    
    fieldsets = (
        ('By-Product Information', {
            'fields': ('name', 'quantity', 'source', 'potential_uses')
        }),
        ('Management', {
            'fields': ('status', 'managed_by')
        }),
        ('Metadata', {
            'fields': ('date', 'created_at'),
            'classes': ('collapse',)
        }),
    )