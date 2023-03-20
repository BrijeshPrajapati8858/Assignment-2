
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


const EmpDetail = ({id}) => {
    const navigate = useNavigate();
 const [empdata, empdatachange] = useState({});



const [coordinates, setCoordinates] = useState({
  lat: null,
  lng: null,
});
const zoom = 16; // 15 is ideal







    useEffect(() => {
        axios.get(`http://localhost:4000/api/v2/emp/${id}`).then((res)=>{
            empdatachange(res.data.user);
            console.log(empdata)
        })
       .catch((err) => {
            console.log(err.message);
        })
    }, [id]);

      const LoadEdit = (id) => {
        navigate("/employee/edit/" + id);
      };
      const Removefunction = (id) => {
        if (window.confirm("Do you want to remove?")) {
          axios({
            method: "DELETE",
            url: "http://localhost:4000/api/v2/emp/" + id,
          })
            .then((res) => {
              alert("Removed successfully.");
              window.location.reload();
            })
            .catch((err) => {
              console.log(err.message);
            });
        }
      };

    return (
      <div>
        {/* <div className="row">
                <div className="offset-lg-3 col-lg-6"> */}
        {id && id ? (
          <div className="container w-100 ">
            <div className="card row" style={{ textAlign: "left" }}>
              <div className="card-title bg-dark text-white text-center">
                <h2>Employee Details</h2>
              </div>
              <div className="card-body"></div>

              <div className="text-capitalize">
                <div className="d-flex justify-content-between">
                  <h5>Employee Id :</h5>
                  <h5>{empdata.emp_id}</h5>
                </div>
                <div className="d-flex justify-content-between">
                  <h5>The Employee name is :</h5>
                  <h5>{empdata.name}</h5>
                </div>
                <div className="d-flex justify-content-between">
                  {" "}
                  <h5>Status is : </h5>
                  <h5>{empdata.status}</h5>
                </div>
                <div className="d-flex justify-content-between">
                  {" "}
                  <h5>Department is :</h5>
                  <h5> {empdata.department}</h5>
                </div>
                <div className="d-flex justify-content-between">
                  {" "}
                  <h5>Age is : </h5>
                  <h5>{empdata.age}</h5>
                </div>
                <div className="d-flex justify-content-between">
                  {" "}
                  <h5>Addrees is :</h5>
                  <h5> {empdata.location}</h5>
                </div>
                <div className="d-flex">
                  <a
                    onClick={() => {
                      LoadEdit(id);
                    }}
                    className="btn btn-success col-sm-3"
                  >
                    <i class="fa-solid fa-pen-to-square"></i>
                  </a>
                  <a
                    onClick={() => {
                      Removefunction(id);
                    }}
                    className="btn btn-danger col-sm-3"
                  >
                    <i class="fa-solid fa-trash"></i>
                  </a>
                </div>
              </div>
              <div className="mt-4 h4 bg-dark text-white p-1">Employee Location</div>
              <iframe
                src={`https://maps.google.com/maps?q=${empdata.latitude},${empdata.longitude}&z=${zoom}&output=embed`}
                width="320"
                height="280"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="google map"
              ></iframe>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
}

export default EmpDetail;