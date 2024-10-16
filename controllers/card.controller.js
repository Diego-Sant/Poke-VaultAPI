import prisma from "../lib/prisma.js";

export const getCard = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const perPage = parseInt(req.query.perPage) || 10;

  try {
    const totalCards = await prisma.card.count();
    const cards = await prisma.card.findMany({
      skip: page * perPage,
      take: perPage,
    });

    res.status(200).json({
      cards,
      total: totalCards,
      page,
      perPage,
      totalPages: Math.ceil(totalCards / perPage),
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Erro Interno do Servidor!");
  }
};

export const addCard = async (req, res) => {
  const { image, name, price, rarity } = req.body;

  try {
    const newCard = await prisma.card.create({
      data: {
        image,
        name,
        price,
        rarity,
      },
    });

    const users = await prisma.user.findMany();
    const user = users.find(user => user.username === req.userId);

    if (user) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          cards: {
            push: newCard.id,
          },
        },
      });
    }

    res.status(201).json(newCard);
  } catch (err) {
    console.log(err);
    res.status(500).send("Erro Interno do Servidor!");
  }
};

export const updateCard = async (req, res) => {
  const id = parseInt(req.params.id);
  const { image, name, price, rarity } = req.body;

  try {
    const updatedCard = await prisma.card.update({
      where: { id },
      data: {
        image,
        name,
        price,
        rarity,
      },
    });

    res.status(200).json(updatedCard);
  } catch (err) {
    console.log(err);
    res.status(500).send("Erro Interno do Servidor!");
  }
};

export const deleteCard = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    await prisma.card.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (err) {
    console.log(err);
    res.status(500).send("Erro Interno do Servidor!");
  }
};