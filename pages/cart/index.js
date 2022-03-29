import { useState, useContext } from "react";
import axios from "axios";
import HeaderComponent from "../../components/HeaderComponent";
import { CartContext } from "../../components/Layout";
import Link from "next/link";
import { fetchCart } from "../../utils/apiCall";

const CardComponent = ({ props }) => {
    const { cartReload, setCartReload } = useContext(CartContext);

    const [quantityProduct, setQuantityProduct] = useState(props.quantity);
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
        setCartReload(!cartReload);
    };

    const handleDelete = async (val) => {
        await axios.delete(`/api/store?orderid=${val}`);
        setCartReload(!cartReload);
    };
    return (
        <tbody>
            <tr>
                <td>{props.storedb.pname}</td>
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
                                onClick={() =>
                                    handleUpdate(parseInt(props.orderid))
                                }
                                disabled={disableUpdate}
                            >
                                Update
                            </button>
                            <button
                                className="cart-action-button"
                                onClick={() =>
                                    handleDelete(parseInt(props.orderid))
                                }
                            >
                                Remove
                            </button>
                        </span>
                    </div>
                </td>
                <td>${props.storedb.price}</td>
                <td>${props.quantity * props.storedb.price}</td>
            </tr>
        </tbody>
    );
};

const Cart = ({ data }) => {
    let total = 0;
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
                    {data.map((props) => (
                        <CardComponent key={props.orderid} props={props} />
                    ))}
                </table>
            </div>
        </div>
    );
};

export const getServerSideProps = async () => {
    const data = await fetchCart();
    return {
        props: {
            data,
        },
    };
};

export default Cart;
