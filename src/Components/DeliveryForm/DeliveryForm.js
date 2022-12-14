import { useEffect, useState } from "react";
import { Input, InputContainer, Form } from "./Styles";

const DeliveryForm = ({
  register,
  errors,
  watch,
  handleSubmit,
  onSubmit,
  setValue,
  clearErrors,
}) => {
  const renderMode = (name) => {
    if (errors[name]) {
      return "error";
    }
    const value = watch(name);
    if (value && value.length > 0) return "success";
  };

  const isDropshipperChecked = watch("dropshipper");
  const [charCount, setCharCount] = useState(120);

  useEffect(() => {
    const value = watch("deliveryAddress");
    if (value) {
      return setCharCount(120 - value.length);
    }

    return setCharCount(120);
  }, [watch("deliveryAddress")]);

  useEffect(() => {
    if (!isDropshipperChecked) {
      setValue("dropshipperName", "");
      setValue("dropshipperPhoneNumber", "");
      clearErrors("dropshipperName");
      clearErrors("dropshipperPhoneNumber");
    }
  }, [isDropshipperChecked]);
  return (
    <Form id="deliveryform" onSubmit={handleSubmit(onSubmit)}>
      <InputContainer>
        <Input
          mode={renderMode("email")}
          placeholder="Email"
          type={"email"}
          {...register("email", {
            pattern:
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          })}
        />
      </InputContainer>
      <InputContainer>
        <Input
          mode={renderMode("dropshipperName")}
          disabled={!isDropshipperChecked}
          {...register("dropshipperName", {
            required: isDropshipperChecked,
          })}
          placeholder={"Dropshipper Name"}
        />
      </InputContainer>
      <InputContainer>
        <Input
          mode={renderMode("phoneNumber")}
          {...register("phoneNumber", {
            minLength: 6,
            maxLength: 20,
            pattern: /\+?([ -]?\d+)+|\(\d+\)([ -]\d+)/,
          })}
          placeholder={"Phone Number"}
        />
      </InputContainer>
      <InputContainer>
        <Input
          mode={renderMode("dropshipperPhoneNumber")}
          disabled={!isDropshipperChecked}
          {...register("dropshipperPhoneNumber", {
            required: isDropshipperChecked,
            pattern: /\+?([ -]?\d+)+|\(\d+\)([ -]\d+)/,
          })}
          placeholder={"Dropshipper Phone Number"}
        />
      </InputContainer>
      <InputContainer>
        <Input
          name="deliveryAddress"
          big
          mode={renderMode("deliveryAddress")}
          {...register("deliveryAddress", { required: true, maxLength: 120 })}
          placeholder={"Delivery Address"}
        />
        <span>{charCount} character(s) left</span>
      </InputContainer>
    </Form>
  );
};

export default DeliveryForm;
