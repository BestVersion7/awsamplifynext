import { fetchArticleById } from "../../utils/apiCall";
import ArticleCardDetail from "../../components/ArticleCardDetail";
import HeaderComponent from "../../components/HeaderComponent";

const ArtTwo = ({ articleData }) => {
    return (
        <div>
            <div className="article-page-divider">
                <HeaderComponent />
                <div>
                    <ArticleCardDetail
                        article_id={articleData.article_id}
                        article_title={articleData.article_title}
                        article_post={articleData.article_post}
                        article_date={articleData.article_date}
                        article_image={articleData.article_image}
                        article_image_small={articleData.article_image_small}
                    />
                </div>
            </div>
            <hr />
            <h2>Comments: </h2>

            <br />
        </div>
    );
};

export default ArtTwo;

export const getStaticProps = async () => {
    const articleData = await fetchArticleById(16);

    return {
        props: { articleData },
        revalidate: 36000,
    };
};
