import axios from "axios";
import { useEffect, useState } from "react";

const RequestRow = (props) => {
  const [status, setStatus] = useState("");
  const handleRequest = (req_id = null, status = null) => {
    if (req_id) {
      axios
        .put("http://localhost:8085/updateRequest/" + req_id, { status })
        .then((res) => {
          if (res.data.status) {
            setStatus(res?.data?.details?.[0]?.status);
            alert(res.data.message);
          } else {
            alert(res.data.message);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    if (props?.comp?.status) {
      setStatus(props?.comp?.status);
    }
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
          {status != "pending" ? (
            status.toUpperCase()
          ) : (
            <div>
              <button
                className="btn btn-sm mr-2"
                onClick={() =>
                  handleRequest(props?.comp?.connection_id, "accepted")
                }
              >
                Accept
              </button>
              <button
                className="btn btn-default btn-sm"
                onClick={() =>
                  handleRequest(props?.comp?.connection_id, "rejected")
                }
              >
                Reject
              </button>
            </div>
          )}
        </td>
      </tr>
    </>
  );
};

export default RequestRow;
