import React from "react";
import { useEffect, useState } from "react";

import { FormControl, NativeSelect } from "@material-ui/core";
import styles from "./countryPicker.module.css";
import { fetchCountryData } from "../../api";
const CountryPicker = ({ handleCountryChange }) => {
  const [countryData, setCountryData] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      setCountryData(await fetchCountryData());
    };
    fetchCountries();
  }, []);

  return (
    <FormControl className={styles.formControl}>
      <NativeSelect onChange={(e) => handleCountryChange(e.target.value)}>
        <option value="">Global</option>
        {countryData.map((c, i) => (
          <option key={i} value={c}>
            {c}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
};

export default CountryPicker;
