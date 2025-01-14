import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context-Api/AuthProvider"; // Pastikan path ini benar
import Login from "./components/Login";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <AuthProvider>  {/* Pastikan AuthProvider membungkus aplikasi */}
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/adminSidebar" element={<Sidebar />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
