import { createContext, useEffect, useState } from "react";
import Footer from "./Footer";
import axios from "axios";
export const CartContext = createContext();

const Layout = ({ children }) => {
    const [cartReload, setCartReload] = useState(false);
    const [cartQuantity, setCartQuantity] = useState(0);
    const fetchData = async () => {
        const { data } = await axios.get("/api/store");

        if (data.length === 0) {
            return setCartQuantity(0);
        } else {
            const total = data
                .map((item) => item.quantity)
                .reduce((val, acc) => val + acc);
            setCartQuantity(total);
        }
    };
    useEffect(() => fetchData(), [cartReload]);

    return (
        <div>
            <CartContext.Provider
                value={{
                    cartQuantity,
                    setCartQuantity,
                    cartReload,
                    setCartReload,
                }}
            >
                <main>{children}</main>
            </CartContext.Provider>
            <Footer />
        </div>
    );
};

export default Layout;
