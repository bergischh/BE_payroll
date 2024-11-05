import StickyNavbar from './home-compo/StickyNavbar.jsx'
import '../../../components/Fonts.css';

const Index = () => {
    return (
        <>
            <div className="absolute">
                <StickyNavbar></StickyNavbar>
                <div className="bg-white/35 text-center text-white mx-64 p-6 rounded-[20px] mt-16">
                    <h1 className='home-tittle text-9xl pt-6'>Ola Statonery</h1>
                    <p className='mx-7 text-2xl text mt-5'>Ola stationery menyediakan berbagai perlengkapan menulis dan kebutuhan perkantoran seperti pensil, pulpen, penghapus, buku catatan, kertas, map, dan aksesori tambahan seperti penggaris, gunting, serta perlengkapan seni. Toko ini ideal untuk siswa, mahasiswa, dan pekerja kantor.</p>
                </div>
            </div>
            <img src="/img/home-comp.png" alt="" className="w-screen h-screen"/>
        </>
    )
}
export default Index