from django.urls import path


from .views.user_views import RegisterView, LoginView, UserAPIView, RefreshAPIView, LogoutView, UpdateUserView, UserDelete
from .views.karyawan_views import KaryawanViews, KaryawanCreate, KaryawanUpdate, KaryawanDelete
from .views.departement_views import DepartementView, DepartementCreate, DepartmentUpdate, DepartmentDelete
from .views.calonkaryawan_views import CalonKaryawanView, CalonKaryawanCreate, CalonKaryawanUpdate, CalonKaryawanDelete, CalonKaryawanAccept, CalonKaryawanReject
from .views.tunjangan_views import TunjanganView, TunjanganCreate, TunjanganUpdate, TunjanganDelete
from .views.pinjaman_views import PinjamanView, PinjamanCreate, PinjamanUpdate, PinjamanDelete, PeminjamanApproval
from .views.kehadiran_views import KehadiranView, KehadiranCreate, KehadiranUpdate, KehadiranDelete, KehadiranApproval, KehadiranChartView
from .views.periode_views import PeriodeView, PeriodeCreate, PeriodeUpdate, PeriodeDelete
from .views.laporangaji_views import LaporanGajiView, LaporanGajiCreate, LaporanGajiUpdate, LaporanGajiDelete
from .views.slipgaji_views import SlipGajiView, SlipGajiCreate, SlipGajiUpdate, SlipGajiDelete
from .views.transaksi_views import TransactionView, TransactionCreate, TransactionUpdate, TransactionDelete
from .views.company import KaryawanList, ProductCreate, ProductList, ProductUpdate, ProductDelete, RecruitmentView, RecruitmentCreate, RecruitmentUpdate, RecruitmentDelete, ToggleCompanyStatus
from .views.dashboard import AdminandManagerDashboard, KaryawanDashboard, calonKaryawanDashboard
# from .views.soal_views import 


