import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  FormControl,
  FormGroup,
  Input,
  InputLabel,
  styled,
  Typography,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";

const Container = styled(FormGroup)({
  border: "1px solid #ccc",
  borderRadius: "8px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  margin: "5% auto",
  padding: "20px",
  width: "50%",
});

const FormField = styled(FormControl)({
  marginBottom: "20px",
  width: "100%",
});

const StyledButton = styled(Button)({
  marginTop: "20px",
  width: "100%",
});

const EditUser = () => {
  const [item, setItem] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    loadItemDetails(id);
  }, [id]);

  const loadItemDetails = async (id) => {
    console.log(id,"jjjjj");
    try {
      const response = await axios.get(`http://localhost:8000/items/${id}`);
      setItem(response.data);
    } catch (error) {
      console.error("Error loading item details:", error);
    }
  };

  const onValueChange = (e) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };

  const editItemDetails = async () => {
    try {
      await axios.put(`http://localhost:8000/items/${id}`, item);
      navigate("/all");
    } catch (error) {
      console.error("Error editing item details:", error);
    }
  };

  return (
    <Container>
      <Typography align="center" variant="h4">
        Edit Data
      </Typography>

      <FormField>
        <InputLabel>Description</InputLabel>
        <Input
          name="description"
          onChange={(e) => onValueChange(e)}
          value={item.description || ""}
        />
      </FormField>

      <FormField>
        <InputLabel>Title</InputLabel>
        <Input
          name="title"
          onChange={(e) => onValueChange(e)}
          value={item.title || ""}
        />
      </FormField>

      <StyledButton
        color="primary"
        onClick={() => editItemDetails()}
        variant="contained"
      >
        Edit Data
      </StyledButton>
    </Container>
  );
};

export default EditUser;
