import React, { useMemo } from "react";
import styles from "@/styles/search-bar/SearchItem.module.css";
import { Link } from "react-router-dom";
import { highlightSearchTerm } from "@/utils/highlightSearchTerm";
import { Product } from "@/types/product";

interface SearchItemProps {
  item: Product;
  debouncedSearchTerm: string;
}

const SearchItem = ({ item, debouncedSearchTerm }: SearchItemProps) => {
  // useMemo prevents re-splitting the string unless the item or query changes
  const parts = useMemo(() => {
    return highlightSearchTerm(item.title, debouncedSearchTerm);
  }, [item.title, debouncedSearchTerm]);

  return (
    <Link
      className={styles.searchItem}
      to={`/shop/${item.category.slug}/${item.slug}?product_id=${item.id}`}
      aria-label={`Result: ${item.title}`}
    >
      {/* aria-hidden hides the fragmented text blocks from screen readers */}
      <span aria-hidden="true">
        {parts.map((part, index) =>
          part.toLowerCase() === debouncedSearchTerm.toLowerCase() ? (
            <mark key={`${part}-${index}`}>{part}</mark>
          ) : (
            <React.Fragment key={`${part}-${index}`}>{part}</React.Fragment>
          ),
        )}
      </span>
    </Link>
  );
};

export default SearchItem;
