import Link from "next/link";

const HeaderComponent = () => {
    return (
        <header>
            <Link href="/store">
                <a>
                    <h1>Store Header</h1>
                </a>
            </Link>
            <h1>
                <Link href="/cart">
                    <a>Cart</a>
                </Link>
            </h1>
        </header>
    );
};

export default HeaderComponent;
