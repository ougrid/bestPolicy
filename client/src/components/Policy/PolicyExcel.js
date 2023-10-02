import axios from "axios";
import { useEffect, useState } from "react";
import PolicyList from "./PolicyList";
import PolicyListV2 from "./PolicyListV2";
import jwt_decode from "jwt-decode";
import {
  HeaderProfile,
  EditBtn,
  Border,
  ContainerFlex,
  InputBox,
  Label,
  InputBtnProfile,
} from "../StylesPages/ProfileStyles";
import { InputBtn } from "../StylesPages/LoginStyles";
import { useCookies } from "react-cookie";

const config = require("../../config.json");

const PolicyExcel = () => {
  const url = window.globalConfig.BEST_POLICY_V1_BASE_URL;

  const [cookies, setCookie, removeCookie] = useCookies(["jwt"]);
  const headers = {
    headers: { Authorization: `Bearer ${cookies["jwt"]}` }
};
  const [profile, setProfile] = useState({});
  // var decoded = jwt_decode(localStorage.getItem("jwt"));
  // useEffect(() => {
  //   axios
  //     .get(url + "/users/" + decoded.id, {
  //       headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
  //     })
  //     .then((res) => {
  //       setProfile(res.data);
  //     });
  // }, []);
  const handleEdit = (e) => {
    e.preventDefault();

    // const data = {
    //   id: profile.id,
    //   firstname: e.target.elements.firstname.value,
    //   lastname: e.target.elements.lastname.value,
    //   address: e.target.elements.address.value,
    //   tel: e.target.elements.tel.value,
    //   username: e.target.elements.username.value,
    //   password: e.target.elements.password.value,
    // };
    // axios
    //   .put(url + "/users/" + data.id, data, {
    //     headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
    //   })
    //   .then((res) => {
    //     alert("User edited");
    //     window.location.reload(false);
    //   });
  };
  const isAdmin = (
    <section>
      <label>Admin : </label>
      <input
        type="checkbox"
        name="is_admin"
        defaultChecked={profile.is_admin}
        disabled
      />
    </section>
  );
  return (
    <div>
      {/* <Border>
        <HeaderProfile>Welcome {profile.firstname}</HeaderProfile>
        <form
          method="PUT"
          onSubmit={(e) => {
            handleEdit(e);
          }}
        >
          <ContainerFlex>
            <InputBox>
              <Label>Firstname</Label>
              <InputBtnProfile
                type="text"
                name="firstname"
                defaultValue={profile.firstname}
              />
            </InputBox>

            <InputBox>
              <Label>Lastname</Label>
              <InputBtnProfile
                type="text"
                name="lastname"
                defaultValue={profile.lastname}
              />
            </InputBox>

            <InputBox>
              <Label>Address</Label>
              <InputBtnProfile
                type="text"
                name="address"
                defaultValue={profile.address}
              />
            </InputBox>

            <InputBox>
              <Label>Tel</Label>
              <InputBtnProfile
                type="text"
                name="tel"
                defaultValue={profile.tel}
              />
            </InputBox>

            <InputBox>
              <Label>Username</Label>
              <InputBtnProfile
                type="text"
                name="username"
                defaultValue={profile.username}
              />
            </InputBox>

            <InputBox>
              <Label>Password</Label>
              <InputBtnProfile
                type="password"
                name="password"
                defaultValue={profile.password}
              />
            </InputBox>
          </ContainerFlex>
          <br />
          <EditBtn type="submit">edit</EditBtn>
        </form>
      </Border> */}

      <h2 className="text-center">Add New Policy</h2>
      <PolicyListV2 userId={profile.id} />
    </div>
  );
};

export default PolicyExcel;
