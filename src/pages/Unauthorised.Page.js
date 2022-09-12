import { Button, Result } from "antd";

import { useNavigate } from "react-router";

const UnauthorisedPage = () => {
  const navigate = useNavigate();
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
