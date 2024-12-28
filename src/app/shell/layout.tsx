"use client";

import { SearchContext } from "@/context/SearchContext";
import React from "react";
import SearchInput from "@/components/search-input";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [searchText, setSearchText] = React.useState("");

  return (
    <>
      <div className="fixed w-64 top-0 z-50 left-1/2 transform -translate-x-1/2">
        <SearchInput setSearchText={setSearchText} />
      </div>
      <SearchContext.Provider value={searchText}>
        <div className="mx-auto p-4 grid [grid-template-columns:repeat(auto-fill,minmax(9rem,1fr))] gap-4">
          {children}
        </div>
      </SearchContext.Provider>
    </>
  );
}
