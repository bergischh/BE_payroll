import React from "react";
import {
    Navbar,
    Collapse,
    Button,
    IconButton,
} from "@material-tailwind/react";
import { Icon } from '@iconify/react';

export function StickyNavbar() {
    const [openNav, setOpenNav] = React.useState(false);

    React.useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false),
        );
    }, []);

    const navList = (
        <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <li className="relative group">
                <Icon icon="mdi:home" className="h-8 w-8 text-white"/>
                <span className="absolute bottom-[-6px] left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </li>
            <li className="relative group">
                <Icon icon="bxs-file" className="h-7 w-7 text-white"/>
                <span className="absolute bottom-[-6px] left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </li>
            <li className="relative group">
                <Icon icon="iconamoon:profile-fill" className="h-8 w-8 text-white"/>
                <span className="absolute bottom-[-6px] left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </li>
            <li className="relative group">
                <Icon icon="clarity:group-solid" className="h-9 w-9 text-white"/>
                <span className="absolute bottom-[-6px] left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </li>
            <li className="relative group">
                <Icon icon="fa-solid:pencil-ruler" className="h-6 w-6 text-white"/>
                <span className="absolute bottom-[-11px] left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </li>
            <li className="relative group">
                <Icon icon="material-symbols:format-image-left" className="h-8 w-8 text-white"/>
                <span className="absolute bottom-[-6px] left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </li>
        </ul>
    );

    return (
        <div className="w-full flex items-center justify-center">
            <Navbar className="bg-white bg-opacity-25 top-0 mt-5 z-10 w-2/5 mx-auto h-max max-w-full border-none rounded-full px-4 py-2 lg:px-8 lg:py-4 mr-40">
                <div className="flex items-center justify-center text-blue-gray-900 mx-auto">
                    <div className="flex items-center gap-4">
                        <img src="./img/logo.png" alt="Logo" className="h-10 w-10" />
                        <div className="border border-transparent border-l-black h-7"></div>
                        <div className="hidden lg:block">{navList}</div>
                    </div>
                  <IconButton
                        variant="text"
                        className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                        ripple={false}
                        onClick={() => setOpenNav(!openNav)}
                    >
                        {openNav ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                className="h-6 w-6"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        )}
                  </IconButton>
                </div>
                <Collapse open={openNav}>
                    {navList}
                    <div className="flex items-center gap-x-1">
                        <Button fullWidth variant="text" size="sm" className="rounded-full">
                            <span>Sign In</span>
                        </Button>
                        <Button fullWidth variant="gradient" size="sm" className="rounded-full">
                            <span>Sign Up</span>
                        </Button>
                    </div>
                </Collapse>
            </Navbar>
            <div className="flex gap-4 ml-4 mr-5">
                <Button type="submit" className="text-white bg-white bg-opacity-25 btn-lg py-2 px-5 rounded-full border-white border">Sign In</Button>
                <Button type="submit" className="text-white bg-white bg-opacity-25 btn-lg px-5 py-2 rounded-full border-white border">Sign Up</Button>
            </div>
        </div>
    );
}
export default StickyNavbar;
