import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "./Layout";

const HeaderComponent = () => {
    const { total } = useContext(CartContext);
    // console.log(total)

    return (
        <header>
            {/* <h2> */}
            <Link href="/store">
                <a className="header-icon">Shop Wine</a>
            </Link>
            {/* </h2>
            <h2 className="cart-button"> */}
            <Link href="/cart">
                <a className="cart-button">Cart ({total})</a>
            </Link>
            {/* </h2> */}
        </header>
    );
};

export default HeaderComponent;
