import { useCallback, useContext, useEffect, useState } from "react";
import { SearchContext } from "@/context/SearchContext";

function useSearchText(debounceSeconds: number = 1000) {
  const [searchText, setSearchText] = useState("");
  const text = useContext(SearchContext);

  const updateSearchText = useCallback(() => {
    const timeoutId = setTimeout(() => {
      setSearchText(text);
    }, debounceSeconds);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [text, debounceSeconds]);

  useEffect(() => {
    return updateSearchText();
  }, [updateSearchText]);

  return searchText;
}

export default useSearchText;
