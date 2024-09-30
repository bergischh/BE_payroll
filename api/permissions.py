from rest_framework.permissions import BasePermission

class IsAdmin(BasePermission):
    """
    Permission class yang hanya memperbolehkan akses untuk role 'admin'.
    """

    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'admin'
    
class IsManager(BasePermission):

    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'manager'
    
class IsKaryawan(BasePermission):

    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'karyawan'

class IsCalonKaryawan(BasePermission):

    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'calon_karyawan'
    