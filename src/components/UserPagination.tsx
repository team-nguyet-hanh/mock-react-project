import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomUserPagination = ({ handleOffSet }: any) => {
  let articlesLength = useSelector(
    (state: { favoritedArticles: { articleCount: number } }) =>
      state.favoritedArticles.articleCount
  );
  async function handleClick(data: { selected: number }) {
    const currentPage = data.selected + 1;
    handleOffSet((currentPage - 1) * 5);
  }
  const location = useLocation().pathname;
  if (articlesLength <= 5) {
    return;
  } else {
    articlesLength = Math.ceil(articlesLength / 5);
    return (
      <ReactPaginate
        key={location}
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

export default CustomUserPagination;
