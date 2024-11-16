import { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma";

export async function pratosRoutes(app: FastifyInstance) {
  app.get("/pratos", async () => {
    return prisma.prato.findMany();
  });

  app.get("/pratos/:id", async (request: any) => {
    const { id } = request.params;
    
    return prisma.prato.findUnique({ where: { id: Number(id) } });
  });

  app.post("/pratos", async (request: any) => {
    const { nome, descricao, preco } = request.body;

    return prisma.prato.create({
      data: { nome, descricao, preco },
    });
  });

  app.put("/pratos/:id", async (request: any) => {
    const { id } = request.params;
    const { nome, descricao, preco } = request.body;

    return prisma.prato.update({
      where: { id: Number(id) },
      data: { nome, descricao, preco },
    });
  });

  app.delete("/pratos/:id", async (request: any) => {
    const { id } = request.params;

    return prisma.prato.delete({ where: { id: Number(id) } });
  });
}