# Gestión de Pacientes

Este repositorio implementa una aplicación básica para la gestión de pacientes usando React. Incluye funcionalidades para listar, agregar y actualizar pacientes, interactuando con un API simulada.

---

## Estructura del Proyecto

- **`App.js`**: Componente principal de la aplicación que gestiona el estado global de los pacientes y la interacción entre los componentes secundarios.
- **`PacienteForm`**: Componente para crear nuevos pacientes.
- **`PacientesTable`**: Componente para visualizar y editar pacientes existentes.
- **`api.js`**: Módulo para interactuar con el API simulado, encapsulando las solicitudes HTTP.

---

## Características

1. **Listado de Pacientes**  
   Los pacientes se cargan desde un API al montar el componente principal y se muestran en una tabla interactiva.

2. **Agregar Pacientes**  
   Utilizando el formulario, los usuarios pueden agregar nuevos pacientes. Los datos ingresados se reflejan en la tabla automáticamente.

3. **Actualizar Pacientes**  
   La tabla permite la actualización de datos de pacientes. Los cambios se reflejan en tiempo real en el estado de la aplicación.

---

## Instalación

1. Clonar este repositorio:
   ```bash
   git clone https://github.com/tu_usuario/gestion-pacientes.git
   cd gestion-pacientes

