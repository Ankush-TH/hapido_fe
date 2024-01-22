import { useEffect, useState } from "react";
import axios from "axios";
import CompanyRow from "./CompanyRow";

const Dashboard = (props) => {
  const [companyList, setCompanyList] = useState([]);
  const [compDetails, setCompDetails] = useState({});
  const token = sessionStorage.getItem("token") || "";

  const fetchCompDetails = async (user_id = null) => {
    if (user_id) {
      await axios
        .get("http://localhost:8085/getMyCompany/" + token)
        .then((res) => {
          if (res?.data?.status) {
            sessionStorage.setItem(
              "userCompanyDetails",
              JSON.stringify(res?.data?.details?.[0] || "")
            );
            setCompDetails(res?.data?.details?.[0] || {});
          } else {
            console.log(res?.data?.message || "");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const fetchCompanies = async () => {
    await axios
      .get(
        "http://localhost:8085/getCompanies/" +
          token +
          "/" +
          (compDetails?.id || 0)
      )
      .then((res) => {
        console.log("RESSSS:", res);
        if (res.data.status) {
          setCompanyList(res?.data?.details);
        } else {
          console.log(res.data.message);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchCompDetails(token);
  }, []);

  useEffect(() => {
    fetchCompanies();
  }, [compDetails]);

  return (
    <>
      <div className="container">
        <h2>Companies List :</h2>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Name</th>
              <th>Size</th>
              <th>Type</th>
              <th>Industry</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {companyList?.length ? (
              companyList.map((comp, index) => {
                return (
                  <CompanyRow
                    comp={comp}
                    index={index}
                    myCompDetail={compDetails}
                  />
                );
              })
            ) : (
              <tr>
                <td colSpan={6}>No Records Found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Dashboard;
