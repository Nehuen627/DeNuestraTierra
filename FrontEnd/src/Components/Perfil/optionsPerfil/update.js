import React, { useState } from "react";
import "./update.css";
import api from "../../../axios/api.js";
import { useParams } from "react-router";

const UpdateUserInfo = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    birthDate: "",
    province: "",
    informativeEmails: true,
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const [updateMode, setUpdateMode] = useState("info");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (updateMode === "info") {
        // Update user info
        const response = await api.patch(`/api/users/update/${id}`, formData);
        if (response.data.success) {
          alert("Información actualizada con éxito");
        } else {
          alert("Error al actualizar la información");
        }
      } else if (updateMode === "password") {
        // Update password
        const response = await api.patch(`/api/users/update-password/${id}`, passwordData);
        if (response.data.success) {
          alert("Contraseña actualizada con éxito");
        } else {
          alert("Error al actualizar la contraseña");
        }
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Error al actualizar la información");
    }
  };

  return (
    <div className="updateUserInfo">
      <h2>Actualizar Información</h2>
      <div className="updateOptions">
        <button onClick={() => setUpdateMode("info")}>Actualizar Información</button>
        <button onClick={() => setUpdateMode("password")}>Actualizar Contraseña</button>
      </div>

      {updateMode === "info" && (
        <form onSubmit={handleSubmit}>
          <label>
            Nombre:
            <input type="text" name="name" value={formData.name} onChange={handleChange} />
          </label>
          <label>
            Apellido:
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
          </label>
          <label>
            Fecha de Nacimiento:
            <input type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} />
          </label>
          <label>
            Provincia:
            <input type="text" name="province" value={formData.province} onChange={handleChange} />
          </label>
          <label>
            Recibir correos informativos:
            <input
              type="checkbox"
              name="informativeEmails"
              checked={formData.informativeEmails}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Actualizar Información</button>
        </form>
      )}

      {updateMode === "password" && (
        <form onSubmit={handleSubmit}>
          <label>
            Contraseña Actual:
            <input
              type="password"
              name="currentPassword"
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
            />
          </label>
          <label>
            Nueva Contraseña:
            <input
              type="password"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
            />
          </label>
          <button type="submit">Actualizar Contraseña</button>
        </form>
      )}
    </div>
  );
};

export default UpdateUserInfo;
