import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EmpEdit = () => {
    const navigate = useNavigate();

    const { id } = useParams();

    //const [empdata, empdatachange] = useState({});

    useEffect(() => {
axios.get(`http://localhost:4000/api/v2/emp/${id}`).then((res)=>{
    console.log(res.data.user)
     setEmp_id(res.data.user.emp_id);
     namechange(res.data.user.name);
     agechange(res.data.user.age);
     statuschange(res.data.user.status);
     departmentchange(res.data.user.department);
     setLocation(res.data.user.location);
     setLongitude(res.data.user.longitude);
      setLatitude(res.data.user.latitude);
   
}
).catch((err) => {
            console.log(err.message);
        })
    }, []);

     const [emp_id, setEmp_id] = useState("");
     const [name, namechange] = useState("");

     const [age, agechange] = useState();
     const [status, statuschange] = useState("");
     const [department, departmentchange] = useState("");
     const [location, setLocation] = useState();
     const [longitude, setLongitude] = useState(null);
     const [latitude, setLatitude] = useState(null);

     const [validation, valchange] = useState("");
     const [toggle, setToggle] = useState(true);
     const [suggestion, setSuggestion] = useState("");

  
    const params = {
      access_key: "75d2bfa1554691688083a05fc7d45c8b",
      query: location,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "content-type": "application/json",
      },
    };

    const locationHandel = (e) => {
      axios
        .get("http://api.positionstack.com/v1/forward", { params })
        .then((response) => {
          console.log(response.data.data);
          setSuggestion(response.data.data);
          setToggle(true);
        })
        .catch((error) => {
          console.log(error);
        });
      setLocation(e);
    };
    const handlesubmit=(e)=>{
      e.preventDefault();
      const empdata = {
        emp_id,
        name,
        age,
        department,
        status,
        location,
        longitude,
        latitude,
      };
    axios({
        method:"PUT",
        url:"http://localhost:4000/api/v2/update/"+id,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "content-type": "application/json",
      },
      data: JSON.stringify(empdata),
    })
    .then((res) => {
      alert("Saved successfully.");
      navigate("/");
    })
    .catch((err) => {
      console.log(err.message);
    });
  };
    

    return (
      <div>
        <div className=" col-lg-12">
          <div className="offset-lg-3 col-lg-6">
            <form className="container" onSubmit={handlesubmit}>
              <div className="card" style={{ textAlign: "left" }}>
                <div className="card-title">
                  <h2>Employee Edit</h2>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label>ID</label>
                        <input
                          value={emp_id}
                          disabled="disabled"
                          className="form-control"
                        ></input>
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="form-group">
                        <label>Name</label>
                        <input
                          required
                          value={name}
                          onMouseDown={(e) => valchange(true)}
                          onChange={(e) => namechange(e.target.value)}
                          className="form-control"
                        ></input>
                        {name.length === 0 && validation && (
                          <span className="text-danger">Enter the name</span>
                        )}
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="form-group">
                        <label>Age</label>
                        <input
                          value={age}
                          onChange={(e) => agechange(e.target.value)}
                          className="form-control"
                        ></input>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label>Status</label>

                        <select
                          name="status"
                          value={status}
                          onChange={(e) => statuschange(e.target.value)}
                          className="form-control"
                          required
                        >
                          
                          <option value="">None</option>
                          <option value="remote">Remote</option>
                          <option value="full-time">Full-time</option>
                          <option value="contract">Contract</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label>Department</label>
                        <input
                          value={department}
                          onChange={(e) => departmentchange(e.target.value)}
                          className="form-control"
                        ></input>
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="form-group">
                        <label>Location</label>
                        <input
                          value={location}
                          onInput={(e) => locationHandel(e.target.value)}
                          className="form-control"
                        ></input>
                      </div>
                      {toggle === true ? (
                        <div>
                          {suggestion &&
                            suggestion.map((item) => (
                              <tr key={item._id}>
                                <a
                                  onClick={() => {
                                    setLocation(item.label);
                                    setLongitude(item.longitude);
                                    setLatitude(item.latitude);
                                    setToggle(false);
                                  }}
                                  className="btn btn-primary"
                                >
                                  {item.label}
                                </a>
                              </tr>
                            ))}{" "}
                        </div>
                      ) : (
                        " "
                      )}
                    </div>

                    <div className="col-lg-12">
                      <div className="form-group">
                        <button className="btn btn-success" type="submit">
                          Save
                        </button>
                        <Link to="/" className="btn btn-danger">
                          Back
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
}
 
export default EmpEdit;