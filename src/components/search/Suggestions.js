import {  useNavigate } from "react-router-dom";
import useWindowDimensions from "../../customHooks/useWindowsDimensions";

export const Suggestions = ({ suggestions, setSuggestions, setQuery }) => {
  const navigate = useNavigate();
  const onClickLinkHandler = (slug) => {
    navigate(`/noticia/${slug}`);
    setSuggestions(null);
    setQuery("");
  };
  const { width } = useWindowDimensions();
  return (
    <div className="search-option">
      <ul>
        {suggestions.map((item, index) => (
          <div onClick={() => onClickLinkHandler(item.slug)} key={index}>
            <li key={index}>{item.title.slice(0, width > 768 ? 80 : 40)}</li>
          </div>
        ))}
      </ul>
    </div>
  );
};
