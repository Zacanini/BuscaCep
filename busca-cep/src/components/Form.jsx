import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import ReplayIcon from '@mui/icons-material/Replay';
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

        const result = await ConsultaEndereco(cep);

        if (result.error) {
            setErro(result.error);
            setEndereco(null);
        } else {
            setEndereco(result);
            setErro(null);
        }

        setTimeout(() => {
            setCarregando(false);
        }, 800);
    };

    const VoltaTela = () => {
        setViraTela(false);
    };

    const styles = {
        formContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
        },
        textField: {
            m: 1,
            width: '25ch',
        },
        errorText: {
            color: 'red',
            marginBottom: '20px',
            textAlign: 'center',
        },
        resultContainer: {
            textAlign: 'center',
        },
        buttonContainer: {
            marginTop: '20px',
        },
        rua:{
            fontFamily:"Roboto"
        },
        titulo:{
            fontFamily:"Roboto",
            fontWeight:"bold",
            color:"green",
            fontSize:"25px",
            marginBottom:"20px"
        },
        erro:{
            fontFamily:"Roboto",
            fontWeight:"bold",
            color:"red",
            fontSize:"20px",
            marginBottom:"20px"
        }
    };

    return (
        <>
            {!viraTela ? (
                <Box
                    component="form"
                    sx={styles.formContainer}
                    noValidate
                    autoComplete="on"
                >
                    <div style={styles.titulo}>
                        PESQUISE SEU ENDEREÇO
                    </div>
                    <TextField
                        value={cep}
                        onChange={(j) => { setCep(j.target.value); }}
                        required
                        id="outlined-required"
                        label="CEP"
                        placeholder="Digite seu CEP"
                        sx={styles.textField}
                    />
                    <Button
                        onClick={handleConsultar}
                        variant="outlined"
                        color="secondary"
                        startIcon={<SearchIcon />}
                        sx={styles.buttonContainer}
                    >
                        Buscar
                    </Button>
                </Box>
            ) : (
                <Box sx={styles.formContainer}>
                    {carregando ? <CircularProgress /> : (
                        <div style={styles.resultContainer}>
                            {erro && (
                                <div style={styles.errorText}>
                                    <p style={styles.erro}>{erro}</p>
                                    <Button onClick={VoltaTela} variant="outlined" color="error" startIcon={<ReplayIcon />}>
                                        Voltar
                                    </Button>
                                </div>
                            )}
                            {endereco && (
                                <div>
                                    <div style={styles.titulo} >RESULTADO</div>
                                    <p style={styles.rua}>Rua: {endereco.logradouro}</p>
                                    <p style={styles.rua}>Bairro: {endereco.bairro}</p>
                                    <p style={styles.rua}>Cidade: {endereco.localidade}</p>
                                    <p style={styles.rua}>Estado: {endereco.uf}</p>
                                    <Button onClick={VoltaTela} variant="outlined" color="success" startIcon={<ReplayIcon />}>
                                        Voltar
                                    </Button>
                                </div>
                            )}
                        </div>
                    )}
                </Box>
            )}
        </>
    );
};
