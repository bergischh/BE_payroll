import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context-Api/AuthProvider"; // Adjust the path if needed
import Login from "./components/Login";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <AuthProvider>
      {" "}
      {/* Make sure AuthProvider is wrapping your app */}
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