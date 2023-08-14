import { useState, useCallback } from "react";
import apiUrl from "../api/api.url";

export default function useClients() {
  const url = apiUrl.url;

  const registerClient = useCallback(async ({ endPoint, data }) => {
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
        alert(`${data.name} registrado correctamente`);
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
  }, []);
  const updateClient = useCallback(async ({ endPoint, data }) => {
    try {
      let res = await fetch(url + endPoint, {
        method: "PUT",
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
        alert(`${data.name} actualizado correctamente`);
        location.reload();
        return false;
      } else {
        alert(`Error: ${json.message}`);
        return true;
      }
    } catch (error) {
      console.log(`Error ${error.status} ${error.statusText}`);
      return true;
    }
  }, []);

  const getClients = useCallback(async ({ endPoint }) => {
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
          return { isEmpity: true };
        } else {
          return json.data;
        }
      } else {
        alert(`Error: ${json.message || json.err.name}`);
        return json.error;
      }
    } catch (error) {
      console.log(`Error ${error.err.name} ${error.statusText}`);
      return;
    }
  }, []);

  const deleteClients = useCallback(async ({ endPoint, id }) => {
    try {
      let res = await fetch(`${url}${endPoint}/${id}`, { method: "DELETE" });

      if (!res.ok)
        throw {
          status: res.status,
          statusText: res.statusText,
        };

      let json = await res.json();

      if (json.error === "false") {
        location.reload();
        return json.res;
      } else {
        alert(`Error: ${json.message}`);
        return json.error;
      }
    } catch (error) {
      console.log(`Error ${error.status} ${error.statusText}`);
      return 0;
    }
  }, []);

  return { registerClient, getClients, updateClient, deleteClients };
}
