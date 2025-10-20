import { useEffect, useRef, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Divider, Input, Select, Space } from "antd";
import { Controller } from "react-hook-form";
import useGetCategories from "@/hooks/ad/useGetCategories";
import { useSelector } from "react-redux";

let index = 0;
const AdCategoryInputDropdown = ({ control, errors }) => {
  useGetCategories()
  const { categories } = useSelector(store => store.ad)
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    const categoryNames = categories.map((category) => category.name);
    setItems(categoryNames);
  }, [categories]);

  const onNameChange = (event) => {
    setName(event.target.value);
  };

  const addItem = (e) => {
    e.preventDefault();
    setItems([...items, name || `Category ${index++}`]);
    setName("");
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  return (
    <>
      <Controller
        name="category"
        control={control}
        rules={{ required: "Category is required" }}
        render={({ field }) => (
          <Select
            {...field}
            className="w-full h-[42px] active:outline-none"
            placeholder="Select product category"
            onChange={(value) => field.onChange(value)}
            dropdownRender={(menu) => (
              <>
                {menu}
                <Divider style={{ margin: "8px 0" }} />
                <Space style={{ padding: "0 8px 4px" }}>
                  <Input
                    placeholder="Please enter item"
                    className="border border-none"
                    ref={inputRef}
                    value={name}
                    onChange={onNameChange}
                    onKeyDown={(e) => e.stopPropagation()}
                  />
                  <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                    Add item
                  </Button>
                </Space>
              </>
            )}
            options={items.map((item) => ({ label: item, value: item }))}
          />
        )}
      />
      <p className="text-red-600 text-xs font-semibold h-5 2xl:h-3 pt-1 ps-1">
        {errors.category?.message}
      </p>
    </>
  );
};

export default AdCategoryInputDropdown;
