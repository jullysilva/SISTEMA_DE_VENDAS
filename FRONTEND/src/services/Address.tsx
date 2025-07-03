import axios from "axios";

async function SeachCEP(cep: string) {
  const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
  console.log(response);

  return {
    rua: response.data.logradouro,
    endereco: `${response.data.logradouro}, ${response.data.bairro}, ${response.data.localidade} - ${response.data.uf}, ${response.data.cep}`,
    cidade: response.data.localidade,
    uf: response.data.uf,
  };
}

export default SeachCEP;
