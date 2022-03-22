import dotenv from "dotenv";
import prisma from "../../lib/prisma";

dotenv.config();

const handler = async (req, res) => {
    if (req.method === "PUT") {
        try {
            const { orderid } = req.query;
            const { quantity } = req.body;
            // console.log(id, quantity)
            const data = await prisma.ordertb.create({
                data: {
                    productid,
                    quantity,
                },
            });
            return res.json(data);
        } catch (err) {
            res.status(500).send("internal err");
        }
    }
    if (req.method === "DELETE") {
        try {
            await prisma.ordertb.deleteMany({});
            return res.json("deleted all");
        } catch (err) {
            res.status(500).send("internal err");
        }
    }
};

export default handler;
