import {useEffect} from 'react'

export default function Adsense() {
    const loadAds = () => {
        try {
            if (typeof window !== "undefined") {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            }
        } catch (error) {
            console.log("adsense error", error.message);
        }
    };

    useEffect(() => {
        loadAds();
    }, []);

    return (
        <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-8622358296496789"
            data-ad-slot="4988360344"
            data-ad-format="auto"
            data-full-width-responsive="true"
        ></ins>
    );
}
