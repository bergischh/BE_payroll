import Latar from "./content-compo/Latar.jsx"
import Pendiri from "./content-compo/Pendiri.jsx"

const LdanP = () => {
    return (
        <>
            <div className="relative h-fit">
                <div className="absolute z-10">
                    <Pendiri></Pendiri>
                    <Latar></Latar>
                </div>
                <img src="./img/ldanp.png" alt="" className=" z-0"/>
            </div>
        </>
    );
};

export default LdanP