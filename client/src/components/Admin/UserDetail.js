import axios from "axios";
import { useEffect, useState } from "react";
import { CenterPage } from "../StylesPages/AdminStyles.js";
import { Container } from "../StylesPages/PagesLayout";
const config = require("../../config.json");

const UserDetails = () => {
  const url = config.url;
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get(url + "/users", {
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
      })
      .then((res) => {
        setUsers(res.data);
      });
  }, []);
  const usersElement = users.map((user, id) => {
    return (
      <>
        <form
          method="PUT"
          id={"user" + user.id}
          onSubmit={(e) => handleEdit(e)}
        ></form>
        <tr>
          <td>
            <input
              type="text"
              form={"user" + user.id}
              name="id"
              defaultValue={user.id}
              disabled
            />
          </td>
          <td>
            <input
              type="text"
              form={"user" + user.id}
              name="firstname"
              defaultValue={user.firstname}
            />
          </td>
          <td>
            <input
              type="text"
              form={"user" + user.id}
              name="lastname"
              defaultValue={user.lastname}
            />
          </td>
          <td>
            <input
              type="text"
              form={"user" + user.id}
              name="address"
              defaultValue={user.address}
            />
          </td>
          <td>
            <input
              type="text"
              form={"user" + user.id}
              name="tel"
              defaultValue={user.tel}
            />
          </td>
          <td>
            <input
              type="checkbox"
              form={"user" + user.id}
              name="is_admin"
              defaultChecked={user.is_admin}
            />
          </td>
          <td>
            <input
              type="text"
              form={"user" + user.id}
              name="username"
              defaultValue={user.username}
            />
          </td>
          <td>
            <input
              type="text"
              form={"user" + user.id}
              name="password"
              defaultValue={user.password}
            />
          </td>
          <td>
            <input
              type="submit"
              form={"user" + user.id}
              name="edit"
              value="edit"
            />
          </td>
          <td>
            <input
              type="button"
              id={user.id}
              value="delete"
              onClick={(e) => handleDelete(e)}
            />
          </td>
        </tr>
      </>
    );
  });

  const handleEdit = (e) => {
    e.preventDefault();

    const data = {
      id: e.target.elements.id.value,
      firstname: e.target.elements.firstname.value,
      lastname: e.target.elements.lastname.value,
      address: e.target.elements.address.value,
      tel: e.target.elements.tel.value,
      is_admin: e.target.elements.is_admin.checked,
      username: e.target.elements.username.value,
      password: e.target.elements.password.value,
    };
    axios
      .put(url + "/users/" + data.id, data, {
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
      })
      .then((res) => {
        alert("User edited");
        window.location.reload(false);
      })
      .catch((err) => {
        alert("Something went wrong, Try Again.");
      });
  };

  const handleDelete = (e) => {
    axios
      .delete(url + "/users/" + e.target.id, {
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
      })
      .then((res) => {
        alert("User deleted");
        window.location.reload(false);
      });
  };
  const handleCreate = (e) => {
    e.preventDefault();
    const data = {
      firstname: e.target.elements.firstname.value,
      lastname: e.target.elements.lastname.value,
      address: e.target.elements.address.value,
      tel: e.target.elements.tel.value,
      is_admin: e.target.elements.is_admin.checked,
      username: e.target.elements.username.value,
      password: e.target.elements.password.value,
    };
    axios
      .post(url + "/users/", data, {
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
      })
      .then((res) => {
        alert("User Created");
        window.location.reload(true);
      })
      .catch((err) => {
        alert("Something went wrong, Try Again.");
      });
  };

  return (
    <CenterPage>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>firstname</th>
            <th>lastname</th>
            <th>address</th>
            <th>tel</th>
            <th>is_admin</th>
            <th>username</th>
            <th>password</th>
            <th>edit</th>
            <th>delete</th>
          </tr>
        </thead>
        <tbody>
          {usersElement}
          <>
            <form
              method="POST"
              id="useradd"
              onSubmit={(e) => handleCreate(e)}
            ></form>
            <tr>
              <td></td>
              <td>
                <input type="text" form="useradd" name="firstname" />
              </td>
              <td>
                <input type="text" form="useradd" name="lastname" />
              </td>
              <td>
                <input type="text" form="useradd" name="address" />
              </td>
              <td>
                <input type="text" form="useradd" name="tel" />
              </td>
              <td>
                <input type="checkbox" form="useradd" name="is_admin" />
              </td>
              <td>
                <input type="text" form="useradd" name="username" />
              </td>
              <td>
                <input type="text" form="useradd" name="password" />
              </td>
              <td>
                <input type="submit" form="useradd" name="edit" value="add" />
              </td>
              <td></td>
            </tr>
          </>
        </tbody>
      </table>
    </CenterPage>
  );
};

export default UserDetails;
