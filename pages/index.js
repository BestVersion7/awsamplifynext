import { fetchTen } from "../utils/apiCall";
import Form from "../components/Form";
import axios from "axios";
import { useState } from "react";

// import Link from "next/link";

export default function Home({ data }) {
    const [name, setName] = useState("");
    const handleClick = async (e) => {
        try {
            const { data } = await axios.post("/api/message", {
                first_name: name,
            });
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div>
            <Form />
            {/* <form onSubmit={(e) => e.preventDefault()}>
                <input value={name} onChange={(e) => setName(e.target.value)} />
                <button type="submit" onClick={handleClick}>
                    enter
                </button>
            </form> */}
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
