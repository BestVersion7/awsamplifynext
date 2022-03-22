import { useState, useContext } from "react";
import { fetchStore } from "../../utils/apiCall";
import axios from "axios";
import HeaderComponent from "../../components/HeaderComponent";
import { CartContext } from "../../components/Layout";
import Link from "next/link";

const CardComponent = ({
    id,
    pname,
    price,
    pictureurl,
    loading,
    setLoading,
}) => {
    const [quantity, setQuantity] = useState(0);
    const [checkoutMessage, setCheckoutMessage] = useState(false);

    const handleIncrement = () => {
        setQuantity(quantity + 1);
        // setCheckoutMessage(false);
    };
    const handleDecrement = () => {
        setQuantity(quantity - 1);
        // setCheckoutMessage(false);
    };

    const handleAddCart = async () => {
        try {
            const quantity2 = parseInt(quantity);
            const data = await axios.post("/api/store", {
                productid: id,
                quantity: quantity2,
            });
            setLoading(!loading);
            setCheckoutMessage(true);
            // console.log(data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="store-card">
            <p>{pname}</p>

            <img src={pictureurl} alt={pname} title={pname} />
            <p>Price: ${price}.00</p>
            {/* <p>${price}.00</p> */}
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
                    <Link href="/checkout">
                        <a>checkout</a>
                    </Link>{" "}
                    or upper right hand corner
                </p>
            )}
        </div>
    );
};

export default function Store({ storeproducts }) {
    const { loading, setLoading } = useContext(CartContext);
    return (
        <div>
            <HeaderComponent />
            <div className="store-component-main">
                {storeproducts.map(({ id, pname, price, pictureurl }) => (
                    <CardComponent
                        key={id}
                        id={id}
                        pname={pname}
                        price={price}
                        pictureurl={pictureurl}
                        loading={loading}
                        setLoading={setLoading}
                    />
                ))}
            </div>
            <footer>footer</footer>
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
