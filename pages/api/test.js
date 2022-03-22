import dotenv from "dotenv";
import prisma from "../../lib/prisma";

dotenv.config();

const handler = async (req, res) => {
    if (req.method === "GET") {
        try {
            const data = await prisma.ordertb.findMany()
            return res.json(data);
        } catch (err) {
            res.status(500).send("internal err");
        }
    }
};

export default handler;
