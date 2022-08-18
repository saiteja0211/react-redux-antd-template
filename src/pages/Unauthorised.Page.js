import { Button, Result } from "antd";
import React from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { updateShowLoginModal } from "../redux/actions/ActionCreators";

const UnauthorisedPage = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.AppReducer);
  return (
    <Result
      style={{ padding: 0 }}
      status="403"
      title="Sorry... you don't have access to this page."
      subTitle={
        isLoggedIn
          ? "Don't worry! You can easily go back to the homepage"
          : "Try logging in or creating a new account"
      }
      extra={
        <>
          {isLoggedIn ? (
            <Button type="primary" onClick={() => history.push("/")}>
              Back to homepage
            </Button>
          ) : (
            <Button
              onClick={() => {
                dispatch(
                  updateShowLoginModal({
                    showLoginModal: true,
                    formAlertMessage: "",
                  })
                );
              }}
            >
              <h4>Login / Signup</h4>
            </Button>
          )}
        </>
      }
    />
  );
};

export default UnauthorisedPage;
