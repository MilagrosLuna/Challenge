import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-blue-500 p-4 text-white flex justify-between items-center rounded-lg shadow-md mb-6">
      <h1 className="text-xl font-bold">Gestión de Empleados</h1>
      <div>
        <Link href="/" className="mr-4 hover:underline">
          Inicio
        </Link>
        <Link href="/listado" className="hover:underline">
          Listado de Empleados
        </Link>
      </div>
    </nav>
  );
}
