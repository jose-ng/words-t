"use client"
import React, { useState } from "react";
import styles from "./Search.module.scss";

function Search({ onSearch }: any) {
  const [searchForm, setSearchForm] = useState({ search: "" });

  const handlerSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    setSearchForm({
      ...searchForm,
      [name]: value,
    });

    onSearch(value);
  };

  return (
    <section className={styles.SearchContainer}>
      <div>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          autoComplete="Off"
          name="search"
          placeholder="Search a word"
          value={searchForm.search}
          onChange={handlerSearch}
        ></input>
        {searchForm.search && (
          <button
            type="button"
            onClick={() => {
              setSearchForm({
                ...searchForm,
                search: "",
              });
              onSearch("", true);
            }}
          >
            x
          </button>
        )}
      </div>
    </section>
  );
}

export { Search };
