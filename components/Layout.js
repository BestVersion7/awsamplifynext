import { useState, useEffect, createContext } from "react";
import axios from "axios";
import Footer from "./Footer";

export const CartContext = createContext();

const Layout = ({ children }) => {
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const fetchInfo = async () => {
        const { data } = await axios.get("/api/store");
        if (data.length === 0) {
            setTotal(0);
        } else {
            const data1 = data
                .map((item) => item.quantity)
                .reduce((val, acc) => val + acc);
            setTotal(data1);
            // console.log(`data from highg ${data1}`);
        }
    };

    useEffect(() => {
        fetchInfo();
    }, [loading]);
    return (
        <div>
            <CartContext.Provider
                value={{ total, setTotal, loading, setLoading }}
            >
                <main>{children}</main>
            </CartContext.Provider>
            <Footer />
        </div>
    );
};

export default Layout;
