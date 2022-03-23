import { useState, useContext } from "react";
import axios from "axios";
import HeaderComponent from "../../components/HeaderComponent";
import { CartContext } from "../../components/Layout";
import Link from "next/link";
import useSWR from "swr";
const fetcher = (...args) => fetch(...args).then((res) => res.json());

const CardComponent = ({ orderid, pname, price, quantity }) => {
    const { mutateCartTotal } = useContext(CartContext);

    const [quantityProduct, setQuantityProduct] = useState(quantity);
    const [disableUpdate, setDisableUpdate] = useState(true);

    const handleChange = (e) => {
        setDisableUpdate(false);
        setQuantityProduct(e.target.value);
    };

    const handleUpdate = async (val) => {
        await axios.put("/api/store", {
            orderid: parseInt(val),
            quantity: parseInt(quantityProduct),
        });
        setDisableUpdate(true);
        mutateCartTotal();
    };

    const handleDelete = async (val) => {
        await axios.delete(`/api/store?orderid=${val}`);
        mutateCartTotal();
    };
    return (
        <tbody>
            <tr>
                <td>{pname}</td>
                <td>
                    <div className="cart-action-container">
                        <input
                            type="number"
                            value={quantityProduct}
                            onChange={(e) => handleChange(e)}
                        />

                        <span className="cart-action-button-container">
                            <button
                                className="cart-action-button"
                                onClick={() => handleUpdate(parseInt(orderid))}
                                disabled={disableUpdate}
                            >
                                Update
                            </button>
                            <button
                                className="cart-action-button"
                                onClick={() => handleDelete(parseInt(orderid))}
                            >
                                Remove
                            </button>
                        </span>
                    </div>
                </td>
                <td>${price}</td>
                <td>${quantity * price}</td>
            </tr>
        </tbody>
    );
};

export default function Cart() {
    const { data, error } = useSWR("/api/store", fetcher);

    if (error) return <div>Failed to load</div>;
    if (!data) return <div>Loading...</div>;

    let total;
    if (data.length !== 0) {
        total = data
            .map((item) => item.quantity * item.storedb.price)
            .reduce((val, acc) => val + acc);
    }

    return (
        <div className="cart-component-main">
            <HeaderComponent />
            <div>
                {data.length === 0 ? (
                    <p>You have no items in your cart.</p>
                ) : (
                    <>
                        <p>Total is ${total} </p>
                        <Link href="/store">
                            <a>
                                <button className="checkout-button">
                                    Back
                                </button>
                            </a>
                        </Link>

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
                    {data.map(({ orderid, quantity, storedb }) => (
                        <CardComponent
                            key={orderid}
                            orderid={orderid}
                            pname={storedb.pname}
                            price={storedb.price}
                            pictureurl={storedb.pictureurl}
                            quantity={quantity}
                        />
                    ))}
                </table>
            </div>
        </div>
    );
}
