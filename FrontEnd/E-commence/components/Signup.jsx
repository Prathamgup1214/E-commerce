import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmai] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/"); // if user is already login then we are not able to go to signup page.
    }
  });

  const collectData = async () => {
    console.log(name, email, password);
    let result = await fetch("http://localhost:3000/register", {
      method: "post",
      body: JSON.stringify({ name, email, password }), // convert to JSON string
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json(); // convert back
    console.warn(result);
    localStorage.setItem("user", JSON.stringify(result.result)); // to store result in local storage
    localStorage.setItem("token", JSON.stringify(result.auth));
    navigate("/");
  };
  return (
    <div className="register">
      <h1 className="heading">Register</h1>

      <input
        className="inputBox"
        type="text"
        value={name}
        onChange={(evt) => setName(evt.target.value)}
        placeholder="Enter Your Name"
      />
      <input
        className="inputBox"
        type="text"
        value={email}
        onChange={(evt) => setEmai(evt.target.value)}
        placeholder="Enter Your Email"
      />
      <input
        className="inputBox"
        type="password"
        value={password}
        onChange={(evt) => setPassword(evt.target.value)}
        placeholder="Enter Your Password"
      />
      <button onClick={collectData} className="signUpButton" type="button">
        SignUp
      </button>
    </div>
  );
};

export default Signup;
