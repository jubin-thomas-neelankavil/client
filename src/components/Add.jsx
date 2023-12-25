import React, { useState, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  Input,
  Button,
  Typography,
  styled,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Container = styled("div")`
  width: 50%;
  margin: 5% auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const FormField = styled(FormControl)`
  margin-bottom: 20px;
  width: 100%;
`;

const StyledButton = styled(Button)`
  width: 100%;
  margin-top: 20px;
`;

const defaultValue = {
  title: "",
  description: "",
};

const AddDetails = () => {
  const [data, setData] = useState(defaultValue);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStatesAndCountries = async () => {
      try {
        const DataResponse = await axios.get(
          "https://localhost:8000/items"
        );
        
      } catch (error) {
        console.error("Error fetching states and countries:", error.message);
      }
    };

    fetchStatesAndCountries();
  }, []);

  const onValueChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const addDetails = async () => {
    try {
      const resp = await axios.post("http://localhost:8000/items", data);
      console.log("API Response:", resp.data);
      navigate("/all");
    } catch (error) {
      console.error("Error adding details:", error.message);
    }
  };

  return (
    <Container>
      <Typography variant="h4" align="center">
        Add Details
      </Typography>

      <FormField>
        <InputLabel>Title</InputLabel>
        <Input onChange={(e) => onValueChange(e)} name="title" />
      </FormField>

      <FormField>
        <InputLabel>Description</InputLabel>
        <Input onChange={(e) => onValueChange(e)} name="description" />
      </FormField>

      <StyledButton
        variant="contained"
        onClick={addDetails}
        color="primary"
      >
        Submit
      </StyledButton>
    </Container>
  );
};

export default AddDetails;
