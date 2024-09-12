import { useEffect, useState } from "react";
import ProductCard from "./Components/Card";

function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chosenCategory, setChosenCategory] = useState("All");
  const [sortType, setSortType] = useState(""); 
  useEffect(() => {
    const url =
      chosenCategory === "All"
        ? "https://dummyjson.com/products"
        : `https://dummyjson.com/products/category/${chosenCategory}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [chosenCategory]);

  useEffect(() => {
    fetch("https://dummyjson.com/products/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);


  useEffect(() => {
    if (sortType && products.length > 0) {
      const sortedProducts = [...products].sort((a, b) => {
        if (sortType === "price") {
          return a.price - b.price; 
        } else if (sortType === "title") {
          return a.title.localeCompare(b.title);}
        return 0;
      });
      setProducts(sortedProducts); 
    }
  }, [sortType]); 
  return (
    <div className="container mx-auto">
      {loading ? (
        <h1 className="text-center text-3xl">Loading...</h1>
      ) : (
        <div>
        <div className="flex justify-around">
          <div className="my-4">
            <label htmlFor="category" className="mr-2 bg-gray font-semibold">Select Categories:</label>
            <select
              id="category"
              value={chosenCategory}
              onChange={(e) => setChosenCategory(e.target.value)}
              className="border bg-gray-300 px-4 py-2"
            >
              <option value="All">All</option>
              {categories.map((category) => (
                <option value={category.slug} key={category.slug}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>


          <div className="flex my-4">
            <button
              className={`mr-2 px-4 py-2 ${sortType === "price" ? "bg-gray-300" : ""}`}
              onClick={() => setSortType("price")}
            >
              Sort by Price
            </button>
            <button
              className={`px-4 py-2 ${sortType === "title" ? "bg-gray-300" : ""}`}
              onClick={() => setSortType("title")}
            >
              Sort by Title
            </button>
          </div>
          </div>
          <div className="flex flex-wrap">
            {products.map((data) => (
              <ProductCard info={data} key={data.id} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;
