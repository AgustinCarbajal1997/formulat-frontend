import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import LatestContainer from "../../components/latest/LatestContainer";
import BASE_URL from "../../utils/constants/base_url";
import fetchingData from "../../utils/functions/fetchingData";

const ProfileFavorites = () => {
  const [data, setData] = useState(null);
  const user = useSelector((state) => state.user.dataUser);
  useEffect(() => {
    (async () => {
      try {
        const res = await fetchingData(
          `${BASE_URL}/api/blog/obtainSeveralIds`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            method: "post",
            body: JSON.stringify({ ids: user.favorites }),
          }
        );
        setData(res.data);
      } catch (error) {
        throw error;
      }
    })();
  }, [user]);
  return (
    <div className="favs-page">
      {data?.docs?.length && (
        <LatestContainer
          data={data.docs}
          classname="recent"
          title="Estas son tus noticias favoritas"
          subtitle="Favoritas"
        />
      )}
    </div>
  );
};

export default ProfileFavorites;
