import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useSelector } from "react-redux";
import { ArticleState } from "../redux/search/searchSlice";
import { useState } from "react";
import { Article } from "../models/article";
import ListGroup from "react-bootstrap/ListGroup";
import { useNavigate } from "react-router-dom";
const SearchBar = () => {
  const navigate = useNavigate();
  const [suggestData, setSuggestData] = useState([]);
  const [inputData, setInputData] = useState("");
  const listTitle: any = useSelector(
    (state: { search: ArticleState }) => state.search.listArticle
  );
  const handleSearch = () => {
    console.log(listTitle.articles);
  };

  const handleChange = (e: any) => {
    const inputData = e.target.value.trimStart();
    setInputData(inputData);
    if (inputData.length > 0) {
      const filterData = listTitle?.articles?.filter(
        (data: Article) => data.title.toLowerCase().indexOf(inputData) !== -1
      );
      setSuggestData(filterData);
    } else {
      setSuggestData([]);
    }
  };
  const getArticleDetail = (slug: string) => {
    navigate(`/article/${slug}`);
  };

  const getHighlightedText = (text: string, highlight: string) => {
    // Split on highlight term and include term into parts, ignore case
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return (
      <span>
        {" "}
        {parts.map((part, i) => (
          <span
            key={i}
            style={
              part.toLowerCase() === highlight.toLowerCase()
                ? { fontWeight: "bold" }
                : {}
            }
          >
            {part}
          </span>
        ))}{" "}
      </span>
    );
  };

  return (
    <Container>
      <Row>
        <Col>
          <input onChange={handleChange} value={inputData}></input>
        </Col>
        <Col>
          <button onClick={handleSearch}>Search</button>
        </Col>
      </Row>
      <Row>
        <Col>
          <ListGroup>
            {suggestData?.map((article: Article) => (
              <ListGroup.Item
                className="w-100"
                key={article.slug}
                onClick={() => getArticleDetail(article.slug)}
                style={{
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {getHighlightedText(article.title, inputData)}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default SearchBar;
