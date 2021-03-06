import { fetchOne } from "../../utils/apiCall";
import ArticleCardDetail from "../../components/ArticleCardDetail";
import AdSense from "../../components/AdSense";

const ArticlePage = ({ articleData }) => {
    const {
        article_date,
        article_title,
        article_image,
        article_post,
        article_id,
        article_image_small,
    } = articleData;

    return (
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr" }}>
            <div>
                <ArticleCardDetail
                    article_id={article_id}
                    article_title={article_title}
                    article_post={article_post}
                    article_date={article_date}
                    article_image={article_image}
                    article_image_small={article_image_small}
                />
            </div>
            <div>
                <AdSense />
            </div>
        </div>
    );
};

export default ArticlePage;

export const getStaticProps = async ({ params }) => {
    const articleData = await fetchOne(19);
    if (articleData === null) {
        return {
            notFound: true,
        };
    }

    return {
        props: { articleData },
        revalidate: 36000,
    };
};
