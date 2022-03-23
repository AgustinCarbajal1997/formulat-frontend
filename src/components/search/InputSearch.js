import { useRef, useState } from "react";
import { Suggestions } from "./Suggestions";
import BASE_URL from "../../utils/constants/base_url";
import useClickOutsideRef from "../../customHooks/useClickOutsideRef";
import { ToastContainer, toast } from "react-toastify";
const createQuery = (str) => {
  let queryArray = str.split(" ").reduce((ac, item, idx) => {
    if (!item.trim().length) return ac;
    return !idx ? ac + "?q[]=" + item : ac + "&q[]=" + item;
  }, "");
  return queryArray;
};

const InputSearch = () => {
  const [suggestions, setSuggestions] = useState(null);
  const [query, setQuery] = useState("");
  const searchContainer = useRef(null);
  useClickOutsideRef(searchContainer, setSuggestions);
  const onChangeText = async (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.length < 2) {
      return setSuggestions(null);
    }
    const queryArray = createQuery(value);
    try {
      const response = await fetch(
        `${BASE_URL}/api/blog/generalSearch${queryArray}&page=1&limit=12&pagination=true`
      );
      const { data } = await response.json();
      data?.data?.docs?.length
        ? setSuggestions(data.data.docs)
        : setSuggestions(null);
    } catch (error) {
      toast.error("¡Ocurrio un error.Vuelve a intentar!", {
        style: {
          backgroundColor: "#383838",
          color: "#ffffff",
        },
      });
    }
  };

  return (
    <>
      <div className="search-container" ref={searchContainer}>
        <input
          type="text"
          onChange={onChangeText}
          value={query}
          placeholder="¿Qué noticia estás buscando?"
        />

        {suggestions && query.length > 1 && (
          <Suggestions
            suggestions={suggestions}
            setSuggestions={setSuggestions}
            setQuery={setQuery}
          />
        )}
      </div>
      <div style={{ position: "fixed", zIndex: "999999" }}>
        <ToastContainer />
      </div>
    </>
  );
};

export default InputSearch;
