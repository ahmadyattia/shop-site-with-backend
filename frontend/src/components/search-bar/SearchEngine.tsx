import React, { useState, useRef } from "react";
import styles from "@/styles/search-bar/SearchEngine.module.css";
import SearchResults from "./SearchResults";
import useClickOutside from "@/hooks/useClickOutside";

const SearchEngine = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const containerRef = useRef<HTMLElement>(null);

  useClickOutside(setIsOpen, containerRef);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value);
  }

  return (
    <search id={styles.searchBar} ref={containerRef}>
      <input
        id={styles.searchInput}
        type="text"
        placeholder="Search..."
        aria-label="Search..."
        role="search"
        onChange={handleChange}
        onFocus={() => setIsOpen(true)}
        onClick={() => setIsOpen(true)}
        value={searchTerm}
      />
      {isOpen && (
        <div id={`${styles.searchDropdown}`}>
          <SearchResults searchTerm={searchTerm} />
        </div>
      )}
    </search>
  );
};

export default SearchEngine;
