import ListadoEmpleados from "@/components/listado";
import Navbar from "@/components/navbar";

export default function Listado() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Navbar></Navbar>
      <div className="max-w-4xl mx-auto space-y-6">
        <ListadoEmpleados />
      </div>
    </div>
  );
}
