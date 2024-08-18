import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { HiMiniPencilSquare } from "react-icons/hi2";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch("http://localhost:3000/products", {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    setProducts(result);
  };

  const handleDeleteButton = async (_id) => {
    let result = await fetch(`http://localhost:3000/product/${_id}`, {
      method: "Delete",
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    if (result) {
      getProducts();
    }
  };

  const handleSearch = async (event) => {
    let key = event.target.value;
    if (key) {
      let result = await fetch(`http://localhost:3000/search/${key}`);
      result = await result.json();
      setProducts(result);
    } else {
      getProducts();
    }
  };

  return (
    <div className="product-list">
      <h1>Product List</h1>
      <input
        type="text"
        aria-label="search"
        className="search-box"
        placeholder="🔍 Search Products"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        onChange={handleSearch}
      />
      <ul>
        <li>S.No</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>Company</li>
        <li>Operations</li>
      </ul>
      {Array.isArray(products) &&
        products.length > 0 &&
        products?.map((item, index) => (
          <ul key={item._id}>
            <li>{index + 1}</li>
            <li>{item.name}</li>
            <li>${item.price}</li>
            <li>{item.category}</li>
            <li>{item.company}</li>
            <li>
              <button
                onClick={() => handleDeleteButton(item._id)}
                className="delete-btn"
              >
                <MdDelete />
              </button>
              /
              <Link to={`/update/${item._id}`}>
                <HiMiniPencilSquare />
              </Link>
            </li>
          </ul>
        ))}
    </div>
  );
};

export default ProductList;
