import React from "react";
import { useParams } from "react-router-dom";
import InfoData from "../../components/info/InfoData";
import Loader from "../../components/loader/Loader";
import useFetch from "../../customHooks/useFetch";
import BASE_URL from "../../utils/constants/base_url";

const InformationData = () => {
  const { type, slug } = useParams();
  const { data, loading } = useFetch(
    `${BASE_URL}/api/formula1/getDataBySlug/${type}/${slug}`
  );
  return (
    <>
      <div className="informationData-page">
        {data?.data && <InfoData type={type} data={data.data} />}
        {data?.data && (
          <div className="informationData-page-description">
            <h2 className="informationData-page-description-title">
              Descripción
            </h2>
            <div
              className="article-item-container-description-markdown"
              dangerouslySetInnerHTML={{
                __html: data.data.sanitizedHtml,
              }}
            ></div>
          </div>
        )}
      </div>
      {loading && <Loader />}
    </>
  );
};

export default InformationData;
