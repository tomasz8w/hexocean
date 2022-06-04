import React, { useState } from "react";

import {
  Alert,
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  TextField,
} from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import useSendData from "./useSendData";

type FormInputBase = {
  name: string;
  preparation_time: string;
  type: "pizza" | "soup" | "sandwich" | "";
};

type ParsedForm = FormInputBase & {
  no_of_slices?: number;
  diameter?: number;
  spiciness_scale?: number;
  slices_of_bread?: number;
};

type TForm = FormInputBase & {
  spiciness_scale: number;
  no_of_slices: string;
  diameter: string;
  slices_of_bread: string;
};

const Form = () => {
  const [data, setData] = useState<ParsedForm | undefined>();
  const { control, handleSubmit, watch } = useForm<TForm>();

  const onSubmit: SubmitHandler<TForm> = (data) => {
    console.log(data);
    switch (data.type) {
      case "pizza":
        setData({
          name: data.name,
          preparation_time: data.preparation_time,
          type: data.type,
          no_of_slices: parseInt(data.no_of_slices),
          diameter: parseFloat(data.diameter),
        });
        break;
      case "sandwich":
        setData({
          name: data.name,
          preparation_time: data.preparation_time,
          type: data.type,
          slices_of_bread: parseInt(data.slices_of_bread),
        });
        break;
      case "soup":
        setData({
          name: data.name,
          preparation_time: data.preparation_time,
          type: data.type,
          spiciness_scale: data.spiciness_scale,
        });
        break;

      default:
        break;
    }
  };

  const { success, error, isLoading, id } = useSendData(data);

  const selectState = watch("type");

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: "flex",
        flexDirection: "column",
        minWidth: "400px",
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
            error={fieldState.error || error?.name ? true : false}
            helperText={error?.name ?? " "}
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
            placeholder="00:00:00"
            label="Preparation time"
            error={fieldState.error || error?.preparation_time ? true : false}
            helperText={error?.preparation_time ?? " "}
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
          <FormControl sx={{ mb: 3 }}>
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
            defaultValue="1"
            control={control}
            rules={{
              required: selectState === "pizza",
              pattern: /^(0|[1-9]\d*)$/,
              min: 1,
            }}
            render={({ field, fieldState }) => (
              <TextField
                type="number"
                label="No. of slices"
                error={fieldState.error || error?.no_of_slices ? true : false}
                helperText={error?.no_of_slices ?? " "}
                {...field}
              />
            )}
          />
          <Controller
            name="diameter"
            defaultValue="30"
            control={control}
            rules={{
              required: selectState === "pizza",
              pattern: /^(0|[1-9]\d*)(\.\d+)?$/,
              min: 0,
            }}
            render={({ field, fieldState }) => (
              <TextField
                type="number"
                label="Diameter"
                error={fieldState.error || error?.diameter ? true : false}
                helperText={error?.diameter ?? " "}
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
          defaultValue="1"
          control={control}
          rules={{
            required: selectState === "sandwich",
            pattern: /^(0|[1-9]\d*)$/,
            min: 1,
          }}
          render={({ field, fieldState }) => (
            <TextField
              label="Slices of bread"
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              error={fieldState.error || error?.slices_of_bread ? true : false}
              helperText={error?.slices_of_bread ?? " "}
              {...field}
            />
          )}
        />
      )}
      <Button
        type="submit"
        variant="outlined"
        disabled={isLoading}
        sx={{ mb: 3 }}
      >
        Submit
      </Button>
      {isLoading && <CircularProgress sx={{ alignSelf: "center" }} />}
      {success && <Alert severity="success">Success! Received id: {id}</Alert>}
      {error && (
        <Alert severity="error">
          Error occured. Check information next to input box.
        </Alert>
      )}
    </Box>
  );
};

export default Form;
