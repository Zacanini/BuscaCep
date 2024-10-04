import React, { useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export const Form = () => {

    const [cep, setCep] = useState(null)

    const validCep = () => {

        // Remove qualquer caractere que não seja número
        const cepAjustado = cep.replace(/\D/g, '');

        // Retorna o CEP se for válido ou null se for inválido
        return cepAjustado.length === 8 ? cepAjustado : null;

    }

    return (

        <>
            <Box
                component="form"
                sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
                noValidate
                autoComplete="on"
            />
            {/*criando input para receber o CEP*/}
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
        </>
    )
}