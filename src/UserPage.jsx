import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UserPage = () => {
  const [user, setUser] = useState({});

  const { id } = useParams();

  console.log(id);

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users/" + id
      );
      const user = await response.json();
      setUser(user);
    };

    fetchUserData();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  console.log(user);

  return (
    <div className="user-container">
      <div className="inner-container">
        <h2>React App</h2>
        <span></span>
        <p>CRUD Operation with Material Table</p>

        <span></span>
      </div>
      <div className="second-inner-container">
        <p>User Details</p>
        <p>
          ID: <span>{user.id}</span>
        </p>
        <p>
          Name: <span>{user.name}</span>
        </p>
        <p>
          Email: <span>{user.email}</span>
        </p>
        <p>
          Phone: <span>{user.phone}</span>
        </p>
        <p>
          Website: <span>{user.website}</span>
        </p>
      </div>
    </div>
  );
};

export default UserPage;
