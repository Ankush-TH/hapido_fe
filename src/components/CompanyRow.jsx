import axios from "axios";
import { useEffect, useState } from "react";

const CompanyRow = (props) => {
  const [status, setStatus] = useState("");
  const handleRequest = (comp_id = null) => {
    if (props?.myCompDetail?.id) {
      if (comp_id) {
        axios
          .post("http://localhost:8085/requestCompany", {
            from_comp: props?.myCompDetail?.id,
            to_comp: comp_id,
          })
          .then((res) => {
            if (res.data.status) {
              setStatus("pending");
              alert(res.data.message);
            } else {
              alert(res.data.message);
            }
          })
          .catch((err) => console.log(err));
      }
    } else {
      alert("Please add your company details to send request!");
    }
  };

  const fetchStatus = async () => {
    await axios
      .get(
        "http://localhost:8085/getCompanyConnection/" +
          (props?.myCompDetail?.id || 0) +
          "/" +
          props?.comp?.id
      )
      .then((res) => {
        if (res.data.status) {
          setStatus(res?.data?.details?.[0]?.status);
        } else {
          console.log(res.data.message);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  return (
    <>
      <tr>
        <td>{props?.index + 1}</td>
        <td>{props?.comp?.name}</td>
        <td>{props?.comp?.size}</td>
        <td>{props?.comp?.type}</td>
        <td>{props?.comp?.industry}</td>
        <td>
          {status ? (
            status.toUpperCase()
          ) : (
            <button
              className="btn btn-secondary"
              onClick={() => handleRequest(props?.comp?.id)}
            >
              Send Request
            </button>
          )}
        </td>
      </tr>
    </>
  );
};

export default CompanyRow;
