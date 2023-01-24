import Fastify from "fastify";
import cors from "@fastify/cors";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

//Showing in the log All Queries
const prisma = new PrismaClient({
  log: ["query"],
});

async function bootstrap() {
  const fastify = Fastify({
    logger: true,
  });

  await fastify.register(cors, {
    origin: true,
  });

  //Get Beers (Alphabetical Order)
  fastify.get("/beers", async () => {
    const count = await prisma.beer.count();
    const beers = await prisma.beer.findMany({
      orderBy: {
        name: "asc",
      },
    });
    return { count, beers };
  });

  //Get All Reviews
  fastify.get("/reviews", async () => {
    const reviews = await prisma.review.findMany();
    const count = await prisma.review.count();
    return { count, reviews };
  });

  //Get All User
  fastify.get("/users", async () => {
    const count = await prisma.user.count();
    const users = await prisma.user.findMany();
    return { count, users };
  });

  // Get Beer Detail
  fastify.get("/beer/:id", async (request, reply) => {
    const createBeerParams = z.object({
      id: z.string(),
    });
    const { id } = createBeerParams.parse(request.params);
    const details = await prisma.beer.findFirst({
      where: {
        id: id,
      },
    });
    const reviews = await prisma.review.findMany({
      where: {
        beerId: details?.id,
      },
    });
    const totalReviews = reviews.length
    return {details,totalReviews, reviews};
  });

  //Get Beer by style
  fastify.get("/beers?style", async (request, reply) => {
    const createBeerParams = z.object({
      style: z.string(),
    });
    const { style } = createBeerParams.parse(request.params);
    const beers = await prisma.beer.findMany({
      where: {
        style:style
      },
    });
  
    const totalReviews = beers.length
    return {totalReviews, beers};
  });
  
  //Get user Review
  fastify.get("/reviews/:id", async (request, reply) => {
    const reviewParams = z.object({
      id: z.string(),
    });
    const { id } = reviewParams.parse(request.params);
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    const email = user?.emai
    const userName = user?.name
    const reviews = await prisma.review.findMany({
      where: {
        userId: user?.id,
      },
    });
    return { id, userName, email, reviews };
  });

  //Return
  await fastify.listen({ port: 3000 /*host: "0.0.0.0"*/ });
}
bootstrap();

/*Post Example
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
  })
*/
