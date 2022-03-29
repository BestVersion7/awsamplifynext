import { useState, useContext } from "react";
import { fetchStore } from "../utils/apiCall";
import axios from "axios";
import HeaderComponent from "../components/HeaderComponent";
import { CartContext } from "../components/Layout";
import Link from "next/link";

const CardComponent = ({ props, cartReload, setCartReload }) => {
    const [quantity, setQuantity] = useState(1);
    const [checkoutMessage, setCheckoutMessage] = useState(false);

    const handleIncrement = () => {
        setQuantity(parseInt(quantity) + 1);
        // setCheckoutMessage(false);
    };
    const handleDecrement = () => {
        setQuantity(parseInt(quantity) - 1);
        // setCheckoutMessage(false);
    };

    const handleAddCart = async () => {
        try {
            const quantity2 = parseInt(quantity);
            const data = await axios.post("/api/store", {
                productid: id,
                quantity: quantity2,
            });
            setCartReload(!cartReload);
            setCheckoutMessage(true);
            // console.log(data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="store-card">
            <p>{props.pname}</p>

            <img src={props.pictureurl} alt={props.pname} title={props.pname} />
            <p>Price: ${props.price}.00</p>
            <p>Quantity:</p>
            <p>
                <button className="action-button" onClick={handleDecrement}>
                    -
                </button>
                <input
                    size="1px"
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                />
                <button className="action-button" onClick={handleIncrement}>
                    +
                </button>
            </p>
            <button onClick={handleAddCart}>Add to Cart</button>
            {checkoutMessage && (
                <p>
                    Product added to cart! Click here to{" "}
                    <Link href="/cart">
                        <a>checkout</a>
                    </Link>{" "}
                    or upper right hand corner
                </p>
            )}
        </div>
    );
};

export default function Store({ storeproducts }) {
    const { cartReload, setCartReload } = useContext(CartContext);

    return (
        <div>
            <HeaderComponent />
            <div className="store-component-main">
                {storeproducts.map((props) => (
                    <CardComponent
                        key={props.id}
                        props={props}
                        cartReload={cartReload}
                        setCartReload={setCartReload}
                    />
                ))}
            </div>
        </div>
    );
}

export const getStaticProps = async () => {
    const storeproducts = await fetchStore();
    return {
        props: {
            storeproducts,
        },
    };
};
