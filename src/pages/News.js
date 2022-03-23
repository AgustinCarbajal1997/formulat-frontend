import React from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/loader/Loader";
import NewsContainer from "../components/news/NewsContainer";
import useFetch from "../customHooks/useFetch";
import usePagination from "../customHooks/usePagination";
import BASE_URL from "../utils/constants/base_url";

const News = () => {
  const { slug } = useParams();
  const { data: newsData, setData: setNewsData, loading } = useFetch(
    `${BASE_URL}/api/blog/getNewsBySlug/${slug}`
  );
  const { data: asideNews } = usePagination(
    `${BASE_URL}/api/blog/getAllNews?`,
    1,
    6,
    true
  );
  return (
    <div className="news-page">
      {newsData?.data && asideNews?.data?.docs?.length && (
        <NewsContainer
          data={newsData.data}
          setData={setNewsData}
          dataAside={asideNews.data.docs}
        />
      )}
      { loading && <Loader/> }
      
    </div>
  );
};

export default News;
