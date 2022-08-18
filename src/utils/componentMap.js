import LoginForm from "../components/forms/Login";
import PasswordResetForm from "../components/forms/PasswordReset";
import RegistrationForm from "../components/forms/Registration";
import UpdatePassword from "../components/forms/UpdatePassword";
import UpdateProfile from "../components/UpdateProfile";

const componentMap = (compType, extProps) => {
  let comp = null;

  switch (compType) {
    case "log-in":
      comp = <LoginForm {...extProps} />;
      break;
    case "registration":
      comp = <RegistrationForm {...extProps} />;
      break;
    case "password-reset":
      comp = <PasswordResetForm {...extProps} />;
      break;

    case "updateprofile":
      comp = <UpdateProfile {...extProps} />;
      break;
    case "updatepassword":
      comp = <UpdatePassword {...extProps} />;
      break;

    default:
      break;
  }
  return comp;
};

export default componentMap;
