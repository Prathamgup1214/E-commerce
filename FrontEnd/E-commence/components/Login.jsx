import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  });

  const handleLogin = async () => {
    console.log(email, password);
    let result = await fetch("http://localhost:3000/login", {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json(); //readstream converted to json
    if (result.auth) {
      localStorage.setItem("user", JSON.stringify(result.user));
      localStorage.setItem("token", JSON.stringify(result.auth));

      navigate("/");
    } else {
      alert("Please Enter correct details");
    }
  };
  return (
    <div className="login">
      <h1 className="heading">Login</h1>
      <input
        className="inputBox"
        type="text"
        placeholder="Enter Email"
        value={email}
        onChange={(evt) => setEmail(evt.target.value)}
      />
      <input
        className="inputBox"
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(evt) => setPassword(evt.target.value)}
      />
      <button onClick={handleLogin} className="signUpButton" type="button">
        SignUp
      </button>
    </div>
  );
};

export default Login;
