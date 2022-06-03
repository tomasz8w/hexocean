import React from "react";

import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  TextField,
} from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

type FormInput = {
  name: string;
  preparation_time: string;
  type: "pizza" | "soup" | "sandwich" | "";
};

type FormInputPizza = {
  no_of_slices: number;
  diameter: number;
};

type FormInputSoup = {
  spiciness_scale: number;
};

type FormInputSandwich = {
  slices_of_bread: number;
};

const Form = () => {
  const { control, handleSubmit, watch } = useForm<
    FormInput & (FormInputPizza | FormInputSandwich | FormInputSoup)
  >();

  const onSubmit: SubmitHandler<
    FormInput & (FormInputPizza | FormInputSandwich | FormInputSoup)
  > = (data) => {
    console.log(data);
  };

  const selectState = watch("type");

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "600px",
        gap: 2,
      }}
    >
      <Controller
        name="name"
        defaultValue=""
        control={control}
        rules={{ required: true }}
        render={({ field, fieldState }) => (
          <TextField
            error={fieldState.error ? true : false}
            label="Dish name"
            {...field}
          />
        )}
      />
      <Controller
        name="preparation_time"
        defaultValue="00:00:00"
        control={control}
        rules={{
          required: true,
          pattern: /^(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)?([0-5]?\d)$/,
        }}
        render={({ field, fieldState }) => (
          <TextField
            label="Preparation time"
            error={fieldState.error ? true : false}
            {...field}
          />
        )}
      />
      <Controller
        name="type"
        defaultValue=""
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <FormControl>
            <InputLabel id="dish-type-label">Dish type</InputLabel>
            <Select labelId="dish-type-label" label="Dish type" {...field}>
              <MenuItem value={"pizza"}>Pizza</MenuItem>
              <MenuItem value={"soup"}>Soup</MenuItem>
              <MenuItem value={"sandwich"}>Sandwich</MenuItem>
            </Select>
          </FormControl>
        )}
      />
      {selectState === "pizza" && (
        <>
          <Controller
            name="no_of_slices"
            defaultValue={1}
            control={control}
            rules={{
              required: selectState === "pizza",
              pattern: /^(0|[1-9]\d*)$/,
              min: 1,
            }}
            render={({ field, fieldState }) => (
              <TextField
                label="No. of slices"
                error={fieldState.error ? true : false}
                {...field}
              />
            )}
          />
          <Controller
            name="diameter"
            defaultValue={0}
            control={control}
            rules={{
              required: selectState === "pizza",
              pattern: /^(0|[1-9]\d*)(\.\d+)?$/,
              min: 0,
            }}
            render={({ field, fieldState }) => (
              <TextField
                label="Diameter"
                error={fieldState.error ? true : false}
                {...field}
              />
            )}
          />
        </>
      )}
      {selectState === "soup" && (
        <Controller
          name="spiciness_scale"
          defaultValue={5}
          control={control}
          rules={{ required: selectState === "soup" }}
          render={({ field }) => (
            <Slider min={1} max={10} valueLabelDisplay="auto" {...field} />
          )}
        />
      )}
      {selectState === "sandwich" && (
        <Controller
          name="slices_of_bread"
          defaultValue={0}
          control={control}
          rules={{
            required: selectState === "sandwich",
            pattern: /^(0|[1-9]\d*)$/,
            min: 1,
          }}
          render={({ field, fieldState }) => (
            <TextField
              label="Slices of bread"
              error={fieldState.error ? true : false}
              {...field}
            />
          )}
        />
      )}
      <Button type="submit" variant="outlined">
        Submit
      </Button>
    </Box>
  );
};

export default Form;
