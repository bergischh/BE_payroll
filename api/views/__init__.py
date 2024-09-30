from .user_views import RegisterView, LoginView, UserAPIView, RefreshAPIView, LogoutView
from .departement_views import DepartementCreate, DepartementView
from .karyawan_views import KaryawanViews, KaryawanCreate, KaryawanUpdate, KaryawanDelete
from .calonkaryawan_views import CalonKaryawanView, CalonKaryawanCreate, CalonKaryawanUpdate, CalonKaryawanDelete
from .tunjangan_views import TunjanganView, TunjanganCreate, TunjanganUpdate, TunjanganDelete
from .pinjaman_views import PinjamanView, PinjamanCreate, PinjamanUpdate, PinjamanDelete
from .kehadiran_views import KehadiranView, KehadiranCreate, KehadiranUpdate, KehadiranDelete
from .periode_views import PeriodeView, PeriodeCreate, PeriodeUpdate, PeriodeDelete
from .laporangaji_views import LaporanGajiView, LaporanGajiCreate, LaporanGajiUpdate, LaporanGajiDelete
from .slipgaji_views import SlipGajiView, SlipGajiCreate, SlipGajiUpdate, SlipGajiDelete
from .transaksi_views import TransactionView, TransactionCreate, TransactionUpdate, TransactionDelete
