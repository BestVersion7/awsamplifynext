import { fetchTen } from "../utils/apiCall";

// import Link from "next/link";

export default function Home() {
    return <div>hello</div>;
}

export async function getStaticProps() {
    const data = await fetchTen();
    // const mapped = data.map((item) => ({
    //     params: {
    //         account_id,
    //         first_name,
    //     },
    // }));
    console.log(data);
    return {
        'sam':'sam'
    };
}
