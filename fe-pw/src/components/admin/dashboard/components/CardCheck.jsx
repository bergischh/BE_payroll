import {
    Card,
    CardHeader,
    Typography,
    Avatar,
} from "@material-tailwind/react";
import { Checkbox } from "@material-tailwind/react";
import { Icon } from "@iconify/react/dist/iconify.js"


const CardCheck = (props) => {
    const { name, posisi, foto } = props;
    return (
        <Card color="transparent" shadow={false} className="w-full max-w-[26rem] border my-4 border-purple-900 bg-white">
            <CardHeader
                color="transparent"
                floated={false}
                shadow={false}
                className="mx-0 flex items-center gap-2 pt-0 pb-2 mt-2"
            >
                <Avatar
                    size="lg"
                    variant="circular"
                    src={foto}
                    alt="tania andrew"
                    className="ms-2"
                />
                <div className="flex w-full flex-col">
                <div className="flex items-center justify-between h-[20px]">
    <Typography className="text-base" color="blue-gray">
        {name}
    </Typography>
    <div className="flex items-center gap-0">
        <p className="text-lg">Y</p>
        <Checkbox color="green" />
        <p className="text-lg">N</p>
        <Checkbox
            icon={<Icon icon="ph:x-bold" className="w-4 h-4" />}
            className="bg-transparent checked:bg-red-700 border-red-700"
        />
    </div>
</div>

                    <Typography color="blue-gray" className="text-xs">{posisi}</Typography>
                </div>
            </CardHeader>
        </Card>
    )
}

export default CardCheck