urlpatterns = [
    # dashboard 
    path('dashboard/admin/', AdminandManagerDashboard.as_view(), name='admin-dashboard'),  
    path('dashboard/karyawan/', KaryawanDashboard.as_view(), name='karyawan-dashboard'),  
    path('dashboard/calonKaryawan/', calonKaryawanDashboard.as_view(), name='calon-karyawan-dashboard'),


    # user
    path('register/', RegisterView.as_view(), name='register-users'),  
    path('login/', LoginView.as_view(), name='login-users'),  
    path('update-account/<int:id>/', UpdateUserView.as_view(), name='update-users'),  
    path('user/', UserAPIView.as_view(), name='users'),  
    path('delete-user/<int:id>/', UserDelete.as_view(), name='user-delete'),  
    path('refresh/', RefreshAPIView.as_view(), name='refresh-token'),
    path('logout/', LogoutView.as_view(), name='logout-users'),

    # karyawan
    path('karyawan/', KaryawanViews.as_view(), name='karyawan'),
    path('karyawan/<int:id>/', KaryawanViews.as_view(), name='karyawan'),
    path('create-karyawan/', KaryawanCreate.as_view(), name='karyawan-create'), 
    path('update-karyawan/<int:id>/', KaryawanUpdate.as_view(), name='karyawan-update'), 
    path('delete-karyawan/<int:id>/', KaryawanDelete.as_view(), name='karyawan-delete'), 

    # departement
    path('department/', DepartementView.as_view(), name='departement'), 
    path('create-department/', DepartementCreate.as_view(), name='departement-create'), 
    path('update-department/<int:id>/', DepartmentUpdate.as_view(), name='department-update'),
    path('delete-department/<int:id>/', DepartmentDelete.as_view(), name='department-delete'),

    # calon karyawan 
    path('calon-karyawan/', CalonKaryawanView.as_view(), name='calon-karyawan'),
    path('create-calon-karyawan/', CalonKaryawanCreate.as_view(), name='calon-karyawan-create'), 
    path('update-calon-karyawan/<int:id>/', CalonKaryawanUpdate.as_view(), name='calon-karyawan-update'),
    path('delete-calon-karyawan/<int:id>/', CalonKaryawanDelete.as_view(), name='calon-karyawan-delete'), 
    path('calon-karyawan/accept/<int:id>/', CalonKaryawanAccept.as_view(), name='calon-karyawan-accept'), 
    path('calon-karyawan/reject/<int:id>/', CalonKaryawanReject.as_view(), name='calon-karyawan-reject'), 
 
    # tunjangan karyawan
    path('tunjangan/', TunjanganView.as_view(), name='tunjangan'),
    path('create-tunjangan/', TunjanganCreate.as_view(), name='tunjangan-create'), 
    path('update-tunjangan/<int:id>/', TunjanganUpdate.as_view(), name='tunjangan-update'),
    path('delete-tunjangan/<int:id>/', TunjanganDelete.as_view(), name='tunjangan-delete'), 

    # pinjaman karyawan
    path('pinjaman/', PinjamanView.as_view(), name='pinjaman'),
    path('create-pinjaman/', PinjamanCreate.as_view(), name='pinjaman-create'), 
    path('update-pinjaman/<int:id>/', PinjamanUpdate.as_view(), name='pinjaman-update'),
    path('delete-pinjaman/<int:id>/', PinjamanDelete.as_view(), name='pinjaman-delete'), 
    path('approve-pinjaman/<int:id>/<str:action>/', PeminjamanApproval.as_view(), name='approve-reject-pinjaman'),
 

    # kehadiran karyawan
    path('kehadiran/', KehadiranView.as_view(), name='kehadiran'),
    path('create-kehadiran/', KehadiranCreate.as_view(), name='kehadiran-create'), 
    path('update-kehadiran/<int:id>/', KehadiranUpdate.as_view(), name='kehadiran-update'),
    path('delete-kehadiran/<int:id>/', KehadiranDelete.as_view(), name='kehadiran-delete'), 
    path('approve-kehadiran/<int:id>/', KehadiranApproval.as_view(), name='kehadiran-approve'), 
    path('kehadiran/chart/', KehadiranChartView.as_view(), name='kehadiran_chart'),
    path('kehadiran/chart/<int:year>/<int:month>/', KehadiranChartView.as_view(), name='kehadiran_chart_detail'),

    # periode karyawan
    path('periode/', PeriodeView.as_view(), name='periode'),
    path('create-periode/', PeriodeCreate.as_view(), name='periode-create'), 
    path('update-periode/<int:id>/', PeriodeUpdate.as_view(), name='periode-update'),
    path('delete-periode/<int:id>/', PeriodeDelete.as_view(), name='periode-delete'), 

    # laporan gaji karyawan
    path('laporan-gaji/', LaporanGajiView.as_view(), name='laporanGaji'),
    path('create-laporan-gaji/', LaporanGajiCreate.as_view(), name='laporanGaji-create'), 
    path('update-laporan-gaji/<int:id>/', LaporanGajiUpdate.as_view(), name='laporanGaji-update'),
    path('delete-laporan-gaji/<int:id>/', LaporanGajiDelete.as_view(), name='laporanGaji-delete'), 

    # slip gaji 
    path('slip-gaji/', SlipGajiView.as_view(), name='slipGaji'),
    path('create-slip-gaji/', SlipGajiCreate.as_view(), name='slipGaji-create'), 
    path('update-slip-gaji/<int:id>/', SlipGajiUpdate.as_view(), name='slipGaji-update'),
    path('delete-slip-gaji/<int:id>/', SlipGajiDelete.as_view(), name='slipGaji-delete'), 

    # transaksi pembayaran     
    path('transaction/', TransactionView.as_view(), name='transaction'),
    path('create-transaction/', TransactionCreate.as_view(), name='transaction-create'), 
    path('update-transaction/<int:id>/', TransactionUpdate.as_view(), name='transaction-update'),
    path('delete-transaction/<int:id>/', TransactionDelete.as_view(), name='transaction-delete'), 

    # recruitment 
    path('recruitment/', RecruitmentView.as_view(), name='recruitment'),
    path('create-recruitment/', RecruitmentCreate.as_view(), name='create-recruitment'),
    path('update-recruitment/<int:id>/', RecruitmentUpdate.as_view(), name='update-recruitment'),
    path('delete-recruitment/<int:id>/', RecruitmentDelete.as_view(), name='delete-recruitment'),

    # product
    path('product/', ProductList.as_view(), name='product'),
    path('create-product/', ProductCreate.as_view(), name='create-product'),
    path('update-product/<int:id>/', ProductUpdate.as_view(), name='update-product'),
    path('delete-product/<int:id>/', ProductDelete.as_view(), name='delete-product'),

    # karyawan list
    path('karyawan-list/', KaryawanList.as_view(), name='karyawan-list'),

    # toggle handle recruitment
    path('toggle-openrec/<int:id>/', ToggleCompanyStatus.as_view(), name='toggle-status'),
]