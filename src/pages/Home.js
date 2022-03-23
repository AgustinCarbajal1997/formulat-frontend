import React from "react";
import HighlightContainer from "../components/highlight/HighlightContainer";
import LatestContainer from "../components/latest/LatestContainer";
import Pagination from "../components/pagination/Pagination";
import InputSearch from "../components/search/InputSearch";
import usePagination from "../customHooks/usePagination";
import useWindowDimensions from "../customHooks/useWindowsDimensions";
import BASE_URL from "../utils/constants/base_url";
const Home = () => {
  
  const { data: highlights } = usePagination(
    `${BASE_URL}/api/blog/getHighlights?`,
    1,
    3,
    true
  );
  const { data: latestNews } = usePagination(
    `${BASE_URL}/api/blog/getLatest?`,
    1,
    3,
    true
  );
  const {
    data: allNews,
    page,
    onNextPage,
    onPrevPage,
  } = usePagination(`${BASE_URL}/api/blog/getLatest?`, 1, 6, true);
  const { width } = useWindowDimensions();
  return (
    <div>
      {width > 768 && highlights?.data?.docs?.length && (
        <HighlightContainer data={highlights.data.docs} />
      )}
      {width <= 768 && highlights?.data?.docs?.length && (
        <LatestContainer
        data={highlights.data.docs}
        classname="latest"
        title="Destacadas"
        subtitle="Destacadas"
      />
      )}
      <InputSearch/>
      {latestNews?.data?.docs?.length && (
        <LatestContainer
          data={latestNews.data.docs.slice(0, 3)}
          classname="latest"
          title="Últimas noticias"
          subtitle="Últimas"
        />
      )}
      {allNews?.data?.docs?.length && (
        <>
          <LatestContainer
            data={page === 1 ? allNews.data.docs.slice(3) : allNews.data.docs}
            classname="recent"
            title="Noticias recientes"
            subtitle="Recientes"
          />
          <Pagination
            page={page}
            onPrevPage={onPrevPage}
            onNextPage={onNextPage}
            totalPages={allNews.data.totalPages}
          />
        </>
      )}
    </div>
  );
};

export default Home;
