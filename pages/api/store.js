import dotenv from "dotenv";
import prisma from "../../lib/prisma";

dotenv.config();

const handler = async (req, res) => {
    if (req.method === "GET") {
        try {
            const data = await prisma.ordertb.findMany({
                select: {
                    orderid: true,
                    productid: true,
                    quantity: true,
                    storedb: {
                        select: {
                            pname: true,
                            price: true,
                        },
                    },
                },
                orderBy: {
                    orderid: "asc",
                },
            });
            res.json(data);
        } catch (err) {
            res.status(500).send("internal err");
        }
    }
    if (req.method === "PUT") {
        try {
            const { orderid, quantity } = req.body;
            const orderid2 = parseInt(orderid);

            const data = await prisma.ordertb.update({
                where: {
                    orderid,
                },
                data: {
                    quantity,
                },
            });
            return res.json(data);
        } catch (err) {
            res.status(500).send("internal err");
        }
    }
    if (req.method === "POST") {
        try {
            const { productid, quantity } = req.body;
            // find if they added the product
            const data = await prisma.ordertb.findUnique({
                where: { productid },
                select: {
                    quantity: true,
                },
            });
            // if product not added then add
            if (data === null) {
                const createData = await prisma.ordertb.create({
                    data: {
                        productid,
                        quantity,
                    },
                });
                return res.json(createData);
                // if product added then sum
            } else {
                // console.log(data.quantity)
                const newQuantity = data.quantity + quantity;
                const updateData = await prisma.ordertb.update({
                    where: {
                        productid,
                    },
                    data: {
                        quantity: newQuantity,
                    },
                });
                return res.json(updateData);
            }
        } catch (err) {
            res.status(500).send("internal err");
        }
    }
    if (req.method === "DELETE") {
        const { orderid } = req.query;
        const orderid2 = parseInt(orderid);

        try {
            const deleteOrder = await prisma.ordertb.delete({
                where: {
                    orderid: orderid2,
                },
            });
            return res.json("deleteOrder");
        } catch (err) {
            res.status(500).send("internal err");
        }
    }
};

export default handler;
