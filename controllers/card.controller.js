import fs from "fs";

export const getCard = (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const perPage = parseInt(req.query.perPage) || 10;

  fs.readFile("../db.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Erro Interno do Servidor!");
      return;
    }

    const jsonData = JSON.parse(data);
    const start = page * perPage;
    const end = start + perPage;
    const result = jsonData.cards.slice(start, end);

    res.status(200).json({
      cards: result,
      total: jsonData.cards.length,
      page,
      perPage,
      totalPages: Math.ceil(jsonData.cards.length / perPage),
    });
  });
};

export const addCard = (req, res) => {
  const { image, name, price, rarity } = req.body;

  fs.readFile("../db.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Erro Interno do Servidor!");
      return;
    }

    const jsonData = JSON.parse(data);
    const maxId = jsonData.cards.reduce((max, item) => Math.max(max, item.id), 0);

    const newItem = {
      id: maxId + 1,
      image,
      name,
      price,
      rarity,
    };

    jsonData.cards.push(newItem);

    fs.writeFile("../db.json", JSON.stringify(jsonData), (err) => {
      if (err) {
        console.log(err);
        res.status(500).send("Erro Interno do Servidor!");
        return;
      }

      res.status(201).json(newItem);
    });
  });
};

export const updateCard = (req, res) => {
  const id = parseInt(req.params.id);
  const { image, name, price, rarity } = req.body;

  fs.readFile("../db.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Erro Interno do Servidor!");
      return;
    }

    const jsonData = JSON.parse(data);
    const index = jsonData.cards.findIndex((item) => item.id === id);

    if (index === -1) {
      res.status(404).send("Item não existe!");
      return;
    }

    jsonData.cards[index] = { id, image, name, price, rarity };

    fs.writeFile("../db.json", JSON.stringify(jsonData), (err) => {
      if (err) {
        console.log(err);
        res.status(500).send("Erro Interno do Servidor!");
        return;
      }

      res.status(200).json(jsonData.cards[index]);
    });
  });
};

export const deleteCard = (req, res) => {
  const id = parseInt(req.params.id);

  fs.readFile("../db.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Erro Interno do Servidor!");
      return;
    }

    const jsonData = JSON.parse(data);
    const index = jsonData.cards.findIndex((item) => item.id === id);

    if (index === -1) {
      res.status(404).send("Item não existe!");
      return;
    }

    jsonData.cards.splice(index, 1);

    fs.writeFile("../db.json", JSON.stringify(jsonData), (err) => {
      if (err) {
        console.log(err);
        res.status(500).send("Erro Interno do Servidor!");
        return;
      }

      res.status(204).send();
    });
  });
};