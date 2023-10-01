import { useDispatch, useSelector } from "react-redux";
import {
  getFeedArticle,
  getGlobalArticle,
} from "../redux/article/readArticle/readArticleSlice";

import { getTagArticles } from "../redux/tag/tagArticles/tagArticlesSlice";
import ReactPaginate from "react-paginate";

const CustomPagination: React.FC<{ page: string }> = ({ page }) => {
  const dispatch = useDispatch();

  let articlesLength = useSelector(
    (state: {
      readArticle: { articleCount: number };
      tagArticles: { articleCount: number };
    }) => {
      return page === "global-feed" || page === "your-feed"
        ? state.readArticle.articleCount
        : state.tagArticles.articleCount;
    }
  );

  async function handleClick(data: { selected: number }) {
    const currentPage = data.selected + 1;
    if (page === "global-feed") {
      await dispatch(getGlobalArticle((currentPage - 1) * 10));
    } else if (page === "your-feed") {
      await dispatch(getFeedArticle((currentPage - 1) * 10));
    } else {
      await dispatch(
        getTagArticles({ offset: (currentPage - 1) * 10, tag: page })
      );
    }
  }

  if (articlesLength <= 10) {
    return;
  } else {
    articlesLength = Math.ceil(articlesLength / 10);
    return (
      <ReactPaginate
        key={page}
        previousLabel={"<"}
        nextLabel={">"}
        breakLabel={"..."}
        pageCount={articlesLength}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        onPageChange={handleClick}
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />
    );
  }
};

export default CustomPagination;
