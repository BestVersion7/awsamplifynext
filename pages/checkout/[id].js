import HeaderComponent from "../../components/HeaderComponent";
import Link from "next/link";
import { useRouter } from "next/router";

const CheckoutSuccess = () => {
    const router = useRouter();
    const { amount, receipt_email } = router.query;
    // console.log(paymentIntent);
    // 4242424242424242
    return (
        <div className="checkout-component-main">
            <HeaderComponent />
            <article style={{ maxWidth: "25em" }}>
                {`Thank for your payment of $${amount / 100}! A receipt has been
                sent to you at ${receipt_email}`}
                . You can also print this page for your records.
            </article>
            <br />
            <Link href="/store">
                <a>Go Back to Store</a>
            </Link>
        </div>
    );
};

export default CheckoutSuccess;
