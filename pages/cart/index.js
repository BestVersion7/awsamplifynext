import { useState, useEffect, useContext } from "react";
import axios from "axios";
import HeaderComponent from "../../components/HeaderComponent";
import { CartContext } from "../../components/Layout";
import Link from "next/link";

const CardComponent = ({
    orderid,
    pname,
    price,
    quantity,
    loading,
    setLoading,
}) => {
    const [quantityProduct, setQuantityProduct] = useState(quantity);

    const handleUpdate = async (val) => {
        // console.log(val)
        // console.log(quantityProduct)
        await axios.put("/api/store", {
            orderid: parseInt(val),
            quantity: parseInt(quantityProduct),
        });
        setLoading(!loading);
    };

    const handleDelete = async (val) => {
        await axios.delete(`/api/store?orderid=${val}`);
        setLoading(!loading);
    };
    return (
        <tbody>
            <tr>
                <td>{pname}</td>
                <td>
                    <input
                        type="number"
                        value={quantityProduct}
                        onChange={(e) => setQuantityProduct(e.target.value)}
                    />
                    <button onClick={() => handleUpdate(parseInt(orderid))}>
                        Update
                    </button>
                    <button onClick={() => handleDelete(parseInt(orderid))}>
                        Remove
                    </button>
                </td>
                <td>${price}</td>
                <td>${quantity * price}</td>
            </tr>
        </tbody>
    );
};

export default function Cart() {
    const [cart, setCart] = useState([]);
    const { loading, setLoading } = useContext(CartContext);
    const [total, setTotal] = useState(0);
    const [cartMessage, setCartMessage] = useState(true);

    const fetchInfo = async () => {
        const { data } = await axios.get("/api/store");
        // console.log(data)
        if (data.length === 0) {
            setCartMessage(true);
        } else {
            setCartMessage(false);
            setTotal(
                data
                    .map((item) => item.quantity * item.storedb.price)
                    .reduce((val, acc) => val + acc)
            );
        }
        setCart(data);
    };

    useEffect(() => {
        fetchInfo();
    }, [loading]);
    return (
        <div className="cart-component-main">
            <HeaderComponent />
            <div>
                {cartMessage ? (
                    <p>You have no items in your cart.</p>
                ) : (
                    <>
                        <p>Total is ${total} </p>
                        <a href="/store">
                            <button className="checkout-button">Back</button>
                        </a>

                        <button className="checkout-button">
                            <Link href="/checkout">
                                <a>Checkout</a>
                            </Link>
                        </button>
                    </>
                )}
                <table>
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    {cart.map(({ orderid, quantity, storedb }) => (
                        <CardComponent
                            key={orderid}
                            orderid={orderid}
                            pname={storedb.pname}
                            price={storedb.price}
                            pictureurl={storedb.pictureurl}
                            quantity={quantity}
                            loading={loading}
                            setLoading={setLoading}
                        />
                    ))}
                </table>
            </div>

            <footer>footer</footer>
        </div>
    );
}
