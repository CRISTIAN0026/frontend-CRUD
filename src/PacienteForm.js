import React, { useState, useEffect } from "react";
import api from "./api";
import './style.css'

const PacienteForm = ({ onAdd }) => {
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [medicoId, setMedicoId] = useState("");
  const [codigoPostal, setCodigoPostal] = useState("");
  const [nif, setNif] = useState("");
  const [numSeguridadSocial, setNumSeguridadSocial] = useState("");
  const [medicos, setMedicos] = useState([]);

  // Cargar la lista de médicos desde la API
  useEffect(() => {
    const fetchMedicos = async () => {
      try {
        const response = await api.get("/empleados/medicos");
          setMedicos(response.data);
          console.log(response.data)
      } catch (error) {
        console.error("Error al obtener médicos:", error);
      }
    };

    fetchMedicos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevoPaciente = {
      nombre,
      direccion,
      telefono,
      medicoId,
      codigoPostal,
      nif,
      numSeguridadSocial,
    };

    try {
      const response = await api.post("/pacientes", nuevoPaciente);
      onAdd(response.data);
      setNombre("");
      setDireccion("");
      setTelefono("");
      setMedicoId("");
      setCodigoPostal("");
      setNif("");
        setNumSeguridadSocial("");
    window.location.reload();
    } catch (error) {
      console.error("Error al agregar paciente:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Agregar Paciente</h2>
      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <input
        type="text"
        placeholder="Dirección"
        value={direccion}
        onChange={(e) => setDireccion(e.target.value)}
      />
      <input
        type="text"
        placeholder="Teléfono"
        value={telefono}
        onChange={(e) => setTelefono(e.target.value)}
      />

      {/* Campo select para el médico */}
      <select
              value={medicoId}
        onChange={(e) => setMedicoId(e.target.value)}
        required
      >
        <option value="">Seleccionar médico</option>
        {medicos.map((medico) => (
          <option
            key={medico.empleadoId || medico.empleado_id}
            value={medico.empleadoId || medico.empleado_id}
          >
            {medico.nombre}
          </option>
        ))}
      </select>

      {/* Campos adicionales */}
      <input
        type="text"
        placeholder="Código Postal"
        value={codigoPostal}
        onChange={(e) => setCodigoPostal(e.target.value)}
      />
      <input
        type="text"
        placeholder="NIF"
        value={nif}
        onChange={(e) => setNif(e.target.value)}
      />
      <input
        type="text"
        placeholder="Número de Seguridad Social"
        value={numSeguridadSocial}
        onChange={(e) => setNumSeguridadSocial(e.target.value)}
      />
      <button type="submit">Agregar</button>
    </form>
  );
};

export default PacienteForm;
