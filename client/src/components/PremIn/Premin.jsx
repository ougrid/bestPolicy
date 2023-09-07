import React from "react";
import { Link } from "react-router-dom";

export default function PremIn() {
  return (
    <div>
      <Link to={"./create"}>
        <button className="btn btn-primary">Create</button>
      </Link>
      <Link to={"./search"}>
        <button className="btn btn-primary">Search</button>
      </Link>
      <Link to={"./paid"}>
        <button className="btn btn-primary">List</button>
      </Link>
    </div>
  );
}
