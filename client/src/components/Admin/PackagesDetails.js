import axios from "axios";
import { useEffect, useState } from "react";
import { CenterPage } from "../StylesPages/AdminStyles";
import { Container } from "../StylesPages/PagesLayout";
const config = require("../../config.json");

const PackagesDetails = () => {
  const url = config.url;
  const [packages, setPackages] = useState([]);
  useEffect(() => {
    axios.get(url + "/packages").then((res) => {
      setPackages(res.data);
    });
  }, []);
  const packagesElement = packages.map((packageItem, id) => {
    return (
      <>
        <form
          method="PUT"
          id={"p" + packageItem.id}
          onSubmit={(e) => handleEdit(e)}
        ></form>
        <tr key={id}>
          <td>
            <input
              type="text"
              form={"p" + packageItem.id}
              name="id"
              defaultValue={packageItem.id}
              disabled
            />
          </td>
          <td>
            <input
              type="text"
              form={"p" + packageItem.id}
              name="name"
              defaultValue={packageItem.name}
            />
          </td>
          <td>
            <input
              type="text"
              form={"p" + packageItem.id}
              name="cost"
              defaultValue={packageItem.cost}
            />
          </td>
          <td>
            <input
              type="textarea"
              form={"p" + packageItem.id}
              name="descript"
              defaultValue={packageItem.descript}
            />
          </td>
          <td>
            <input
              type="text"
              form={"p" + packageItem.id}
              name="picture"
              defaultValue={packageItem.picture}
            />
          </td>
          <td>
            <input
              type="text"
              form={"p" + packageItem.id}
              name="type"
              defaultValue={packageItem.type}
            />
          </td>

          <td>
            <input
              type="submit"
              form={"p" + packageItem.id}
              name="edit"
              value="edit"
            />
          </td>
          <td>
            <input
              type="button"
              id={packageItem.id}
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
      name: e.target.elements.name.value,
      cost: e.target.elements.cost.value,
      descript: e.target.elements.descript.value,
      picture: e.target.elements.picture.value,
      type: e.target.elements.type.value.split(","),
    };
    axios.put(url + "/packages/" + data.id, data).then((res) => {
      alert("Packages edited");
      window.location.reload(false);
    });
  };
  const handleDelete = (e) => {
    axios.delete(url + "/packages/" + e.target.id).then((res) => {
      alert("Car deleted");
      window.location.reload(false);
    });
  };

  const handleCreate = (e) => {
    e.preventDefault();
    const data = {
      name: e.target.elements.name.value,
      cost: e.target.elements.cost.value,
      descript: e.target.elements.descript.value,
      picture: e.target.elements.picture.value,
      type: e.target.elements.type.value.split(","),
    };
    axios
      .post(url + "/packages", data)
      .then((res) => {
        alert("Package Created");
        window.location.reload(false);
      })
      .catch((err) => {});
  };
  return (
    <CenterPage>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>Name</th>
            <th>Cost</th>
            <th>Desc</th>
            <th>Img</th>
            <th>Type</th>
            <th>edit</th>
            <th>delete</th>
          </tr>
        </thead>
        <tbody>
          {packagesElement}
          <>
            <form
              method="POST"
              id={"packages"}
              onSubmit={(e) => handleCreate(e)}
            ></form>
            <tr>
              <td></td>
              <td>
                <input type="name" form={"packages"} name="name" />
              </td>
              <td>
                <input type="cost" form={"packages"} name="cost" />
              </td>
              <td>
                <input type="descript" form={"packages"} name="descript" />
              </td>
              <td>
                <input type="picture" form={"packages"} name="picture" />
              </td>
              <td>
                <input type="type" form={"packages"} name="type" />
              </td>
              <td>
                <input type="submit" form={"packages"} value="add" />
              </td>
            </tr>
          </>
        </tbody>
      </table>
    </CenterPage>
  );
};

export default PackagesDetails;
