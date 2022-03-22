import { useState, useEffect } from "react";
import axios from "axios";
import HeaderComponent from "../../components/HeaderComponent";
import Link from "next/link";
import { Payment } from "../../components/Payment";

const CardComponent = ({ orderid, pname, price, quantity }) => {
    return (
        <tbody>
            <tr>
                <td>{pname}</td>
                <td>{quantity}</td>
                <td>{price}</td>
                <td>{quantity * price}</td>
            </tr>
        </tbody>
    );
};

export default function Checkout() {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const fetchInfo = async () => {
        const { data } = await axios.get("/api/store");
        const total1 = data
            .map((item) => item.quantity * item.storedb.price)
            .reduce((val, acc) => val + acc);
        setTotal(total1);
        setCart(data);
    };

    useEffect(() => {
        fetchInfo();
    }, []);
    return (
        <div className="checkout-component-main">
            <HeaderComponent />
            <div>
                <Payment total={total} />
                <h1>Order Summary: </h1>
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
                        />
                    ))}
                </table>
                <div>
                    <p>Total is ${total} </p>
                    <p>
                        Go back to
                        <button>
                            <Link href="/cart">
                                <a>Cart</a>
                            </Link>
                        </button>
                    </p>
                </div>
            </div>

            <footer>footer</footer>
        </div>
    );
}
