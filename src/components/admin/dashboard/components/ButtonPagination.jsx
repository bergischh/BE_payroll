import { Button, IconButton } from "@material-tailwind/react"
import { Icon } from "@iconify/react/dist/iconify.js"

const ButtonPagination = () => {
    return (
        <>
        <div className="flex gap-2 justify-center pagination">
            <Button variant="outlined" size="sm" className="p-1 bg-[#7E679F] text-white">
                <Icon icon="ic:round-arrow-left" className="h-6 w-6" />
            </Button>
            {[1, 2, "...", 9, 10].map((page) => (
                <IconButton key={page} variant={page === 1 ? "outlined" : "text"} size="sm" className="bg-[#7E679F] text-white">
                    {page}
                </IconButton>
            ))}
            <Button variant="outlined" size="sm" className="p-1 bg-[#7E679F] text-white">
                <Icon icon="ic:round-arrow-right" className="h-6 w-6" />
            </Button>
        </div>
        </>
    )
}

export default ButtonPagination