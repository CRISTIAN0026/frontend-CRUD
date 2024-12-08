import React, { useState, useEffect } from "react";
import PacienteForm from "./PacienteForm";
import PacientesTable from "./PacientesTable";
import api from "./api";

const App = () => {
  const [pacientes, setPacientes] = useState([]);

  // Cargar pacientes al montar el componente
  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const response = await api.get("/pacientes");
        setPacientes(response.data);
      } catch (error) {
        console.error("Error al cargar pacientes:", error);
      }
    };

    fetchPacientes();
  }, []);

  const handleAddPaciente = (nuevoPaciente) => {
    setPacientes((prev) => [...prev, nuevoPaciente]);
  };

  const handleUpdatePaciente = (updatedPaciente) => {
    setPacientes((prev) =>
      prev.map((p) => (p.id === updatedPaciente.id ? updatedPaciente : p))
    );
  };

  return (
    <div>
      <h1>Gestión de Pacientes</h1>
      <div display='flex'>
      <PacienteForm onAdd={handleAddPaciente} />
      <PacientesTable
        pacientes={pacientes}
        onUpdate={handleUpdatePaciente}
      />
      </div>
    </div>
  );
};

export default App;
