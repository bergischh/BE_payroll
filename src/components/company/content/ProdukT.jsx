import Produk from './content-compo/Produk.jsx'

const ProdukT = () => {
    return (
        <>
            <div className="absolute w-11/12 h-full mx-14 mt-6">
                <h1 className='text text-5xl pt-6 mb-5 mt-3 font-semibold text-center'>Produk <span className="ms-5 text-transparent bg-clip-text bg-gradient-to-r from-[#7E679F] to-[#97698C]"> Tersedia</span></h1>
                <div className="border-b border-black w-3/5 mb-8 mx-auto"></div>
                <div className="flex justify-center mx-auto mt-12">
                    <Produk></Produk>
                </div>
            </div>
            <img src="/img/produk.png" alt="" className='mt-96 h-84'/>
        </>
    )
}
export default ProdukT