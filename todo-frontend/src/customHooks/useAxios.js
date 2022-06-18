import { useEffect, useState } from "react";
import axios from "axios";
const useAxios = (METHOD, url, body = null) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    //terminate
    const abortReqest = new AbortController();
    //time call to send req
    setTimeout(() => {
      if (METHOD !== "GET" && !body) {
        console.log("empty body");
      } else {
        var data = JSON.stringify(body);
        var config = {
          method: METHOD,
          url: url,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          data: data,
          signal: abortReqest.signal,
        };
        axios(config)
          .then((res) => {
            if (res.status !== 200)
              throw Error("error.. cant fetch data for that url");
            //return only data from response as an arr
            return Object.values(res.data)[0];
          })
          .then((data) => {
            setData(data);
            setError(false);
            setIsPending(false);
          })
          .catch((err) => {
            if (err.name === "CanceledError") {
              //do nothing
            } else {
              setError(Object.values(err.response)[0]);
              setIsPending(false);
            }
          });
      }
    }, 1000);

    return () => {
      abortReqest.abort();
    };
  }, [url, METHOD, body]);
  return { data, isPending, error };
};

export default useAxios;
