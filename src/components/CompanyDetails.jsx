import { useState, useEffect } from "react";
import { companyTypes, industryList } from "../assets/constants";
import { useForm } from "react-hook-form";
import axios from "axios";

const CompanyDetails = () => {
  const [compTypes, setCompTypes] = useState([]);
  const [industries, setIndustries] = useState([]);
  const [compDetails, setCompDetails] = useState({});
  const token = sessionStorage.getItem("token") || "";
  const userCompany = sessionStorage.getItem("userCompanyDetails");
  const userCompanyDetails = userCompany ? JSON.parse(userCompany) : {};

  const {
    register,
    handleSubmit,
    reset,
    formState: {},
  } = useForm();

  useEffect(() => {
    setCompTypes(companyTypes || []);
    setIndustries(industryList || []);
    userCompanyDetails && setCompDetails(userCompanyDetails);
  }, []);

  useEffect(() => {
    reset(compDetails);
  }, [compDetails]);

  const onSubmit = (data) => {
    axios
      .post("http://localhost:8085/insertUpdateCompany", { ...data })
      .then((res) => {
        if (res.data.status) {
          setCompDetails(res?.data?.userDetails?.[0] || {});
          alert(res.data.message);
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="d-flex justify-content-center">
      <div>
        <h2>Company Details :</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="name">Company Name:</label>
            <input
              type="text"
              placeholder="Enter Company Name"
              className="form-control"
              name="name"
              {...register("name")}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="size">Company Size</label>
            <input
              type="number"
              placeholder="Enter Company Size"
              className="form-control"
              min="0"
              name="size"
              {...register("size")}
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="type">Choose type:</label>
            <select
              className="form-control"
              id="type"
              name="type"
              {...register("type")}
            >
              <option value="">Choose a type</option>
              {compTypes.map((type) => {
                return <option value={type}>{type}</option>;
              })}
            </select>
          </div>
          <div className="form-group mb-3">
            <label htmlFor="industry">Choose industry:</label>

            <select
              className="form-control"
              id="industry"
              name="industry"
              {...register("industry")}
            >
              <option value="">Choose a industry</option>
              {industries.map((industry) => {
                return <option value={industry}>{industry}</option>;
              })}
            </select>
          </div>
          <input
            type="hidden"
            name="user_id"
            value={token}
            {...register("user_id")}
          />
          <button className="btn btn-info" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CompanyDetails;
