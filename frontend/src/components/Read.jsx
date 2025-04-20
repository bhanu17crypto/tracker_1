import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Read = () => {
  const [data, setData] = useState();
  const [error, setError] = useState();

  async function handleDelete(id) {
    const response = await fetch(`http://localhost:5000/${id}`, {
      method: "DELETE",
    });

    const result1 = await response.json();
    if (!response.ok) {
      setError(result1.error);
    }
    if (response.ok) {
      console.log("deleted", response.ok);
      console.log("deleted", response.ok);
      setError("Deleted Successfully");
      setTimeout(() => {
        setError("");
        getData();
      }, 1000);
    }
  }

  async function getData() {
    const response = await fetch("http://localhost:5000");
    const result = await response.json();
    console.log("result..", result);
    if (!response.ok) {
      setError(result.error);
    }

    if (response.ok) {
      setData(result);
      setError("");
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container my-2">
      {error && <div class="alert alert-danger"> {error} </div>}
      <div className="row">
        {data?.map((ele) => (
          <div key={ele._id} className="col-3">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">{ele.name}</h5>
                <h6 class="card-subtitle mb-2 text-muted">{ele.email}</h6>
                <p class="card-text">{ele.age}</p>
                {/* <button class="card-link">Edit</button> */}
                {/* <a href="#" className="card-link">Edit</a> */}
                {/* <Link to={`/${ele._id}`}>Edit</Link> */}

                <div>
      <span><Link to={`/${ele._id}`}>Edit</Link></span>
      {/* Add space between buttons using CSS margin */}
      <span style={{ marginLeft: '10px' }}><Link class="card-link" onClick={() => handleDelete(ele._id)}>
                  Delete
                </Link></span>
    </div>
                <Link class="card-link" onClick={() => handleDelete(ele._id)}>
                  
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Read;