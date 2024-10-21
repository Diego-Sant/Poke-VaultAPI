import prisma from "../lib/prisma.js";

export const getCards = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const perPage = parseInt(req.query.perPage) || 10;
  const searchTerm = req.query.searchTerm || '';

  try {
      const totalCards = await prisma.card.count({
          where: {
              title: {
                  contains: searchTerm,
                  mode: 'insensitive',
              },
          },
      });

      const cards = await prisma.card.findMany({
          skip: page * perPage,
          take: perPage,
          where: {
              title: {
                  contains: searchTerm,
                  mode: 'insensitive',
              },
          },
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

export const getCard = async (req, res) => {
    const { id } = req.params;
  
    try {
      const card = await prisma.card.findUnique({
        where: { id },
      });
  
      if (!card) {
        return res.status(404).send("Carta não encontrada.");
      }
  
      res.status(200).json(card);
    } catch (err) {
      console.log(err);
      res.status(500).send("Erro Interno do Servidor!");
    }
};

export const addCard = async (req, res) => {
    const { title, imageUrl, price, rarity } = req.body;
    const tokenUserId = req.userId;

    try {
        const newCard = await prisma.card.create({
          data: {
            title,
            imageUrl,
            price,
            rarity,
            userId: tokenUserId,
          },
        });

        res.status(201).json(newCard);
    } catch (err) {
        console.log(err);
        res.status(500).send("Falha ao adicionar carta!");
    }
};

export const updateCard = async (req, res) => {
    const id = req.params.id;
    const tokenUserId = req.userId;
    const { imageUrl, title, price, rarity } = req.body;

    try {
        const existingPost = await prisma.card.findUnique({
            where: { id: id }
        });

        if (!existingPost) {
            return res.status(404).json({ message: "Carta não encontrada!" });
        }

        if (existingPost.userId !== tokenUserId) {
            return res.status(403).json({ message: "Não autorizado!" });
        }

        const updatedCard = await prisma.card.update({
            where: { id: id },
            data: {
                title: title,
                imageUrl: imageUrl,
                price: price,
                rarity: rarity
            }
        });

        res.status(200).json(updatedCard);
    } catch (err) {
        console.log(err);
        res.status(500).send("Erro Interno do Servidor!");
    }
};

export const deleteCard = async (req, res) => {
    const id = req.params.id;
  
    try {
      await prisma.card.delete({
        where: { id },
      });
  
      res.status(204).send({message: "Carta excluída com sucesso!"});
    } catch (err) {
      console.log(err);
      res.status(500).send("Erro Interno do Servidor!");
    }
};