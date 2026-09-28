import { useEffect, useState } from "react";
import SearchItem from "./SearchItem";
import { api } from "@/server/api";
import useDebounce from "@/hooks/useDebounce";
import { Product } from "@/types/product";

interface SearchResultsProps {
  searchTerm: string;
}

const SearchResults = ({ searchTerm }: SearchResultsProps) => {
  const [searchResults, setSearchResults] = useState<Product[] | undefined>(
    undefined,
  );
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const debouncedSearchTerm = useDebounce(searchTerm);

  useEffect(() => {
    async function fetchSearchResults() {
      if (!debouncedSearchTerm.trim()) {
        setSearchResults([]);
        return;
      }
      setLoading(true);
      setError(null);

      try {
        const response = await api.post("/products/search", {
          debouncedSearchTerm,
        });

        setSearchResults(response.data.products);
      } catch (error) {
        setError("Error fetching results...");
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchSearchResults();
  }, [debouncedSearchTerm]);

  if (!searchResults) return;
  if (error) return <p>{error}</p>;
  if (loading) return <p>Loading results...</p>;

  if (searchResults?.length === 0 && debouncedSearchTerm)
    return <p>Empty products list!</p>;

  return (
    <div>
      {searchResults?.map((item) => {
        return (
          <SearchItem
            key={item.id}
            item={item}
            debouncedSearchTerm={debouncedSearchTerm}
          />
        );
      })}
    </div>
  );
};

export default SearchResults;
