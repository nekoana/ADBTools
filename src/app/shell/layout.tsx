"use client";

import { SearchContext } from "@/context/SearchContext";
import React from "react";
import SearchInput from "@/components/search-input";
import { motion } from "framer-motion";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [searchText, setSearchText] = React.useState("");

  return (
    <>
      <div className="fixed w-full top-0 z-50 pointer-events-none">
        <motion.div
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ease: "easeInOut", duration: 1, delay: 0.4 }}
        >
          <SearchInput
            setSearchText={setSearchText}
            className="w-64 mx-auto pointer-events-auto"
          />
        </motion.div>
      </div>
      <SearchContext.Provider value={searchText}>
        <div className="mx-auto p-4 grid [grid-template-columns:repeat(auto-fill,minmax(9rem,1fr))] gap-4">
          {children}
        </div>
      </SearchContext.Provider>
    </>
  );
}
