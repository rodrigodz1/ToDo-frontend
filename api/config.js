import axios from 'axios';

const { API_URL } = "http://localhost:3333"
/*
    Como esse é o arquivo do projeto em desenvolvimento, localhost:3333 é a URL do servidor local.
    no caso, o ambiente backend deve ser inicializado com um:
    no terminal (servidor):
        docker-compose up
    Para inicializar esse projeto (cliente):
        npm run dev

    Foi feito um deploy também.
    a URL lá setada do server é: https://trabseg-api.herokuapp.com/
    Frontend (client):           https://to-do-frontend-tau.vercel.app/

    Como ambos os servidores ficam ociosos após um tempo sem uso pelo deploy ter sido feito
    em um plano de demonstração "hobby dev", antes de usar a aplicação deve ser feita uma requisição
    no servidor e aguardar alguns segundos para que funcione (apenas abrir a página no navegador):
    https://trabseg-api.herokuapp.com/

*/

const api = axios.create({
    baseURL: API_URL,
})

export default api;