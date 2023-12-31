import React, { useState } from "react";
import useClients from "../hooks/useClients";
import { Link } from "react-router-dom";
export default function AddClient() {
  const [name, setName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [dni, setDni] = useState(null);
  const [telf, setTelf] = useState(null);
  const [dir, setDir] = useState(null);
  const [comment, setComment] = useState(null);
  const { registerClient } = useClients();

  const onSubmit = (e) => {
    e.preventDefault();

    registerClient({
      endPoint: "post-client",
      data: {
        name,
        lastName,
        dni,
        telf,
        dir,
        comment,
      },
    });
  };
  return (
    <section>
      <Link to="/">Volver al inicio</Link>
      <h2>Añadir usuario</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor="name">Nombres</label>
        <input
          type="text"
          id="name"
          required
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="last-name">Apellidos</label>
        <input
          type="text"
          id="last-name"
          required
          onChange={(e) => setLastName(e.target.value)}
        />

        <label htmlFor="dni">Cedula de identidad</label>
        <input
          type="number"
          id="dni"
          required
          onChange={(e) => setDni(e.target.value)}
        />

        <label htmlFor="telf">Numero de telefono</label>
        <input
          type="text"
          id="telf"
          required
          onChange={(e) => setTelf(e.target.value)}
        />

        <label htmlFor="dir">Direccion</label>
        <textarea id="name" required onChange={(e) => setDir(e.target.value)} />

        <label htmlFor="comment">Observacion</label>
        <input
          type="text"
          id="comment"
          onChange={(e) => setComment(e.target.value)}
        />

        <br />
        <input type="submit" value="Registrar" />
      </form>
    </section>
  );
}
