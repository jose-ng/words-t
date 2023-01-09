import { useEffect, useState } from "react";
import URL_API from "../utils/env";

function useStateWords() {
  const [listWords, setListWords] = useState([]);
  const [showNotes, setShowNotes] = useState(false);
  const [nextResults, setNextResults] = useState(0);
  const [ip, setIp] = useState("");
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalShowRecords, setTotalShowRecords] = useState(0);
  const [query, setQuery] = useState(null);
  const [limitResult, setLimitResult] = useState(20);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setNextResults(0);
    setTotalRecords(0);
    setListWords([]);
    getInfo();
  }, [showNotes]);

   const handlerSearch = (q = null, reload = false) => {
    setTotalRecords(0);
    setQuery(q);
    setListWords([]);
    setNextResults(0);
    if (reload) getInfo();
  };

  useEffect(() => {
    const getIp = async () => {
      try {
        const res = await fetch(
          "https://ipgeolocation.abstractapi.com/v1/?api_key=fdbbbaefc0114c39afb9109fbf3024cc"
        );
        const ipObj = await res.json();
        setIp(ipObj.ip_address);
      } catch {
        console.log("error IP");
      }
    };
    getIp();
  }, []);

  const getInfo = async (q = null) => {
    try {
      setLoading(true);
      let res: any = {};
      if (showNotes) {
        res = await fetch(`${URL_API}/note/search`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(q),
        });
        res = await res.json();

        res = res.map((item: any) => {
          return {
            ...item,
            hideAllText: true,
          };
        });
      } else {
        const data = { q: q || query, skip: nextResults, limit: limitResult };
        if (data.q && listWords.length == 0) {
          data.skip = 0;
        }

        res = await fetch(`${URL_API}/word/search`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        res = await res.json();
        const tWords = res.totalWords;
        setTotalRecords(tWords);
        const words = res.words.map((item: any) => {
          return {
            ...item,
            hideAllText: true,
          };
        });

        if (listWords.length > 0 && data.skip > 0) {
          res = [...listWords, ...words];
          setTotalShowRecords(limitResult * (data.skip + 1));
        } else {
          res = words;
          setTotalShowRecords(words.length);
        }
      }

      setListWords(res);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  return {
    listWords,
    setListWords,
    showNotes,
    setShowNotes,
    nextResults,
    setNextResults,
    ip,
    setIp,
    totalRecords,
    setTotalRecords,
    totalShowRecords,
    setTotalShowRecords,
    query,
    setQuery,
    limitResult,
    setLimitResult,
    loading,
    setLoading,
    error,
    setError,
    getInfo,
    handlerSearch
  };
}
export default useStateWords;
