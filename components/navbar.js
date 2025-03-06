import { useState } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <nav className="bg-blue-500 p-4 text-white flex justify-between items-center rounded-lg shadow-md mb-6 relative">
      <h1 className="text-xl font-bold">Gestión de Empleados</h1>

      <button
        onClick={() => setMenuAbierto(!menuAbierto)}
        className="md:hidden text-2xl z-50"
      >
        {menuAbierto ? <FaTimes /> : <FaBars />}
      </button>

      <div
        className={`absolute md:static top-14 left-1/2 transform -translate-x-1/2 w-11/12 md:w-auto bg-blue-600 md:bg-transparent rounded-lg md:rounded-none shadow-lg md:shadow-none flex flex-col md:flex-row md:items-center p-4 md:p-0 space-y-4 md:space-y-0 md:space-x-4 transition-all duration-300 ${
          menuAbierto ? "block" : "hidden md:flex"
        }`}
      >
        <Link href="/" className="hover:underline">
          Inicio
        </Link>
        <Link href="/listado" className="hover:underline">
          Listado de Empleados
        </Link>
      </div>
    </nav>
  );
}
