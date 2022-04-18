import "../styles/globals.scss";
import Layout from "../components/Layout";
import Script from "next/script";

function MyApp({ Component, pageProps }) {
    return (
        <>
            {/* <Script
                id="Adsense-id"
                async
                onError={(e) => {
                    console.error("Script failed to load", e);
                }}
                strategy="afterInteractive"
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8622358296496789"
                crossorigin="anonymous"
            /> */}
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </>
    );
}

export default MyApp;
