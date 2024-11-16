import fastify from "fastify"
import cors from "@fastify/cors";
import { pratosRoutes } from "./routes/pratos/pratosRoutes";
import pedidoRoutes from "./routes/pedidos/pedidosRoutes";


const app = fastify()

app.get('/hello', () => {
  return 'Hello World'
})

app.register(cors);
app.register(pratosRoutes, { prefix: '/api'})
app.register(pedidoRoutes, { prefix: '/api'})

app
  .listen({
  port: 3333,
  })
  .then(() => {
    console.log('Servidor rodando na porta http://localhost:3333')
    console.log('Lembre-se de usar o comando "npm i", "npm run db:generate" e "npm run db:migrate"!')
  })