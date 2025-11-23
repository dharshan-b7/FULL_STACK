from django.db import models

class ByProduct(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('processing', 'Processing'),
        ('completed', 'Completed'),
        ('recycled', 'Recycled'),
    ]

    name = models.CharField(max_length=100)
    quantity = models.FloatField()
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='pending')

    # extra fields for frontend display (optional)
    source = models.CharField(max_length=100, blank=True)
    date = models.DateField(null=True, blank=True)
    potential_uses = models.TextField(blank=True)

    def __str__(self):
        return self.name
