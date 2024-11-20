import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ThemeProvider } from "@material-tailwind/react"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/Login.jsx'
import Regis from './components/Regis.jsx'
import Company from './components/company/Company.jsx'
import ProdukT from './components/company/content/ProdukT.jsx'
import Bkaryawan from './components/company/content/Bkaryawan.jsx'
import Rekruitmen from './components/company/content/Rekruitmen.jsx'
import Index from './components/company/home/Index.jsx'
import Pendiri from './components/company/content/content-compo/Pendiri.jsx'
import Latar from './components/company/content/content-compo/Latar.jsx'
import Sidebar from './components/admin/Sidebar.jsx'
import DetailKaryawan from './components/admin/dashboard/DetailKaryawan.jsx'

const router = createBrowserRouter([
  {
    path:"/login",
    element: <Login />,
  },
  {
    path:"/adminSidebar",
    element: <Sidebar />,
  },
  {
    path:"/regis",
    element: <Regis />,
  },
  {
    path:"/",
    element: <Company />,
  },
  {
    path:"/latar",
    element: <Latar />,
  },
  {
    path:"/pendiri",
    element: <Pendiri />,
  },
  {
    path:"/produk",
    element: <ProdukT />,
  },
  {
    path:"/karyawan",
    element: <Bkaryawan />,
  },
  {
    path:"/rekrut",
    element: <Rekruitmen />,
  },
  {
    path:"/home",
    element: <Index />,
  },
  {
    path:"/DetailKaryawan",
    element: <DetailKaryawan />,
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <RouterProvider router={router}/>
    </ThemeProvider>
  </StrictMode>,
)
