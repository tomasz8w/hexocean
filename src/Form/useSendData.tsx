import axios from "axios";
import { useEffect, useState } from "react";

const request = axios.create({
  baseURL: "https://frosty-wood-6558.getsandbox.com:443/dishes",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
});

type ErrorData = {
  name?: string;
  preparation_time?: string;
  type?: string;
  no_of_slices?: number;
  diameter?: number;
  spiciness_scale?: number;
  slices_of_bread?: number;
};

const useSendData = <T,>(data: T) => {
  const [id, setId] = useState<number | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<ErrorData | undefined>();

  useEffect(() => {
    if (!data) return;

    setIsLoading(true);
    setSuccess(false);
    setError(undefined);
    setId(undefined);

    (async () => {
      try {
        const res = await request.request<{ id: number }>({ data });
        setId(res.data.id);
        setSuccess(true);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response && error.response.data) {
            const err = error.response.data as ErrorData;
            setError(err);
          }
        }
      } finally {
        setIsLoading(false);
      }
    })();
  }, [data]);

  return { id, error, success, isLoading };
};

export default useSendData;
