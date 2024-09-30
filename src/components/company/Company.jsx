import Index from '../company/home/Index.jsx';
import LdanP from '../company/content/LdanP.jsx';
import Bkaryawan from './content/Bkaryawan.jsx';
import ProdukT from './content/ProdukT.jsx';
import { Icon } from '@iconify/react';

const Company = () => {
    return (
        <>
            <div id="home-index"><Index></Index></div>
            <a href="#home-index" className="fixed z-50 bottom-6 right-6">
                <div className="rounded-full w-12 h-12 bg-black flex items-center justify-center">
                    <Icon icon="mingcute:arrow-up-fill" className="h-8 w-8 text-white"/>
                </div>
            </a>
            <LdanP></LdanP>
            <ProdukT></ProdukT>
            <Bkaryawan></Bkaryawan>
        </>
    );
};

export default Company;
