import { useState } from "react";
import { fetchStore } from "../../utils/apiCall";
import axios from "axios";
import HeaderComponent from "../../components/HeaderComponent";

const CardComponent = ({ id, pname, price, pictureurl }) => {
    const [quantity, setQuantity] = useState(0);
    const handleIncrement = () => {
        setQuantity(quantity + 1);
    };
    const handleDecrement = () => {
        setQuantity(quantity - 1);
    };

    const handleAddCart = async () => {
        try {
            const quantity2 = parseInt(quantity);
            const data = await axios.post("/api/store", {
                productid: id,
                quantity: quantity2,
            });
            // console.log(data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="card-component-main">
            <p>{pname}</p>

            <img src={pictureurl} alt={pname} title={pname} />
            <p>${price}.00</p>
            <p>
                Quantity <button onClick={handleDecrement}>-</button>
                <input
                    size="1px"
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                />
                <button onClick={handleIncrement}>+</button>
            </p>
            <button onClick={handleAddCart}>Add to Cart</button>
        </div>
    );
};

export default function Store({ storeproducts }) {
    return (
        <div>
            <HeaderComponent />
            {storeproducts.map(({ id, pname, price, pictureurl }) => (
                <CardComponent
                    key={id}
                    id={id}
                    pname={pname}
                    price={price}
                    pictureurl={pictureurl}
                />
            ))}
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