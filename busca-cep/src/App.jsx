import React from "react";
import { CepProvider } from "./context/CepContext";
import { Form } from "./components/Form";

export const App = () => {
  return (
    <CepProvider>
      <Form />
    </CepProvider>
  );
};
