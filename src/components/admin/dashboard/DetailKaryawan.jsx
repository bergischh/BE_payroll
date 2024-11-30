

const DetailKaryawan = ({ setActivePage }) => {
    return (
        <>
            <h1>Detail Karyawan</h1>
            <button onClick={() => setActivePage("Data Karyawan")}>
                Kembali ke Data Karyawan
            </button>
        </>
    );
};

export default DetailKaryawan;
