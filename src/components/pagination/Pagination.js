import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
const Pagination = ({ page, onPrevPage, onNextPage, totalPages }) => {
  return (
    <div className="pagination-container">
      {page !== 1 && (
        <IoIosArrowBack
          size={28}
          onClick={onPrevPage}
          style={{ cursor: "pointer" }}
        />
      )}

      {page}
      {page < totalPages && (
        <IoIosArrowForward
          size={28}
          onClick={onNextPage}
          style={{ cursor: "pointer" }}
        />
      )}
    </div>
  );
};

export default Pagination;
