import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    var addUser = { name, email, age };
    console.log(addUser);

    const response = await fetch("http://localhost:5000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addUser),
    });

    const result = await response.json();

    if (!response.ok) {
      console.log(result.error);
      setError(result.error);
    }
    if (response.ok) {
      console.log(result);
      setName("");
      setEmail("");
      setAge(0);
      setError("");
      navigate("/read");
    }
  };

  return (
    <div class="container my-2">
      <h1 class="h1 text-center">Fill the data</h1>

      {error && <div class="alert alert-danger"> {error} </div>}
      <form className="form" onSubmit={handleSubmit}>
        <div class="mb-3">
          <label class="form-label">Name</label>
          <input
            type="text"
            class="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Email address</label>
          <input
            type="email"
            class="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Age</label>
          <input
            type="number"
            class="form-control"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Create;