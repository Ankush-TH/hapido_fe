import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useEffect } from "react";

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    let token = sessionStorage.getItem("token") || "";
    if (token) {
      navigate("/");
    }
  });

  const onSubmit = (data) => {
    console.log("SubmittedData:", data);
    axios
      .post("http://localhost:8085/register", data)
      .then((res) => {
        console.log("RESPONSE:", res);
        if (res.data.status) {
          navigate("/login");
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div className="d-flex justify-content-center">
        <div>
          <h2>Register</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                placeholder="Enter Email"
                name="email"
                className="form-control"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="text-danger">This field is required</span>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="password">Password</label>
              <input
                type="text"
                placeholder="Enter Password"
                name="password"
                className="form-control"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <span className="text-danger">This field is required</span>
              )}
            </div>
            <button className="btn" type="submit">
              Register
            </button>
            <br />
            <Link to="/login">Go to Login</Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
