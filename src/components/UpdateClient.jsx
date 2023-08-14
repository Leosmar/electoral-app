import React, { useState } from "react";
import styles from "./styles/UpdateClient.module.css";
import useClients from "../hooks/useClients";

export default function UpdateClient({ data, setHiddenUpdateClient }) {
  const [name, setName] = useState(data?.name);
  const [lastName, setLastName] = useState(data?.lastName);
  const [dni, setDni] = useState(data?.dni);
  const [telf, setTelf] = useState(data?.telf);
  const [dir, setDir] = useState(data?.dir);
  const [comment, setComment] = useState(data?.comment);
  const { updateClient } = useClients();

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    updateClient({
      endPoint: "put-client",
      data: {
        id: data.id,
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
    <section className={styles.container}>
      <div className={styles.header}>
        <h2>Editar usuario</h2>
        <span
          className={styles.exit}
          onClick={() => setHiddenUpdateClient(true)}
        >
          X
        </span>
      </div>
      <form onSubmit={onSubmit}>
        <label htmlFor="name">Nombres</label>
        <input
          type="text"
          id="name"
          required
          onChange={(e) => setName(e.target.value)}
          value={name}
        />

        <label htmlFor="last-name">Apellidos</label>
        <input
          type="text"
          id="last-name"
          required
          onChange={(e) => setLastName(e.target.value)}
          value={lastName}
        />

        <label htmlFor="dni">Cedula de identidad</label>
        <input
          type="number"
          id="dni"
          required
          onChange={(e) => setDni(e.target.value)}
          value={dni}
        />

        <label htmlFor="telf">Numero de telefono</label>
        <input
          type="text"
          id="telf"
          required
          onChange={(e) => setTelf(e.target.value)}
          value={telf}
        />

        <label htmlFor="dir">Direccion</label>
        <textarea
          id="name"
          required
          onChange={(e) => setDir(e.target.value)}
          value={dir}
        />

        <label htmlFor="comment">Observacion</label>
        <textarea
          id="comment"
          onChange={(e) => setComment(e.target.value)}
          value={comment || ""}
        />

        <br />
        <input type="submit" value="Actualizar" />
      </form>
    </section>
  );
}
