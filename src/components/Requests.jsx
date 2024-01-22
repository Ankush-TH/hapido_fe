import { useEffect, useState } from "react";
import axios from "axios";
import RequestRow from "./RequestRow";

const Requests = (props) => {
  const [requestList, setRequestList] = useState([]);
  const userCompany = sessionStorage.getItem("userCompanyDetails");
  const userCompanyDetails = userCompany ? JSON.parse(userCompany) : {};

  const fetchReceivedRequests = async (comp_id = null) => {
    if (comp_id) {
      await axios
        .get("http://localhost:8085/getReceivedRequests/" + comp_id)
        .then((res) => {
          if (res?.data?.status) {
            setRequestList(res?.data?.details || []);
          } else {
            console.warn(res?.data?.message);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    if (userCompanyDetails) {
      fetchReceivedRequests(userCompanyDetails?.id);
    }
  }, []);

  return (
    <>
      <div class="container">
        <h2>Requests Received :</h2>
        <table class="table table-hover">
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
            {requestList?.length ? (
              requestList.map((comp, index) => {
                return (
                  <RequestRow
                    comp={comp}
                    index={index}
                    myCompDetail={userCompanyDetails}
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

export default Requests;
