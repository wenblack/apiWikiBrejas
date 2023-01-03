import Fastify from "fastify";
import cors from "@fastify/cors";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import ShortUniqueId from "short-unique-id";
("short-unique-id");

//Showing in the log All Queries
const prisma = new PrismaClient({
  log: ["query"]
});


async function bootstrap() {
  const fastify = Fastify({
    logger: true
  });

  await fastify.register(cors, {
    origin: true
  });

  //Get All Beers
  fastify.get("/beers", async () => {
    const count = await prisma.beer.count()
    const beers = await prisma.beer.findMany()
    return { count, beers };
  });

  //Get All Reviews
  fastify.get("/reviews", async () => {
    const reviews = await prisma.review.findMany()
    const count = await prisma.review.count()
    return { count, reviews };
  });

  //Get All User
  fastify.get("/users", async () => {
    const count = await prisma.user.count();
    const users = await prisma.user.findMany()
    return { count, users };
  });

  // Get Beers Detais
  fastify.get("/beer/:name", async (request, reply) => {
    const createBeerParams = z.object({
      name: z.string()
    });
    const { name } = createBeerParams.parse(request.params);
    const details = await prisma.beer.findFirst({
      where: {
        name: name
      }
    })
    const reviews = await prisma.review.findMany({
      where: {
        beerId: details?.id
      }
    }
    )
    return { name, details, reviews };
  });


  //Post Example
  fastify.post("/pools", async (request, reply) => {
    const createPoolBody = z.object({
      title: z.string()
    });

    const { title } = createPoolBody.parse(request.body);
    const generate = new ShortUniqueId({ length: 6 });
    const code = String(generate()).toUpperCase();
    await prisma.pool.create({
      data: {
        title,
        code
      }
    });

    return reply.status(201).send({ code });
  });

  //Return
  await fastify.listen({ port: 3333 /*host: "0.0.0.0"*/ });
}
bootstrap();
