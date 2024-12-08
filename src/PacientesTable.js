import React, { useState } from "react";
import api from "./api";
import './style.css'

const PacientesTable = ({ pacientes, onUpdate }) => {
  const [editingId, setEditingId] = useState(null);
  const [editedData, setEditedData] = useState({});

  const handleEdit = (id) => {
    setEditingId(id);
    const paciente = pacientes.find((p) => p.pacienteId === id || p.paciente_id === id);
    setEditedData(paciente);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const response = await api.put(`/pacientes/${editingId}`, editedData);
      // Actualizar la lista con el paciente modificado
      const updatedPacientes = pacientes.map((paciente) =>
        paciente.pacienteId === editingId ? response.data : paciente
      );
      window.location.reload();
      onUpdate(updatedPacientes);
      setEditingId(null);
      setEditedData({});
    } catch (error) {
      console.error("Error al actualizar paciente:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/pacientes/${id}`);
      // Filtrar la lista de pacientes después de eliminar
      const updatedPacientes = pacientes.filter(
        (paciente) => paciente.pacienteId !== id
      );
      window.location.reload();
      onUpdate(updatedPacientes);
    } catch (error) {
      console.error("Error al eliminar paciente:", error);
    }
  };

  return (
    <div>
      <h1>Lista de Pacientes</h1>

      <table border="1">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Dirección</th>
            <th>Teléfono</th>
            <th>Médico</th>
            <th>Código Postal</th>
            <th>NIF</th>
            <th>Número de Seguridad Social</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pacientes.map((paciente) => (
            <tr key={paciente.pacienteId || paciente.id || Math.random()}>
              {editingId === paciente.pacienteId ||
              editingId === paciente.paciente_id ? (
                <>
                  <td>
                    <input
                      name="nombre"
                      value={editedData.nombre || ""}
                      onChange={handleEditChange}
                    />
                  </td>
                  <td>
                    <input
                      name="direccion"
                      value={editedData.direccion || ""}
                      onChange={handleEditChange}
                    />
                  </td>
                  <td>
                    <input
                      name="telefono"
                      value={editedData.telefono || ""}
                      onChange={handleEditChange}
                    />
                  </td>
                  <td>
                    <input
                      name="medicoId"
                      disabled={true}
                      value={editedData.medicoId || "" || paciente.medico_id}
                      onChange={handleEditChange}
                    />
                  </td>
                  <td>
                    <input
                      name="codigoPostal"
                      value={
                        editedData.codigoPostal || "" || paciente.codigo_postal
                      }
                      onChange={handleEditChange}
                    />
                  </td>
                  <td>
                    <input
                      name="nif"
                      value={editedData.nif || ""}
                      onChange={handleEditChange}
                    />
                  </td>
                  <td>
                    <input
                      name="numSeguridadSocial"
                      value={
                        editedData.numSeguridadSocial ||
                        "" ||
                        paciente.num_seguridad_social
                      }
                      onChange={handleEditChange}
                    />
                  </td>
                  <td>
                    <button onClick={handleSave}>Guardar</button>
                    <button onClick={() => setEditingId(null)}>Cancelar</button>
                  </td>
                </>
              ) : (
                <>
                  {console.log(paciente)}
                  <td>{paciente.nombre}</td>
                  <td>{paciente.direccion}</td>
                  <td>{paciente.telefono}</td>
                  <td>{paciente.medicoId || paciente.medico_id}</td>
                  <td>{paciente.codigoPostal || paciente.codigo_postal}</td>
                  <td>{paciente.nif}</td>
                  <td>
                    {paciente.numSeguridadSocial ||
                      paciente.num_seguridad_social}
                  </td>
                  <td>
                    <button
                      onClick={() =>
                        handleEdit(paciente.pacienteId || paciente.paciente_id)
                      }
                    >
                      Editar
                    </button>
                    <button
                      onClick={() =>
                        handleDelete(
                          paciente.pacienteId || paciente.paciente_id
                        )
                      }
                    >
                      Eliminar
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PacientesTable;
