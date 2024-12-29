"use client";

import Shell from "@/app/shell/shell";
import { motion } from "framer-motion";
import SearchInput from "@/components/search-input";
import React from "react";
import { SearchContext } from "@/context/SearchContext";

export default function Page() {
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
        <Shell />
      </SearchContext.Provider>
    </>
  );
}
