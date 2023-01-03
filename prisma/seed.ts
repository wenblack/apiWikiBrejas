import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

  await prisma.beer.create({
    data: {
      name: 'Heineken',
      birthDay: '1873',
      description: 'Onde quer que você vá no mundo, é sempre incrível ver algo que você reconhece. Aquela garrafa verde, a estrela vermelha, o e sorridente ... é como receber as boas-vindas instantâneas de um velho amigo.',
      ibu: 19,
      note: 8,
      style: 'Premium Lager',
      review: 'Cerveja ótima e 100% equilibrada, perfeita pra quem gosta de amargor e qualidade. Vale a pena a compra, principalmente na promoção',
    },
  })
  await prisma.user.create({
    data: {
      name: "John Doe",
      emai: "example@example.com",
      avatarUrl: "https:github.com/wenblack.png"
    }
  });


}
main();
