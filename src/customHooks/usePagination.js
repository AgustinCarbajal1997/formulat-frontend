import { useState, useEffect, useCallback } from "react";

const usePagination = (url, pageN, limitN, paginationB, save, options = {}) => {
  const [page, setPage] = useState(pageN);
  const [limit, setLimit] = useState(limitN);
  const [pagination, setPagination] = useState(paginationB);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [savePrev, setSavePrev] = useState([]);
  const [totalDocs, setTotalDocs] = useState(0);
  const onNextPage = () => {
    if (!data || page >= data.data.totalPages) return;
    setPage(page + 1);
  };
  const onPrevPage = () => {
    if (page <= 1) return;
    setPage(page - 1);
  };
  const redirect = useCallback(
    async() => {
      try {
        setLoading(true);
        const response = await fetch(
          `${url}page=${page}&limit=${limit}&pagination=${pagination}`,
          {
            ...options,
          }
        );
        const data = await response.json();
        setData(data);
        setPage(data.data.page);
        setTotalDocs(data.data.totalDocs);
        if (save) setSavePrev(data.data.docs);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    },
    [limit, page,url,pagination, options, save],
  )
  
 

  useEffect(() => {
    let abortController = new AbortController();
    (async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${url}page=${page}&limit=${limit}&pagination=${pagination}`,
          {
            ...options,
            signal: abortController.signal,
          }
        );
        if (!abortController.signal.aborted) {
          const data = await response.json();
          setData(data);
          console.log(data)
          setPage(data.data.page);
          setTotalDocs(data.data.totalDocs);
          if (save) setSavePrev([...savePrev, ...data.data.docs]);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        if (error.name === "AbortError") {
          return;
        }
        setError(error);
      }
    })();
    return () => {
      abortController.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, page, limit, pagination]);

  return {
    data,
    page,
    setData,
    setPage,
    setLimit,
    totalDocs,
    setTotalDocs,
    setPagination,
    savePrev,
    setSavePrev,
    onPrevPage,
    onNextPage,
    error,
    loading,
    redirect
  };
};

export default usePagination;
