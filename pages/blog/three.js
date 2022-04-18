import { fetchArticleById } from "../../utils/apiCall";
import Head from "next/head";
import ArticleCardDetail from "../../components/ArticleCardDetail";
import Script from "next/script";
import { useEffect } from "react";
import HeaderComponent from "../../components/HeaderComponent";

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
        <div>
            <div className="article-page-divider">
                <HeaderComponent />
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
            </div>
            <hr />
            <h2>Comments: </h2>

            <br />
        </div>
    );
};

export default ArticlePage;

export const getStaticProps = async () => {
    const articleData = await fetchArticleById(parseInt("17"));
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
