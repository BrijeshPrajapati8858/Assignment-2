import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import EmpDetail from "./EmpDetail";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const options = {
  indexAxis: "x",
  elements: {
    bar: {
      borderWidth: 3,
      height:1,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "right",
    },
    title: {
      display: true,
      text: "Employee's working status",
    },
  },
};

const EmpListing = () => {
  const [empdata, empdatachange] = useState(null);

  const [arr1, setArr1] = useState();
  const [arr2, setArr2] = useState();
  const [arr3, setArr3] = useState();
  const [Id, setId] = useState();



  const [data, setData] = useState({
    labels: ["Contract", "Remote", "Full time"],
    datasets: [
      {
        label: "Dataset 1",
        data: [],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(25, 90, 13, 0.5)",
      },
      {
        label: "Dataset 2",
        data: [],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Dataset 3",
        data: [],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  });

  const LoadDetail = (id) => {
  

    setId(id);
  };

  const fetchUsers = () => {
    axios
      .get("http://localhost:4000/api/v2/emplist")
      .then((response) => {
        empdatachange(response.data.users);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    const getUsers = async () => {
      const users = await fetchUsers();
    };

    getUsers();
  }, []);

  useEffect(() => {
    Data();

       setData({
         labels: ["Contract", "Remote", "Full time"],
         datasets: [
           {
             label: "Dataset ID",
             data: [arr2, arr1,arr3 ],
             borderColor: "rgb(255, 99, 132)",
             backgroundColor: "rgba(169, 632, 0.5)",
           },
       
         ],
       });
  }, [empdata]);

  const Data = () => {
    if (empdata) {
      const remote = empdata.filter(function num(e) {
        return e.status === "remote";
      });
      setArr1(remote.length);

      const contract = empdata.filter(function num(e) {
        return e.status === "contract";
      });
      setArr2(contract.length);
      const fullTime = empdata.filter(function num(e) {
        return e.status === "full-time";
      });
      setArr3(fullTime.length);
    }
 
  };



  return (
    <>
      <div className=" d-flex gap-2 col-lg-12 mt-4">
        <table className="table table-bordered mb-4 h-75">
          <thead className="bg-dark text-white">
            <tr>
              <td>ID</td>
              <td>Name</td>
              <td>Addrees</td>
              <td>Status</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {empdata &&
              empdata.map((item) => (
                <tr key={item._id}>
                  <td>{item.emp_id}</td>
                  <td>{item.name}</td>
                  <td>{item.location}</td>
                  <td>{item.status}</td>
                  <td>
                    <a
                      onClick={() => {
                        LoadDetail(item._id);
                      }}
                      className="btn btn-light"
                    >
                      <i class="fa-solid fa-right-to-bracket"></i>
                    </a>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="col-lg-4">
          {Id ? (
            <EmpDetail id={Id} />
          ) : (
            <div class="card text-dark bg-light  h-75">
              <div class="card-header">User details</div>
              <div class="card-body">
                <h5 class="card-title">Info card title</h5>
                <p class="card-text">
                  The standard Lorem Ipsum passage, used since the 1500s "Lorem
                  ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="d-flex mt-4 pt-4 gap-4 bg-light">
        <div className="col-lg-3 d-flex align-center m-auto">
          <h2>Employee's working status</h2>
        </div>
        <div style={{ width: "100%", height: "70vh" }} className="col-lg-9">
          <Bar data={data} options={options} />
        </div>
      </div>
    </>
  );
};

export default EmpListing;
