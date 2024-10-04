import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import CircularProgress from '@mui/material/CircularProgress';
import TextField from "@mui/material/TextField";

import { CepContext } from "../context/CepContext";
import { ConsultaEndereco } from "../services/Api.ViaCEP";

export const Form = () => {
    const { cep, setCep, viraTela, setViraTela } = useContext(CepContext);
    const [endereco, setEndereco] = useState(null);
    const [erro, setErro] = useState(null);
    const [carregando, setCarregando] = useState(false);

    const handleConsultar = async () => {
        setViraTela(true);
        setCarregando(true);

        // Chama a função que consulta o endereço
        const result = await ConsultaEndereco(cep);

        if (result.error) {
            setErro(result.error); // Armazena a mensagem de erro
            setEndereco(null); // Limpa o estado de endereço caso haja erro
        } else {
            setEndereco(result); // Atualiza o estado com o endereço se a consulta for bem-sucedida
            setErro(null); // Limpa o estado de erro
        }

        setTimeout(() => {
            setCarregando(false);
        }, 800)


    };

    const VoltaTela = () => {
        setViraTela(false);
    };

    return (
        <>
            {!viraTela ? (
                <Box
                    component="form"
                    sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
                    noValidate
                    autoComplete="on"
                >
                    <div>
                        <TextField
                            value={cep}
                            onChange={(j) => { setCep(j.target.value) }}
                            required
                            id="outlined-required"
                            label="CEP"
                            placeholder="Digite seu CEP"
                        />
                    </div>
                    <button onClick={handleConsultar}>Consultar CEP</button>
                </Box>
            ) : (

                <>

                    <Box sx={{ display: 'flex' }}>
                        {carregando && <CircularProgress />}
                    </Box>
                    {!carregando && (
                        <div>
                            {/* Exibe a mensagem de erro, se houver */}
                            {erro && <div style={{ color: 'red' }}>{erro}</div>}
                            {(
                                endereco && (
                                    <div>
                                        <p>Rua: {endereco.logradouro}</p>
                                        <p>Bairro: {endereco.bairro}</p>
                                        <p>Cidade: {endereco.localidade}</p>
                                        <p>Estado: {endereco.uf}</p>
                                        <button onClick={VoltaTela}>Voltar</button>
                                    </div>
                                )
                            )}
                        </div>
                    )}


                </>
            )}
        </>
    );
};
