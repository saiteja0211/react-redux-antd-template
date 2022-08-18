import { Modal, Button, Input, message, Select } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import useAxios from "../../utils/useAxios";

const AddKeywordsModal = ({
  visible,
  cancel,
  categoryId,
  categoryName,
  countryCode,
}) => {
  const categories = useSelector((state) => state.AppReducer.fetchedCategories);
  const [keyword, setKeyword] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState(categoryId);
  const { axiosPost } = useAxios();
  const submitForm = async () => {
    try {
      await axiosPost({
        url: `AddSpecialKeywordToDB`,
        data: {
          keyword,
          categoryId: selectedCategoryId,
          countryCode,
        },
      });
      cancel(false);
      message.success("Successfully added keyword.", 4);
    } catch (err) {
      message.error(
        "Error while adding keyword. Please try after sometime.",
        5
      );
      console.log("Error while Adding keyword to DB:", err);
    }
  };

  return (
    <Modal
      visible={visible}
      onCancel={() => cancel(false)}
      title="Add product to category"
      footer=""
      destroyOnClose={true}
    >
      <label>Product Keyword:</label>
      <Input
        placeholder="input product name"
        style={{ marginBottom: 20 }}
        onChange={(e) => setKeyword(e.target.value)}
      />

      <label>Category:</label>
      <div>
        <Select
          showSearch
          placeholder="Select a Category"
          optionFilterProp="key"
          style={{ width: "100%" }}
          onChange={(value) => setSelectedCategoryId(value)}
          // onSearch={onSearch}
          defaultValue={selectedCategoryId}
          dropdownMatchSelectWidth={true}
          filterOption={(input, option) => {
            console.log(option);
            return option.key.toLowerCase().includes(input.toLowerCase());
          }}
          filterSort={(optionA, optionB) =>
            optionA.key.toLowerCase().localeCompare(optionB.key.toLowerCase())
          }
        >
          {categories.map((each) => (
            <Select.Option key={each.name} value={each.id}>
              {each.name}
            </Select.Option>
          ))}
        </Select>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          size="small"
          type="primary"
          disabled={!(keyword && selectedCategoryId)}
          style={{ marginTop: 15 }}
          onClick={submitForm}
        >
          Submit
        </Button>
      </div>
    </Modal>
  );
};

export default AddKeywordsModal;
