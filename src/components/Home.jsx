import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles/Home.module.css";
export default function Home() {
  return (
    <nav className={styles.nav}>
      <Link className={styles.link} to="get-client">
        Clientes
      </Link>
      <Link className={styles.link} to="register-client">
        Registrar cliente
      </Link>
    </nav>
  );
}
