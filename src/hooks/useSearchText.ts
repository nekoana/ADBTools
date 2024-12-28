import { useCallback, useContext, useEffect, useState } from "react";
import { SearchContext } from "@/context/SearchContext";

function useSearchText(debounce: number = 1000) {
  const [searchText, setSearchText] = useState("");
  const text = useContext(SearchContext);

  const updateSearchText = useCallback(() => {
    const timeoutId = setTimeout(() => {
      setSearchText(text);
    }, debounce);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [text, debounce]);

  useEffect(() => {
    return updateSearchText();
  }, [updateSearchText]);

  return searchText;
}

export default useSearchText;
