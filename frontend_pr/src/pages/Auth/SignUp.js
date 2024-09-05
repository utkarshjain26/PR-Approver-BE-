import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ApiMutations } from "../../api/query";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { mutate: getSignup } = ApiMutations.useGetSignup();

  const register = (e) => {
    e.preventDefault();
    const payload = {
      username: username,
      email: email,
      password: password,
    };
    getSignup(
      { payload },
      {
        onSuccess: () => {
          setUsername("");
          setEmail("");
          setPassword("");
          alert("Registration successful!");
          navigate(`/login`)
        },
        onError: () => {
          alert("Registraiton failed!");
        },
      }
    );
  };

  return (
    <div className="register-page">
      <h2 className="register-heading">Create your account</h2>
      <div class="register-container">
        <form className="register-form" onSubmit={register}>
          <label for="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputText"
            aria-describedby="emailHelp"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label for="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label for="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="home-button" type="submit">
            Register
          </button>
        </form>
        <div class="login-link">
          Already have an account?{" "}
          <Link to={"/login"} className="login-link-line">
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
