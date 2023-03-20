import React from 'react'
import { Link } from 'react-router-dom';


import { BrowserRouter, Route, Routes } from "react-router-dom";
import EmpListing from "../EmpListing";
import EmpCreate from "../EmpCreate";

import EmpEdit from "../EmpEdit";
const Home = () => {
  return (
    <div className="container w-100">
      <div className="p-3 bg-success text-dark bg-opacity-50 d-flex justify-content-between">
        <div className="h1">Employee Dashboard</div>
        <div>
          <Link to="employee/create" className="btn btn-success bg-success">
            Add New Employee
          </Link>
        </div>
      </div>

      <div className="w-100">
        <Routes>
          <Route path="/" element={<EmpListing />}></Route>

          <Route path="/employee/create" element={<EmpCreate />}></Route>

          <Route path="/employee/edit/:id" element={<EmpEdit />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default Home