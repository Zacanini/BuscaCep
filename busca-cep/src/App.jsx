import React, { useState } from "react";
import { Form } from "./components/Form";

export const App = () => {
  const [cep, setCep] = useState("");

  const validCep = () => {
    const cepAjustado = cep.replace(/\D/g, "");
    return cepAjustado.length === 8 ? cepAjustado : null;
  };

  return (
    <>
      <div style={{marginBottom:20}}>Saiba Seu Endereço</div>
      <Form cep={cep} setCep={setCep} />
    </>
  );
};
