import { useEffect, useState } from "react";
import { api } from "./api";

const useFetchData = (url: string) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(url);
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  return {
    data,
    loading,
  };
};

export default useFetchData;
