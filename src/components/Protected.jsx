import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Protected = (props) => {
  const { Component } = props;
  const navigate = useNavigate();
  useEffect(() => {
    let token = sessionStorage.getItem("token") || "";
    if (!token) {
      navigate("/login");
    }
  });
  return (
    <>
      <Navbar />
      <Component />
    </>
  );
};

export default Protected;
