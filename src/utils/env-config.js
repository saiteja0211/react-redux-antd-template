const envConfig = {
  development: { serviceUrl: "http://localhost:4171/api/" },
  uat: {},
  production: {},
};

export default envConfig[process.env.NODE_ENV];
