import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "../Hooks/useDebounce";

const fetchProducts = async (query) => {
  if (!query) return { products: [] };
  const res = await fetch(`https://dummyjson.com/products/search?q=${query}`);
  if (!res.ok) throw new Error("Error fetching products");
  return res.json();
};

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", debouncedSearchTerm],
    queryFn: () => fetchProducts(debouncedSearchTerm),
  });

  console.log(searchTerm.length);

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search products..."
      />
      {isLoading && <p>is loading ...</p>}
      {isError && <p>something is wrong, please try again.</p>}
      {debouncedSearchTerm && data?.products?.length === 0 && (
        <p>No product found</p>
      )}
      <ul>
        {data?.products?.map((product) => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
