import { AuthProvider } from "./context-Api/AuthProvider.jsx"; // Pastikan path sesuai
import Company from "./components/company/Company.jsx"; // Komponen lain yang akan ditampilkan

function App() {
  return (
    <AuthProvider>
      {" "}
      {/* Membungkus aplikasi dengan AuthProvider */}
      <Company />
    </AuthProvider>
  );
}

export default App;