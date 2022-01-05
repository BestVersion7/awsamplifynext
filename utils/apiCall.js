import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
    user: "postgres",
    password: "password",
    database: "sample",
    host: "localhost",
    port: 5432,
});

import prisma from "../lib/prisma";

//

// const pool = new Pool({
//     user: process.env.PG_USER,
//     password: process.env.PG_PASSWORD,
//     database: process.env.PG_DATABASE,
//     host: process.env.PG_HOST,
//     port: 5432,
//     ssl: {
//         rejectUnauthorized: false,
//     },
// });

const selectAll = () => pool.query(`SELECT * FROM usertb ORDER BY account_id;`);
const selectTen = () =>
    pool.query(`SELECT * FROM usertb ORDER BY account_id LIMIT 10;`);
const fetchByName = (name) =>
    pool.query(`SELECT * FROM usertb WHERE first_name = $1`, [name]);

// export const fetchAll = async () => {
//     try {
//         const data1 = await prisma.usertb.findMany()
//         const data = await selectAll();
//         return data.rows;
//     } catch (err) {
//         return {
//             notFound: true,
//         };
//     }
// };
export const fetchAll = async () => {
    try {
        const data = await prisma.usertb.findMany();
        return data;
    } catch (err) {
        return {
            notFound: true,
        };
    }
};
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

export const fetchName = async (name) => {
    try {
        const data = await prisma.usertb.findFirst({
            where: { first_name: name },
            select: {
                first_name: true,
                last_name: true,
                gender: true
            }
        });
        // console.log(data)
        return data;
    } catch (err) {
        return undefined;
    }
};