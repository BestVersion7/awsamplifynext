import dotenv from "dotenv";
import prisma from "../../lib/prisma";

dotenv.config();

const handler = async (req, res) => {
    if (req.method === "POST") {
        try {
            const { first_name } = req.body;
            const data = await prisma.usertb.create({
                data: {
                    first_name,
                },
            });
            return res.json(data);
        } catch (err) {
            res.status(500).send("internal err");
        }
    }
};

export default handler;
