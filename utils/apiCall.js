import prisma from "../lib/prisma";

export const fetchTen = async () => {
    try {
        const data = await prisma.usertb.findMany({
            take: 10,
            orderBy: {
                account_id: "desc",
            },
        });
        return data;
    } catch (err) {
        return {
            notFound: true,
        };
    }
};

export const fetchStore = async () => {
    try {
        const data = await prisma.storedb.findMany({
            orderBy: {
                id: "asc",
            },
        });
        return data;
    } catch (err) {
        return {
            notFound: true,
        };
    }
};

export const fetchCart = async () => {
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
                productid: "asc",
            },
        });
        return data;
    } catch (err) {
        return {
            notFound: true,
        };
    }
};

export const fetchQuantity = async () => {
    try {
        const data = await prisma.storedb.findMany({
            select: {
                quantity: true,
            },
        });
        const data1 = data
            .map((item) => item.quantity)
            .reduce((val, arr) => val + arr);
        return data1;
    } catch (err) {
        return {
            notFound: true,
        };
    }
};
export const fetchTotal = async () => {
    try {
        const data = await prisma.storedb.findMany({
            select: {
                price: true,
                quantity: true,
            },
        });
        const data1 = data
            .map((item) => item.price * item.quantity)
            .reduce((val, arr) => val + arr);
        return data1;
    } catch (err) {
        return {
            notFound: true,
        };
    }
};

export const fetchArticleById = async (articleId) => {
    const data2 = await prisma.blog.findUnique({
        where: {
            article_id: articleId,
        },
    });
    const data = JSON.parse(JSON.stringify(data2));
    return data;
};
