import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleAddProduct = async () => {
    console.log(name, price, category, company);
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    let result = await fetch("http://localhost:3000/add-product", {
      method: "post",
      body: JSON.stringify({ name, price, category, company, userId }),
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    console.log(result);

    if (!name || !price || !category || !company) {
      setError(true);
      return false;
    }
    if (result) {
      navigate("/");
    }
  };
  return (
    <div className="add-product">
      <h1 className="heading">Add Product</h1>
      <input
        className="inputBox"
        type="text"
        placeholder="Enter product name"
        value={name}
        onChange={(evt) => setName(evt.target.value)}
      />
      {error && !name && (
        <span className="invalid-input">Enter valid name</span>
      )}
      <input
        className="inputBox"
        type="text"
        placeholder="Enter price"
        value={price}
        onChange={(evt) => setPrice(evt.target.value)}
      />
      {error && !price && <span className="invalid-input">Enter Price</span>}
      <input
        className="inputBox"
        type="text"
        placeholder="Enter category"
        value={category}
        onChange={(evt) => setCategory(evt.target.value)}
      />
      {error && !category && (
        <span className="invalid-input">Enter valid category</span>
      )}
      <input
        className="inputBox"
        type="text"
        placeholder="Enter comapany name"
        value={company}
        onChange={(evt) => setCompany(evt.target.value)}
      />
      {error && !company && (
        <span className="invalid-input">Enter company name</span>
      )}
      <button onClick={handleAddProduct} className="signUpButton">
        Add Product{" "}
      </button>
    </div>
  );
};

export default AddProduct;
