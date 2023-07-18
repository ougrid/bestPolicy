import axios from "axios";
import { useEffect, useState } from "react";
import { CenterPage } from "../StylesPages/AdminStyles";
import { Container } from "../StylesPages/PagesLayout";
const config = require("../../config.json");

const CarsDetails = () => {
  const url = config.url;
  const [cars, setCars] = useState([]);
  useEffect(() => {
    axios.get(url + "/cars").then((res) => {
      setCars(res.data);
    });
  }, []);

  const carsElement = cars.map((car, id) => {
    return (
      <>
        <form
          method="PUT"
          id={"car" + car.id}
          onSubmit={(e) => handleEdit(e)}
        ></form>
        <tr key={id}>
          <td>
            <input
              type="text"
              form={"car" + car.id}
              name="id"
              defaultValue={car.id}
              disabled
            />
          </td>
          <td>
            <input
              type="text"
              form={"car" + car.id}
              name="user_id"
              defaultValue={car.user_id}
            />
          </td>
          <td>
            <input
              type="text"
              form={"car" + car.id}
              name="plate_number"
              defaultValue={car.plate_number}
            />
          </td>
          <td>
            <input
              type="text"
              form={"car" + car.id}
              name="brand"
              defaultValue={car.brand}
            />
          </td>
          <td>
            <input
              type="text"
              form={"car" + car.id}
              name="model"
              defaultValue={car.model}
            />
          </td>
          <td>
            <input
              type="text"
              form={"car" + car.id}
              name="year"
              defaultValue={car.year}
            />
          </td>
          <td>
            <input
              type="text"
              form={"car" + car.id}
              name="insurance_id"
              defaultValue={car.insurance_id}
            />
          </td>
          <td>
            <input
              type="text"
              form={"car" + car.id}
              name="type"
              defaultValue={car.type}
            />
          </td>
          <td>
            <input
              type="submit"
              form={"car" + car.id}
              name="edit"
              value="edit"
            />
          </td>
          <td>
            <input
              type="button"
              id={car.id}
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
      user_id: e.target.elements.user_id.value,
      plate_number: e.target.elements.plate_number.value,
      brand: e.target.elements.brand.value,
      model: e.target.elements.model.value,
      year: e.target.elements.year.value,
      type: e.target.elements.type.value,
    };
    axios
      .put(url + "/cars/" + data.id, data)
      .then((res) => {
        alert("Car edited");
        window.location.reload(false);
      })
      .catch((err) => {
        alert("Something went wrong, Try Again.");
      });
  };

  const handleDelete = (e) => {
    e.preventDefault();
    axios.delete(url + "/cars/" + e.target.id).then((res) => {
      alert("Car deleted");
      window.location.reload(false);
    });
  };

  const handleCreate = (e) => {
    e.preventDefault();

    const data = {
      user_id: e.target.elements.user_id.value,
      plate_number: e.target.elements.plate_number.value,
      brand: e.target.elements.brand.value,
      model: e.target.elements.model.value,
      year: e.target.elements.year.value,
      type: e.target.elements.type.value,
    };
    axios
      .post(url + "/cars/", data)
      .then((res) => {
        alert("Car Created");
        window.location.reload(false);
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
            <th>Owner ID</th>
            <th>Plate Number</th>
            <th>Brand</th>
            <th>Model</th>
            <th>Year</th>
            <th>Package ID</th>
            <th>Type</th>
            <th>edit</th>
            <th>delete</th>
          </tr>
        </thead>
        <tbody>
          {carsElement}
          <>
            <form
              method="POST"
              id={"caradd"}
              onSubmit={(e) => handleCreate(e)}
            ></form>
            <tr>
              <td></td>
              <td>
                <input type="text" form={"caradd"} name="user_id" />
              </td>
              <td>
                <input type="text" form={"caradd"} name="plate_number" />
              </td>
              <td>
                <input type="text" form={"caradd"} name="brand" />
              </td>
              <td>
                <input type="text" form={"caradd"} name="model" />
              </td>
              <td>
                <input type="text" form={"caradd"} name="year" />
              </td>
              <td>
                <input type="text" form={"caradd"} name="insurance_id" />
              </td>
              <td>
                <input type="text" form={"caradd"} name="type" />
              </td>
              <td>
                <input type="submit" form={"caradd"} value="add" />
              </td>
            </tr>
          </>
        </tbody>
      </table>
    </CenterPage>
  );
};

export default CarsDetails;
