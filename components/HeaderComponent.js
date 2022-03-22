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
                <Link href="/checkout">
                    <a>Cart</a>
                </Link>
            </h1>
        </header>
    );
};

export default HeaderComponent;

// export const getStaticProps = async () => {
//     const quantity = await fetchStore();
//     console.log(quantity)
//     return {
//         props: {
//             quantity,
//         },
//     };
// };
