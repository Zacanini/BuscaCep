import React, { createContext, useState } from "react";

// Criação do contexto
export const CepContext = createContext();

// Provedor do contexto
export const CepProvider = ({ children }) => {
  const [cep, setCep] = useState("");
  const [viraTela, setViraTela] = useState(false);

  return (
    <CepContext.Provider value={{ cep, setCep, viraTela, setViraTela }}>
      {children}
    </CepContext.Provider>
  );
};