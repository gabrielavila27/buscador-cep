import axios from "axios"; //Facilitador de receber e enviar apis

const api = axios.create({
    baseURL: 'https://viacep.com.br/ws/'
}); //criando conexão com axios

export default api