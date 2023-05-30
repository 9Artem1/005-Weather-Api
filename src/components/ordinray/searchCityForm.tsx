import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../core/store";
import { Form } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { fetchWeatherData } from "../../core/store/weatherSlice";
import { Button, TextField, Typography } from "@mui/material";

const validationRules = {
  City: {
    required: 'Поле обязательно к заполнению',
    minLength: {
      value: 2,
      message: "Минимум 2 символa."
    }
  }
};

export const SearchCityForm = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useSelector((state: RootState) => state.weather);
  const { register, handleSubmit, setValue, formState: { errors, isValid } } = useForm({
    mode: "onChange",
    defaultValues: {
      City: ""
    },
  });

  return (
    <Form
      style={{ padding: 0, marginTop: "1rem", width: '80%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: "column", gap: '10px' }}
      onSubmit={handleSubmit((data) => {
        dispatch(fetchWeatherData(data.City));
        setValue('City', '');
      })}
    >
      {errors.City && (
        <Typography variant="inherit" color="primary" style={{ height: "14px", color: "red", fontSize: '14px' }}>
          {errors?.City?.message || 'Error!'}
        </Typography>
      )}
      <TextField
        {...register("City", validationRules.City)}
        fullWidth
        type='string'
        size='small'
        label={'введите название города'}
        variant='outlined'
        onChange={(event) => {event.preventDefault(); setValue('City', event.target.value, { shouldValidate: true })}}
      />
      <Button type="submit" variant="contained" disabled={loading || !isValid} sx={{ width: '17em' }} aria-label="search-button">
        {loading ? 'Loading...' : 'Узнать погоду'}
      </Button>
      {error && <Typography color="error">{error}</Typography>}
    </Form>
  );
};