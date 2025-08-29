import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) return res.status(401).json({ success: false, message: "No token provided" });

    jwt.verify(token, process.env.JWT_SECRET || "supersecretkey", (err, decoded) => {
        if (err) return res.status(401).json({ success: false, message: "Invalid token" });

        req.user = decoded;
        next();
    });
};
