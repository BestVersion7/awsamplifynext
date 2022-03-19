import dotenv from "dotenv";
import prisma from "../lib/prisma";

dotenv.config();

export const fetchTen = async () => {
    try {
        const data = await prisma.usertb.findMany({ take: 10 });
        return data;
    } catch (err) {
        return {
            notFound: true,
        };
    }
};

// export const fetchName = async (name) => {
//     try {
//         const data = await fetchByName(name);
//         return data.rows[0];
//     } catch (err) {
//         return undefined;
//     }
// };
