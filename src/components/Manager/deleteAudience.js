import React, { useState, useEffect } from "react";

import axios from "axios";

const DeleteAudience = () => {
  const [audiences, setAudiences] = useState([]);

  const getAudiences = async () => {
    const getAllAudiences = await axios.get(
      "http://localhost:3000/manager/getAudiences"
    );
    setAudiences(getAllAudiences.data);
  };
  useEffect(() => {
    getAudiences();
  }, []);

  return (
    <div>

    </div>
  );
};

export default DeleteAudience;
