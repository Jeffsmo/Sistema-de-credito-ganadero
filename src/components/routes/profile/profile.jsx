import React from "react";
import { useAuth } from "../../../global/contexts/auth/auth";
import './styles/styles.css'; // Asegúrate de importar el archivo de estilos
import { Layout } from "../../common/layout/layout";

function Profile() {
  const { user } = useAuth();

  return (
    <>
        <Layout>
        <h1>Perfil</h1>
          <h2>Bienvenido, {user.email}</h2>
          <p>Content</p>
          <p>Name</p>
          </Layout>
    </>
  );
}

export { Profile };
