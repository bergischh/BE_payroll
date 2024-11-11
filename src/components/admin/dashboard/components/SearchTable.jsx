import { Icon } from "@iconify/react/dist/iconify.js"
import { Button, Input } from "@material-tailwind/react"
import { useState } from "react";

const SearchTable = (props) => {
    const [cari, setCari] = useState("");
    const onChange = ({ target }) => setCari(target.value);
    const { posisi } = props;

    return (
            <div className={`relative flex w-full max-w-[24rem] ${posisi}`}>
                <Input
                    type="text"
                    placeholder="Cari..."
                    value={cari}
                    onChange={onChange}
                    className={`pr-20 border ${cari ? 'border-[#967DB8]' : 'border-slate-200'}`}
                    containerProps={{ className: "min-w-0" }}
                />
                <Button
                    size="sm"
                    color="blue-gray"
                    style={{
                        backgroundColor: cari ? '#7E679F' : '', // Ganti warna ketika ada input
                    }}
                    disabled={!cari}
                    className="!absolute right-1 px-2 py-1 mt-[6px]"
                >
                    <Icon icon="ic:outline-search" className="h-5 w-5"/>
                </Button>
        </div>
    )
}
export default SearchTable