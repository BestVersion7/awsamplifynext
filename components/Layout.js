import { createContext } from "react";
import Footer from "./Footer";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export const CartContext = createContext();

const Layout = ({ children }) => {
    const { data, error, mutate } = useSWR("/api/store", fetcher);
    if (error) return <div>Failed to load</div>;
    if (!data) return <div>Loading...</div>;
    let total;
    if (data.length === 0) {
        total = 0;
    } else {
        // console.log(data)
        total = data
            .map((item) => item.quantity)
            .reduce((val, acc) => val + acc);
    }
    const mutateCartTotal = mutate;

    return (
        <div>
            <CartContext.Provider value={{total, mutateCartTotal}}>
                <main>{children}</main>
            </CartContext.Provider>
            <Footer />
        </div>
    );
};

export default Layout;
