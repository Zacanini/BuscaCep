
export const ConsultaEndereco = async (cep) => {
    // Verificação inicial: validação do formato do CEP (somente números e 8 dígitos)
    const cepAjustado = cep.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (cepAjustado.length !== 8) {
      return { error: "CEP inválido. Certifique-se de que possui 8 dígitos." };
    }
  
    const url = `https://viacep.com.br/ws/${cepAjustado}/json/`;
  
    try {
      const response = await fetch(url);
  
      // Verifica se a resposta da API foi bem-sucedida (código 200-299)
      if (!response.ok) {
        if (response.status === 400) {
          return { error: "Requisição inválida. Verifique o CEP e tente novamente." };
        } else if (response.status === 404) {
          return { error: "CEP não encontrado." };
        } else {
          return { error: `Erro na API (código ${response.status}).` };
        }
      }
  
      const data = await response.json();
  
      // Verifica se o CEP existe ou se houve outro problema
      if (data.erro) {
        return { error: "CEP não encontrado." };
      }
  
      // Se tudo deu certo, retorna os dados do CEP
      return data;
  
    } catch (error) {
      // Trata erros de rede ou outros imprevistos
      return { error: "Falha na conexão. Verifique sua rede e tente novamente." };
    }
  };