import { useState, useContext } from "react";
import { fetchStore } from "../../utils/apiCall";
import axios from "axios";
import HeaderComponent from "../../components/HeaderComponent";
import { CartContext } from "../../components/Layout";
import Link from "next/link";
import Image from "next/image";

const CardComponent = ({ id, pname, price, pictureurl }) => {
    const { mutateCartTotal } = useContext(CartContext);

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
            setCheckoutMessage(true);
            mutateCartTotal();
            // console.log(data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="store-card">
            <p>{pname}</p>

            <Image
                width="5em"
                height="5em"
                layout="responsive"
                src={pictureurl}
                alt={pname}
                title={pname}
            />
            <p>Price: ${price}.00</p>
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
