import React, { useEffect, useState } from "react";
import apiUrl from "../api/api.url";

export default function getClient() {
  const [data, setData] = useState(null);
  const getClients = async () => {
    const url = apiUrl.url;
    const endPoint = "get-client";

    try {
      let res = await fetch(url + endPoint);

      if (!res.ok)
        throw {
          status: res.status,
          statusText: res.statusText,
        };

      let json = await res.json();

      if (json.error === "false") {
        if (json.data.length < 1) {
          //return { isEmpity: true };
        } else {
          setData(json.data);
          //return json.data;
        }
      } else {
        alert(`Error: ${json.message || json.err.name}`);
        //return json.error;
      }
    } catch (error) {
      console.log(`Error ${error.err.name} ${error.statusText}`);
      return;
    }
  };

  useEffect(() => {
    getClients();
  }, []);

  return (
    <section>
      <h2>Usuarios</h2>
      <table>
        <th>Nombres</th>
        <th>Apellidos</th>
        <th>Cedula de identidad</th>
        <th>Telefono</th>
        <th>Direccion</th>
        <th>Observacion</th>
        {data?.length > 0 &&
          data.map((clientData) => {
            console.log(clientData);
            return (
              <tr>
                <td>{clientData.name}</td>
                <td>{clientData.lastName}</td>
                <td>{clientData.dni}</td>
                <td>{clientData.telf}</td>
                <td>{clientData.dir}</td>
                <td>{clientData.comment}</td>
              </tr>
            );
          })}
      </table>
    </section>
  );
}
