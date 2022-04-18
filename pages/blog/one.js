import { fetchArticleById } from "../../utils/apiCall";
import ArticleCardDetail from "../../components/ArticleCardDetail";
import HeaderComponent from "../../components/HeaderComponent";

const ArtOne = ({ articleData }) => {
    return (
        <div>
            <div className="article-page-divider">
                <HeaderComponent />
                <div>
                    <ArticleCardDetail
                        article_id={articleData[0].article_id}
                        article_title={articleData[0].article_title}
                        article_post={articleData[0].article_post}
                        article_date={articleData[0].article_date}
                        article_image={articleData[0].article_image}
                        article_image_small={articleData[0].article_image_small}
                    />
                </div>
            </div>
        </div>
    );
};

export default ArtOne;

export const getStaticProps = async () => {
    const articleData = await fetchArticleById(19);
    return {
        props: { articleData },
        revalidate: 36000,
    };
};
