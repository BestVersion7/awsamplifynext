import HeaderComponent from "../../components/HeaderComponent";
import Link from "next/link";
import { Payment } from "../../components/Payment";
import { fetchCart } from "../../utils/apiCall";

const CardComponent = ({ pname, price, quantity }) => {
    return (
        <tbody>
            <tr>
                <td>{pname}</td>
                <td>{quantity}</td>
                <td>{price}</td>
                <td>${quantity * price}.00</td>
            </tr>
        </tbody>
    );
};

const Checkout = ({ cartData }) => {
    let total = 0;
    if (cartData.length !== 0) {
        total = cartData
            .map((item) => item.quantity * item.storedb.price)
            .reduce((val, acc) => val + acc);
    }

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

                    {cartData.map(({ orderid, quantity, storedb }) => (
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
                <>
                    <p>
                        Go back to
                        <button>
                            <Link href="/cart">
                                <a>Cart</a>
                            </Link>
                        </button>
                    </p>
                </>
            </div>
        </div>
    );
};

export const getServerSideProps = async () => {
    const cartData = await fetchCart();
    // consolse.log(cartData);
    return {
        props: {
            cartData,
        },
    };
};

export default Checkout;
