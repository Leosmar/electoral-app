import React, { useState } from "react";

//temp
import apiUrl from "../api/api.url";

export default function AddClient() {
  const [name, setName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [dni, setDni] = useState(null);
  const [telf, setTelf] = useState(null);
  const [dir, setDir] = useState(null);
  const [comment, setComment] = useState(null);

  const registerClient = async () => {
    const endPoint = "post-client";
    const url = apiUrl.url;

    const data = {
      name,
      lastName,
      dni,
      telf,
      dir,
      comment,
    };

    try {
      let res = await fetch(url + endPoint, {
        method: "POST",
        body: JSON.stringify({
          ...data,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok)
        throw {
          status: res.status,
          statusText: res.statusText,
        };

      let json = await res.json();

      if (json.error === "false") {
        alert(`${name} registrado correctamente`);
        window.location.reload();
        return false;
      } else {
        alert(`Error: ${json.message}`);
        return true;
      }
    } catch (error) {
      console.log(`${error.status} ${error.statusText}`);
      return true;
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(name, lastName, dni, telf, dir, comment);
    console.log(apiUrl.url);
    registerClient();
  };
  return (
    <section>
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
