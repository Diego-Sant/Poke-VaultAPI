import prisma from "../lib/prisma.js";


export const getUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json(users);

    } catch (error) {
        res.status(500).json({message: "Falha ao acessar usuários!"})
    }
}

export const getUser = async (req, res) => {
    const id = req.params.id;
    
    try {
        const user = await prisma.user.findUnique({
            where: {id: id}
        });
        res.status(200).json(user);
        
    } catch (error) {
        res.status(500).json({message: "Falha ao acessar usuário!"})
    }
}