import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { API } from "../API";

export default function ProductRequest() {
  const [users, setsUsers] = useState([]);
  const fetchUsers = async () => {
    const res = await axios.get(API + "/user/findall");

    if (res.status === 200) {
      const filteredData = res.data.filter((d) => !d.isAdmin);
      setsUsers(filteredData);
    }
  };

  const deleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const res = await axios.delete(API + `/user/${id}`, { withCredentials: true });
        if (res.status < 400) {
          alert("User successfully deleted");
          setsUsers(users.filter((user) => user._id !== id));
        }
      } catch (e) {
        alert("Error occurred while deleting the user");
      }
    }
  };
  useEffect(() => {
    setsUsers([]);
    fetchUsers();
  }, []);

  return (
    <div className="page requestPage">
      <h2>All Users</h2>

      <div className="bottom">
        <table border={1}>
          <tr className="titleFortable">
            <th>User</th>
            <th>Email</th>
            <th>Location</th>
            <th>Delete</th>
          </tr>

          {users.map((req, index) => (
            <tr key={req?._id} className="">
              <td>
                <div className="ownerInfo">
                  <img src={req?.avatar} alt="" />
                  <p>{req?.username}</p>
                </div>
              </td>
              <td>
                <div className="">
                  <p>{req?.email}</p>
                </div>
              </td>
              <td>
                <div className="">
                  <p>{req?.location}</p>
                </div>
              </td>
              <td>
                <button className="red" onClick={()=>deleteUser(req?._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}
