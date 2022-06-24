import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Alert } from "react-bootstrap";
import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";

import ButtonLoader from "@components/UI/ButtonLoader";

import { CLEAR_USER_STATE } from "@store/actionLabels";
import { clearAuthError, userRegisterAction } from "@store/actions/auth/auth";

const Registration = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isLoading, errorMsg, successMsg } = useSelector((s) => s.auth);
  const [formData, setFormData] = useState({
    name: "Shashank Soni",
    email: "sha1@gmail.com",
    password: "123456",
  });

  const { name, email, password } = formData;

  useEffect(() => {
    let timer;
    if (errorMsg) {
      timer = setTimeout(() => {
        dispatch(clearAuthError());
      }, 2500);
    }

    if (successMsg) {
      timer = setTimeout(() => {
        router.push("/login");
        dispatch(clearAuthError());
        dispatch({ type: CLEAR_USER_STATE });
      }, 2500);
    }

    return () => clearTimeout(timer);
  }, [errorMsg, successMsg]);

  const inputHandler = (e) =>
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!email || !password || !name) {
      toast.warn("Enter All Fields First");
      return;
    }

    dispatch(userRegisterAction({ name, email, password }));
    return;
  };

  return (
    <div className="container container-fluid">
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mb-3">Join Us</h1>

            <div className="form-group">
              <label htmlFor="name_field">Full Name</label>
              <input
                type="text"
                id="name_field"
                className="form-control"
                name="name"
                value={name}
                onChange={inputHandler}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                name="email"
                value={email}
                onChange={inputHandler}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                name="password"
                value={password}
                onChange={inputHandler}
              />
            </div>

            {/* <div className="form-group">
              <label htmlFor="avatar_upload">Avatar</label>
              <div className="d-flex align-items-center">
                <div>
                  <figure className="avatar mr-3 item-rtl">
                    <img src="" className="rounded-circle" alt="image" />
                  </figure>
                </div>
                <div className="custom-file">
                  <input
                    type="file"
                    name="avatar"
                    className="custom-file-input"
                    id="customFile"
                  />
                  <label className="custom-file-label" htmlFor="customFile">
                    Choose Avatar
                  </label>
                </div>
              </div>
            </div> */}
            {errorMsg && (
              <Alert variant="danger" transition dismissible>
                {errorMsg}
              </Alert>
            )}

            {successMsg && (
              <Alert variant="success" transition dismissible>
                {successMsg}
              </Alert>
            )}

            <button
              id="login_button"
              type="submit"
              className="btn btn-block py-3"
              disabled={isLoading}
              style={errorMsg ? { marginTop: 0 } : {}}
            >
              {isLoading ? <ButtonLoader /> : "REGISTER"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;
