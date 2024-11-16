import { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma";

export default async function pedidoRoutes(app: FastifyInstance) {
  app.post("/pedidos", async (request: any) => {
    const { itens } = request.body; // `itens` é um array com { pratoId, quantidade }

    return prisma.pedido.create({
      data: {
        itens: {
          create: itens.map((item: any) => ({
            pratoId: item.pratoId,
            quantidade: item.quantidade,
          })),
        },
      },
      include: { itens: true },
    });
  });

  app.get("/pedidos/:id", async (request: any) => {
    const { id } = request.params;

    return prisma.pedido.findUnique({
      where: { id: Number(id) },
      include: { itens: { include: { prato: true } } },
    });
  });

  app.get("/pedidos", async () => {
    return prisma.pedido.findMany({
      include: { itens: { include: { prato: true } } },
    });
  });
}
