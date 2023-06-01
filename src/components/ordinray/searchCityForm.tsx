import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../core/store";
import { Form } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { fetchWeatherData, getWeatherFailure } from "../../core/store/weatherSlice";
import { Button, TextField, Typography } from "@mui/material";
import { useState } from "react";

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
  const [city, setCity] = useState('');

  if (error) {
    setTimeout(() => {
      dispatch(getWeatherFailure(null)); // обнуляем состояние ошибки через некоторое время после ее вывода
    }, 4000);
  }

  return (
    <Form
      style={{ padding: 0, marginTop: "1rem", width: '80%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: "column", gap: '10px' }}
      onSubmit={handleSubmit((data) => {
        const cityValue = data.City.trim();
        setCity(cityValue);
        dispatch(fetchWeatherData(cityValue));
        const city = data.City.trim(); // обрезаю пробелы перед и после city
        dispatch(fetchWeatherData(city));
        setValue('City', '');
      })}
    >
      
      {errors.City && (
        <Typography variant="inherit" color="primary" style={{ height: "14px", color: "red", fontSize: '14px' }}>
          {errors?.City?.message}
        </Typography>
      )}
      {error && (
        <Typography color="error" variant="inherit">
          {error.includes('not found') ? `Город '${city}' не найден` : error}
        </Typography>
      )}
      <TextField
        {...register("City", validationRules.City)}
        fullWidth
        type='string'
        size='small'
        label={'введите название города'}
        variant='outlined'
        onChange={(event) => { event.preventDefault(); setValue('City', event.target.value, { shouldValidate: true }) }}
      />
      <Button
        type="submit"
        variant="contained"
        disabled={loading || !isValid}
        // disabled={!isValid}  
        sx={{ width: '17em' }}
        aria-label="search-button"
      >
        {loading ? 'Loading...' : 'Узнать погоду'}
        {/* {'Узнать погоду'} */}
      </Button>
    </Form>
  );
};