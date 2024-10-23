import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const token = req.cookies['token'];
    console.log('Verificando token:', token);

    if (!token) {
        return res.status(401).json({message: "Não está autenticado!"});
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            console.error('Erro ao verificar token:', err);
            return res.status(403).json({ message: 'Token não é válido!' });
        }

        req.userId = decoded.id;
        next();
    });
}