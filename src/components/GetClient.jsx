import React, { useEffect, useState } from "react";
import useClients from "../hooks/useClients";
import { Link } from "react-router-dom";
import styles from "./styles/GetClient.module.css";
import UpdateClient from "./UpdateClient";

export default function getClient() {
  const [data, setData] = useState(null);
  const [dataSearch, setDataSearch] = useState(null);
  const { getClients, deleteClients } = useClients();
  const [searchParam, setSearchParam] = useState("name");

  //for update client
  const [hiddenUpdateClient, setHiddenUpdateClient] = useState(true);
  const [clientForUpdate, setClientForUpdate] = useState(null);
  const getData = async () => {
    const ClientData = await getClients({ endPoint: "get-client" });
    setData(ClientData);
    setDataSearch(ClientData);
  };

  useEffect(() => {
    getData();
  }, []);
  const search = (e) => {
    let search = e.target.value;
    if (!e.target.value) setDataSearch(data);
    setDataSearch(
      data?.filter((client) => {
        let param = client?.[searchParam].toLowerCase();
        let searchLoweCase = search?.toLowerCase();

        return param.indexOf(searchLoweCase) !== -1 && client;
      })
    );
  };

  const onUpdate = async ({ data }) => {
    setClientForUpdate(data);
    setHiddenUpdateClient(false);
  };

  const onDelete = async (id, name) => {
    let del = confirm("Estas seguro de que desea eliminar a ", name);
    if (del) deleteClients({ endPoint: "delete-client", id });
    return;
  };

  return (
    <section>
      {!hiddenUpdateClient ? (
        <UpdateClient
          data={clientForUpdate}
          setHiddenUpdateClient={setHiddenUpdateClient}
        />
      ) : (
        <>
          <Link to="/">Volver al inicio</Link>

          <h2>Usuarios</h2>
          <input
            type="text"
            placeholder="Buscar"
            className={styles.search}
            onChange={search}
          />
          <select onChange={(e) => setSearchParam(e.target.value)}>
            <option value="name">Nombre</option>
            <option value="lastName">Apellidos</option>
            <option value="dni">Cedula</option>
            <option value="telf">Telefono</option>
            <option value="dir">Direccion</option>
            <option value="comment">Observacion</option>
          </select>
          <table className={styles.table}>
            <thead>
              {/* <th></th> */}
              <th>Nombres</th>
              <th>Apellidos</th>
              <th>Cedula de identidad</th>
              <th>Telefono</th>
              <th>Direccion</th>
              <th>Observacion</th>
              <th></th>
            </thead>
            <tbody>
              {/* AREEGLAR */}
              {dataSearch?.length > 0 &&
                dataSearch.map((clientData) => {
                  return (
                    <tr key={clientData.id}>
                      {/* <td>
                    <input type="checkbox" value={clientData.id} />
                  </td> */}
                      <td>{clientData.name}</td>
                      <td>{clientData.lastName}</td>
                      <td>{clientData.dni}</td>
                      <td>{clientData.telf}</td>
                      <td>{clientData.dir}</td>
                      <td>{clientData.comment}</td>
                      <td className={styles.icons}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="1em"
                          viewBox="0 0 512 512"
                          fill="#094c90"
                          className={styles.icon_left}
                          onClick={() =>
                            onUpdate({
                              data: {
                                id: clientData.id,
                                name: clientData.name,
                                lastName: clientData.lastName,
                                dni: clientData.dni,
                                telf: clientData.telf,
                                dir: clientData.dir,
                                comment: clientData.comment,
                              },
                            })
                          }
                        >
                          <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
                        </svg>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="1em"
                          viewBox="0 0 448 512"
                          fill="#90091d"
                          className={styles.icon_right}
                          onClick={() =>
                            onDelete(clientData.id, clientData.name)
                          }
                        >
                          <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                        </svg>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </>
      )}
    </section>
  );
}
