import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BASE_URL from "../../utils/constants/base_url";
import fetchingData from "../../utils/functions/fetchingData";
import slideIcon from "../../assets/images/slide.png";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";
import { EffectCube, Pagination } from "swiper";
import Loader from "../../components/loader/Loader";
const types = {
  pilotos: "piloto",
  equipos: "equipo",
};
const Information = () => {
  const [data, setData] = useState(null);
  const [loader, setLoader] = useState(false);
  const { type } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      if (type in types === false) return navigate("/");
      try {
        setLoader(true);
        const res = await fetchingData(
          `${BASE_URL}/api/formula1/getData/${type}`
        );
        setData(res.data.docs);
        setLoader(false);
      } catch (error) {
        setLoader(false);
        throw error;
      }
    })();
  }, [type, navigate]);

  return (
    <>
      <div className="information-contain">
        <h2>Seleccioná un {types[type]}</h2>
        <div className="information-container">
          {data?.length && (
            <Swiper
              effect={"cube"}
              grabCursor={true}
              cubeEffect={{
                shadow: true,
                slideShadows: true,
                shadowOffset: 20,
                shadowScale: 0.94,
              }}
              pagination={true}
              modules={[EffectCube, Pagination]}
              className="mySwiper"
            >
              {data.map((item, idx) => (
                <SwiperSlide
                  key={idx}
                  onClick={() => navigate(`/informacion/${type}/${item.slug}`)}
                >
                  <img src={item.image} alt={item.name} />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
        <motion.div
          initial={{ translateX: 50 }}
          whileInView={{ translateX: -50 }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <img
            src={slideIcon}
            alt="slide-icon"
            style={{
              width: "32px",
              height: "32px",
              margin: "auto",
              display: "block",
            }}
          />
        </motion.div>
      </div>
      {loader && <Loader />}
    </>
  );
};

export default Information;
