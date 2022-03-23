const fetchingData = async (url, options) => {
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    if (!response.ok) {
      const errorMessage = {
        status: response.status,
        message: data.message || "Ocurrio un error",
      };
      throw errorMessage;
    }
    return data;
  } catch (error) {
    throw error;
  }
};
export default fetchingData;
