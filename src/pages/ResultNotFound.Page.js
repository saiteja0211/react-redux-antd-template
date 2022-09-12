import { Button, Result } from "antd";

import React from "react";
import { useNavigate } from "react-router-dom";

const ResultNotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Result
      style={{ padding: 0 }}
      status="404"
      title="Oops... No results found"
      subTitle=" Don't worry! You can easily go back to the homepage"
      extra={
        <Button type="primary" onClick={() => navigate("/")}>
          Back to homepage
        </Button>
      }
    />
  );
};

export default ResultNotFoundPage;
