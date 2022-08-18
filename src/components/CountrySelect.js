import { Dropdown, Menu, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { updateCountryIPDetails } from "../redux/actions/ActionCreators";

const countryImage = {
  Australia: require("../assets/countryflags/australia.ico").default,
  Canada: require("../assets/countryflags/canada.png").default,
  France: require("../assets/countryflags/france.ico").default,
  Germany: require("../assets/countryflags/germany.ico").default,
  India:
    "https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/800px-Flag_of_India.svg.png",
  Italy: require("../assets/countryflags/italy.png").default,
  Japan: require("../assets/countryflags/japan.png").default,
  Mexico: require("../assets/countryflags/mexico.png").default,
  Netherlands: require("../assets/countryflags/netherlands.png").default,
  Poland: require("../assets/countryflags/poland.jpg").default,
  "Saudi Arabia": require("../assets/countryflags/saudiarabia.png").default,
  Singapore: require("../assets/countryflags/singapore.jpg").default,
  Sweden: require("../assets/countryflags/sweden.jpg").default,
  Turkey: require("../assets/countryflags/turkey.jpg").default,
  "United Arab Emirates":
    require("../assets/countryflags/United-Arab-Emirates.png").default,
  "United Kingdom": require("../assets/countryflags/united-kingdom.jpg")
    .default,
  "United States of America":
    require("../assets/countryflags/united-states.jpg").default,
};

const CountrySelect = () => {
  const dispatch = useDispatch();
  const { countryName, supportedCountries } = useSelector(
    (state) => state.AppReducer
  );

  const onCountryChange = (e, name, uncode) => {
    const { currency } = supportedCountries.find(
      (country) => country.name === name
    );
    if (!currency) {
      return;
    }
    const {
      symbol: countryCurrencySymbol,
      code: countryCurrencyCode,
      name: countryCurrencyName,
    } = currency;
    dispatch(
      updateCountryIPDetails({
        countryName: name,
        countryCode: uncode,
        countryCurrencySymbol,
        countryCurrencyCode,
        countryCurrencyName,
      })
    );
  };

  return (
    <>
      <Dropdown
        className="countries-menu"
        style={{ maxHeight: 100, color: "#fff" }}
        trigger="hover"
        type={<Button />}
        overlayStyle={{ zIndex: "9999999", marginTop: "16px !important" }}
        overlay={
          <Menu
            className="country-select thin-scroll"
            // style={{ maxHeight: "50vh", overflowY: "scroll" }}
          >
            {supportedCountries?.map(
              ({ UNcode: uncode, iso_code_2, name, imagePath }) => {
                return (
                  <Menu.Item
                    key={name}
                    uncode={uncode}
                    onClick={(e) => onCountryChange(e.key, name, uncode)}
                    style={{
                      borderBottom: "1px solid #ececec",
                    }}
                  >
                    <span
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                      }}
                    >
                      <div>
                        <img
                          src={countryImage[name]}
                          style={{ width: 20, height: 15, marginRight: 10 }}
                          alt={name}
                        />
                      </div>

                      <div>{name}</div>
                    </span>
                  </Menu.Item>
                );
              }
            )}
          </Menu>
        }
        placement="bottomCenter"
        arrow
      >
        <Button type="link">
          <img
            src={countryImage[countryName]}
            style={{
              width: 20,
              height: 15,
            }}
            alt={countryName}
          />{" "}
          <DownOutlined />
        </Button>
      </Dropdown>
    </>
  );
};

export default CountrySelect;
