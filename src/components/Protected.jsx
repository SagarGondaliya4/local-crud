import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Protected = ({ Comp }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const loginData = JSON.parse(localStorage.getItem("user"));
    if (!loginData) {
      navigate("/login");
    }
  }, []);
  return (
    <div>
      <Comp />
    </div>
  );
};

export default Protected;
