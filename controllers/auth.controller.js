import fs from "fs";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const USERS_FILE_PATH = "../users.json";

const readUsers = () => {
    try {
        const data = fs.readFileSync(USERS_FILE_PATH, "utf8");
        return JSON.parse(data);
    } catch (err) {
        console.error("Erro ao ler o arquivo de usuários:", err);
        return [];
    }
};

const writeUsers = (users) => {
    try {
        fs.writeFileSync(USERS_FILE_PATH, JSON.stringify(users, null, 2));
    } catch (err) {
        console.error("Erro ao escrever no arquivo de usuários:", err);
    }
};

export const register = (req, res) => {
    const { username, email, password } = req.body;
    
    const users = readUsers();
    const existingUser = users.find(user => user.username === username);

    if (existingUser) {
        return res.status(409).json({ message: "Usuário já existe!" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = { username, email, password: hashedPassword };

    users.push(newUser);
    writeUsers(users);

    res.status(201).json({ message: "Usuário criado com sucesso!" });
};

export const login = (req, res) => {
    const { username, password } = req.body;
    
    const users = readUsers();
    const user = users.find(user => user.username === username);

    if (!user) {
        return res.status(401).json({ message: "Credenciais Inválidas!" });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
        return res.status(401).json({ message: "Credenciais Inválidas!" });
    }

    const age = 1000 * 60 * 60 * 24 * 7;
    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET_KEY, { expiresIn: age });

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: age,
        //sameSite: 'None',
    });

    res.status(200).json({ message: "Usuário autenticado com sucesso!" });
};

export const logout = (req, res) => {
    res.clearCookie("token").status(200).json({ message: "Sucesso ao sair da conta!" });
};