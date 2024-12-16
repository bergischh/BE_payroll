
const ListData = ({ label, value }) => {
    return (
        <div className="flex px-3 items-center my-2">
            <p className="text-sm w-2/5">{label}</p>
            <div className="w-3/5 border border-black rounded-full px-4 py-2 text-gray-700 text-sm">
                {value ? value : "-"} {/* Menampilkan nilai jika ada, jika tidak tampilkan tanda "-" */}
            </div>
        </div>
    );
};

export default ListData;
