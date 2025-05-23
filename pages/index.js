import FormularioAltaEmpleado from "@/components/alta";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Navbar></Navbar>
      <div className="max-w-4xl mx-auto space-y-6">
        <FormularioAltaEmpleado />
      </div>
    </div>
  );
}
