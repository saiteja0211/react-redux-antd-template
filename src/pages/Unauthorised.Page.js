import { Button, Result } from "antd";

import { updateBreadcrumbs } from "../app/appSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const UnauthorisedPage = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateBreadcrumbs([props.routeTitle]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.routeTitle]);

  return (
    <Result
      style={{ padding: 0 }}
      status="403"
      title="Sorry... you don't have access to this page."
      subTitle="Don't worry! You can easily go back to the homepage"
      extra={
        <Button type="primary" onClick={() => navigate("/")}>
          Back to homepage
        </Button>
      }
    />
  );
};

export default UnauthorisedPage;
