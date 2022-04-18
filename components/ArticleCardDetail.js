import ReactMarkdown from "react-markdown";
// import { formatDate } from "../utils/formatDate";

const ArticleCardDetail = (props) => {
    return (
        <article>
            <h1 style={{ fontSize: "2em" }}>{props.article_title}</h1>
            {/* <p>Author: Hunter Fan</p> */}
            <p>
                {props.article_date} <i>Written by Hunter Fan</i>
            </p>
            <ReactMarkdown>{props.article_post}</ReactMarkdown>
            {/* <p>Thanks for making it this far.</p> */}
        </article>
    );
};

export default ArticleCardDetail;
