import React from "react";

import './styles/styles.css'; // Asegúrate de importar el archivo de estilos

function Layout({children}) {


  return (
    <>

      <div className="p-wrapper">
        <div className="p-content">
            {children}
        </div>
      </div>
    </>
  );
}

export { Layout };
