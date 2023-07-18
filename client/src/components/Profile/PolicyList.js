import axios from "axios";
import { useEffect, useState } from "react";
import { CenterPage } from "../StylesPages/AdminStyles";
import { Container } from "../StylesPages/PagesLayout";
const config = require("../../config.json");

const UserCarList = (props) => {
  const url = config.url;
  const [cars, setCars] = useState([]);
  const [row, setRow] = useState(1);

  const [carTypes, setCarType] = useState(config.carType);
  // const [carTypeList, setCarTypeList] =useState([])

  // useEffect(() => {
  //   axios.get(url + "/cars").then((res) => {
  //     setCars(res.data);
  //   });
  // }, []);

  const carList = carTypes.map((item) => {
    return <option value={item}>{item}</option>;
  });

  // dropdown Class
  const classList = config.class.map((item) => {
    return <option value={item}>{item}</option>;
  });

   // dropdown SubClass
   const subClassList = config.subClass.map((item) => {
    return <option value={item}>{item}</option>;
  });

  //  setCarTypeList(List)
  const carsElement = cars
    .filter((item) => {
      return props.userId === item.user_id;
    })
    .map((car, id) => {
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
                disabled
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
              <select form={"car" + car.id} name="type" defaultValue={car.type}>
                {carList}
              </select>
              {/* <input
                type="text"
                form={"car" + car.id}
                name="type"
                defaultValue={car.type}
              /> */}
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
    axios.put(url + "/cars/" + data.id, data).then((res) => {
      alert("Car edited");
      window.location.reload(false);
    });
  };

  const handleDelete = (e) => {
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
    axios.post(url + "/cars/", data).then((res) => {
      alert("Car Created");
      window.location.reload(false);
    });
  };

  const newRow = (e) => {
    e.preventDefault();
    setRow(row +1);
  
  };
  const removeRow = (e) => {
    e.preventDefault();
    setRow(row -1);
  
  };

  return (
    <CenterPage>
      <button  onClick={newRow} >add</button>
      <button  onClick={removeRow} >Remove</button>
      <input type="text" form={"policyadd"} name="brand" />
      <button  onClick={removeRow} >import EXCEL</button>
      <table>
        <thead>
          <tr>
            <th>class</th>
            <th>subclass</th>
            <th>เลขกรมธรรม์</th>
            <th>(P/C)</th>
            <th>คำนำหน้า</th>
            <th>ชื่อ</th>
            <th>นามสกุล</th>
            <th>id/taxNo</th>
            <th>วันเริ่ม</th>
            <th>วันสิ้นสุด</th>
            <th>บ้านเลขที่</th>
            <th>หมู่บ้าน/อาคาร</th>
            <th>หมู่</th>
            <th>ซอย</th>
            <th>ถนน</th>
            <th>จังหวัด</th>
            <th>อำเภอ</th>
            <th>ตำบล</th>
            <th>รหัสไปรษณี</th>
            <th>เบอร์โทร</th>
            <th>ทะเบียน</th>
            <th>ยี่ห้อ</th>
            <th>รุ่น</th>
            <th>Model</th>
            <th>ปีจดทะเบียน</th>
            <th>เลขตัวถัง</th>
          
          </tr>
        </thead>
        <tbody>
          {carsElement}
          <>
            <form
              method="POST"
              id={"policyadd"}
              onSubmit={(e) => handleCreate(e)}
            ></form>

          {Array.from({ length: row }, (_, index) => (
            <tr>
              <td>
              <select form={"policyadd"} name="type">
                  {classList}
                </select>
              </td>
              <td>
              <select form={"policyadd"} name="type">
                  {subClassList}
                </select>
              </td>
              <td>
                <input type="text" form={"policyadd"} name="brand" />
              </td>
              <td>
                <select form={"policyadd"} name="type">
                  <option value="P">Person</option>
                  <option value="C">Company</option>
                </select>
              </td>
              <td>
              <select form={"policyadd"} name="type">
                  <option value="M">นาย</option>
                  <option value="M">ดช.</option>
                  <option value="M">ดญ.</option>
                  <option value="F">นาง</option>
                  <option value="F">นางสาว</option>
                </select>
              </td>
              <td>
                <input type="text" form={"policyadd"} name="year" />
              </td>
              <td>
                <input type="text" form={"policyadd"} name="year" />
              </td>
              <td>
              <input type="text" form={"policyadd"} name="year" />
             
                {/* <input type="text" form={"policyadd"} name="type" /> */}
              </td>
              <td>
              <input type="date" form={"policyadd"} name="year" />
              </td>
              <td>
                <input type="date" form={"policyadd"} name="year" />
              </td>
              <td>
                <input type="text" form={"policyadd"} name="year" />
              </td>
              <td>
                <input type="text" form={"policyadd"} name="year" />
              </td>

              <td>
                <input type="text" form={"policyadd"} name="year" />
              </td>
              <td>
                <input type="text" form={"policyadd"} name="year" />
              </td>
              <td>
                <input type="text" form={"policyadd"} name="year" />
              </td>
              <td>
              <select form={"policyadd"} name="type">
                  <option value="M">กรุงเทพ</option>
                  <option value="M">สมุทรปราการ</option>
                  <option value="M">นนทบุรี</option>
                  <option value="F">ปทุมธานี</option>
                </select>
              </td>
              <td>
              <select form={"policyadd"} name="type">
                  <option value="M">บางเขน</option>
                  <option value="M">อำเภอ</option>
                  
                </select>
              </td>
              <td>
              <select form={"policyadd"} name="type">
                  <option value="M">ตำบลนะจ๊ะ</option>
                  
                </select>
              </td>
              <td>
              <select form={"policyadd"} name="type">
                  <option value="M">zipcode</option>
                  
                </select>
              </td>
              <td>
                <input type="text" form={"policyadd"} name="year" />
              </td>
              <td>
                <input type="text" form={"policyadd"} name="year" />
              </td>
              <td>
              <select form={"policyadd"} name="type">
                  <option value="M">toyota</option>
                  <option value="M">maxda</option>
                </select>
              </td>
              <td>
              <select form={"policyadd"} name="type">
                  <option value="M">city</option>
                  <option value="M">civic</option>
                </select>
              </td>
              <td>
              <select form={"policyadd"} name="type">
                  <option value="M">x</option>
                  <option value="M">2</option>
                </select>
              </td>
              <td>
              <select form={"policyadd"} name="type">
                  <option value="M">2023</option>
                  <option value="M">2022</option>
                  <option value="M">2021</option>
                  <option value="M">2020</option>
                </select>
              </td>
              <td>
              <input type="text" form={"policyadd"} name="year" />
              </td>
            </tr>
          ))}

          </>
        </tbody>
      </table>
    </CenterPage>
  );
};

export default UserCarList;
