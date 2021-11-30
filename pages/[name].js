import { fetchTen, fetchName } from "../utils/apiCall";
import Link from "next/link";
import { useRouter } from "next/router";

const NamePage = ({ data }) => {
    const router = useRouter();

    if (router.isFallback) {
        return <div>Loading</div>;
    }
    return (
        <section>
            Name is {data.first_name} <br /> Gender is {data.gender}
            <br /> Last name is {data.last_name} <br />{" "}
            <Link href="/">Home</Link>
        </section>
    );
};

export async function getStaticProps({ params }) {
    const data = await fetchName(params.name);
    if (!data) {
        return {
            notFound: true,
        };
    }
    return {
        props: {
            data,
        },
        revalidate: 3600,
    };
}

export async function getStaticPaths() {
    const data = await fetchTen();
    const paths = data.map((item) => ({
        params: {
            name: item.first_name,
        },
    }));
    return {
        paths,
        fallback: true,
    };
}

export default NamePage;
