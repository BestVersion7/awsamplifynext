import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "./Layout";

const HeaderComponent = () => {
    const { cartQuantity } = useContext(CartContext);
    // console.log(total)

    return (
        <header>
            {/* <h2> */}
            <Link href="/store">
                <a className="header-icon">
                    <b>Shop Food</b>
                </a>
            </Link>
            <Link href="/blog/one">
                <a className="header-icon">
                    <b>One</b>
                </a>
            </Link>
            <Link href="/blog/two">
                <a className="header-icon">
                    <b>Two</b>
                </a>
            </Link>
            <Link href="/blog/three">
                <a className="header-icon">
                    <b>Three</b>
                </a>
            </Link>
            {/* </h2>
            <h2 className="cart-button"> */}
            <Link href="/cart">
                <a className="cart-button">
                    <b>Cart ({cartQuantity})</b>
                </a>
            </Link>
            {/* </h2> */}
        </header>
    );
};

export default HeaderComponent;
