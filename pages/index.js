// import { fetchAll } from "../utils/apiCall";
// import Link from "next/link";

export default function Home() {
    return (
        <div>
            {/* {data.map((item) => (
                <div key={item.account_id}>
                    <h2>
                        Name is {item.first_name}; Gender is {item.gender}{" "}
                        <Link href={`/${item.first_name}`}>
                            {item.first_name}
                        </Link>
                    </h2>
                </div>
            ))} */}
            hello there
        </div>
    );
}

// export async function getStaticProps() {
//     const data = await fetchAll();

//     return {
//         props: {
//             data,
//         },
//     };
// }
