import { useState,useEffect } from "react";
import { 
    Spinner,
 } from "@material-tailwind/react";
import SearchTable from "./components/SearchTable";
import CardDetailRekrut from "./components/CardDetailRekrut";

const Recruitment = () => {
    // loading
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulasi loading data selama 0.8 detik
        const timer = setTimeout(() => setLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Spinner className="h-12 w-12" />
            </div>
        );
    }
    return(
        <>
            <div className="flex flex-col h-screen">
                <div className="overflow-y-auto mac-scrollbar mac-scrollbar-x mac-scrollbar-y mb-20 pr-4">
                    <div className="w-full mb-8">
                        <SearchTable posisi="mx-auto"/>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="...">
                            <CardDetailRekrut />
                        </div>
                        <div className="...">
                            <CardDetailRekrut />
                        </div>
                        <div className="...">
                            <CardDetailRekrut />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Recruitment