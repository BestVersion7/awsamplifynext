import { fetchTen } from "../utils/apiCall";

// import Link from "next/link";

export default function Home({ data }) {
    return (
        <div>
            {data.map((item) => (
                <div key={item.account_id}>
                    Hello {item.account_id} {item.first_name}
                </div>
            ))}
        </div>
    );
}

export async function getStaticProps() {
    const data = await fetchTen();
    // console.log(data)
    return {
        props: {
            data,
        },
    };
}
