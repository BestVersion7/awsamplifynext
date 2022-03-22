import { useState, useEffect } from "react";
import axios from "axios";
import HeaderComponent from "../../components/HeaderComponent";

const CardComponent = ({
    orderid,
    productid,
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
                        Save
                    </button>
                    <button onClick={() => handleDelete(parseInt(orderid))}>
                        Delete
                    </button>
                </td>
                <td>{price}</td>
                <td>{quantity * price}</td>
            </tr>
        </tbody>
    );
};

export default function Store() {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);

    const fetchInfo = async () => {
        const { data } = await axios.get("/api/store");
        // console.log(data)
        setTotal(
            data
                .map((item) => item.quantity * item.storedb.price)
                .reduce((val, acc) => val + acc)
        );
        setCart(data);
    };

    useEffect(() => {
        fetchInfo();
    }, [loading]);
    return (
        <div>
            yo
            <HeaderComponent />
            <table>
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Total</th>
                    </tr>
                </thead>
                {cart.map(({ orderid, productid, quantity, storedb }) => (
                    <CardComponent
                        key={orderid}
                        orderid={orderid}
                        productid={storedb.productid}
                        pname={storedb.pname}
                        price={storedb.price}
                        pictureurl={storedb.pictureurl}
                        quantity={quantity}
                        loading={loading}
                        setLoading={setLoading}
                    />
                ))}
            </table>
            <p>Total is ${total}</p>
            <footer>footer</footer>
        </div>
    );
}
