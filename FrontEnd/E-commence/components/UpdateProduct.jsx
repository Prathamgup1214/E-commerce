import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getProductDetails();
  }, []);

  const getProductDetails = async () => {
    let result = await fetch(`http://localhost:3000/product/${params._id}`, {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    // console.warn(result);
    setName(result.name);
    setPrice(result.price);
    setCategory(result.category);
    setCompany(result.company);
  };

  const handleUpdateButton = async () => {
    console.warn(name, price, category, company);
    let result = await fetch(`http://localhost:3000/product/${params._id}`, {
      method: "put",
      body: JSON.stringify({ name, price, category, company }),
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    // console.log(result);
    navigate("/");
  };

  return (
    <div className="add-product">
      <h1 className="heading">Update Product</h1>
      <input
        className="inputBox"
        type="text"
        placeholder="Enter product name"
        value={name}
        onChange={(evt) => setName(evt.target.value)}
      />

      <input
        className="inputBox"
        type="text"
        placeholder="Enter price"
        value={price}
        onChange={(evt) => setPrice(evt.target.value)}
      />

      <input
        className="inputBox"
        type="text"
        placeholder="Enter category"
        value={category}
        onChange={(evt) => setCategory(evt.target.value)}
      />

      <input
        className="inputBox"
        type="text"
        placeholder="Enter comapany name"
        value={company}
        onChange={(evt) => setCompany(evt.target.value)}
      />

      <button onClick={handleUpdateButton} className="signUpButton">
        Update Product{" "}
      </button>
    </div>
  );
};
export default UpdateProduct;
