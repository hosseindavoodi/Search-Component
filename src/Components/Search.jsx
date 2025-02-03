import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

const fetchProducts = async (query) => {
  if (!query) return { products: [] };
  const res = await fetch(`https://dummyjson.com/products/search?q=${query}`);
  if (!res.ok) throw new Error("Error fetching products");
  return res.json();
};

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data } = useQuery({
    queryKey: ["products", searchTerm],
    queryFn: () => fetchProducts(searchTerm),
  });

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search products..."
      />
      <ul>
        {data?.products?.map((product) => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
