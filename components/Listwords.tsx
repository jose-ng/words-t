import React, { useEffect, useState } from "react";
import URL_API from "../utils/env";

function Listwords() {
  const [listWords, setListWords] = useState([]);
  useEffect(() => {
    const getInfo = async () => {
      try {
        let res: any = await fetch(`${URL_API}/word/search`);
        res = await res.json();
        setListWords(res);
      } catch (err) {}
    };
    getInfo();
  }, []);
  return (
    <ul>
      {listWords.length > 0 &&
        listWords.map(({ _id, text_es, text_en }: any) => {
          return <li key={_id}>{text_en} - {text_es} <button type="button">Delete</button></li>;
        })}
    </ul>
  );
}

export default Listwords;
