import { Modal, Button } from "antd";
import React, { useEffect, useState } from "react";
import componentMap from "../../utils/componentMap";
import { useDispatch } from "react-redux";
import { updateFormAlertMessage } from "../../redux/actions/ActionCreators";
const LoginModal = ({
  visible,
  onCancel,
  defaultForm,
  isExistingUser,
  setIsExistingUser,
}) => {
  const [formType, setFormType] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    setFormType(defaultForm);
  }, [defaultForm, visible]);

  const footerLinks = {
    "log-in": "Log In",
    registration: "Create new account",
    "password-reset": "Forgot password?",
  };

  return (
    <Modal
      visible={visible}
      onCancel={() => {
        dispatch(updateFormAlertMessage(""));
        onCancel(false);
      }}
      footer={
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {Object.entries(footerLinks)
            .filter(([type, formLabel]) => type !== formType)
            .map(([formType, formLabel]) => (
              <Button
                type="link"
                key={formLabel}
                onClick={() => {
                  dispatch(updateFormAlertMessage(""));
                  setFormType(formType);
                }}
              >
                {formLabel}
              </Button>
            ))}
        </div>
      }
      destroyOnClose={true}
    >
      <span key={formType}>
        {componentMap(formType, {
          setFormType,
          isExistingUser,
          setIsExistingUser,
          onCancel,
          visible,
          formType,
        })}
      </span>
    </Modal>
  );
};

export default LoginModal;
