import React, { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Button,
  styled,
} from "@mui/material";

import axios from "axios";
import { Link } from "react-router-dom";

const StyledPaper = styled(Paper)({
  width: "90%",
  margin: "50px auto",
  overflow: "auto",
});

const StyledTable = styled(Table)({
  minWidth: 650,
});

const THead = styled(TableRow)({
  "& > th": {
    fontSize: 16,
    fontWeight: "bold",
    backgroundColor: "#f0f0f0",
  },
});

const TableCellOverflow = styled(TableCell)({
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

const AllData = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getAllData();
  }, []);

  const getAllData = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/items`);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const deleteDataDetails = async (id) => {
    console.log(id);
    try {
      await axios.delete(`http://localhost:8000/items/${id}`);
      getAllData();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <StyledPaper elevation={3}>
      <StyledTable>
        <TableHead>
          <THead>
            <TableCell>Id</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Actions</TableCell>
          </THead>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item._id}>
              <TableCellOverflow>{item._id}</TableCellOverflow>
              <TableCellOverflow>{item.title}</TableCellOverflow>
              <TableCellOverflow>{item.description}</TableCellOverflow>
              <TableCell>
                <Button
                  variant="contained"
                  style={{ marginRight: 10 }}
                  component={Link}
                  to={`/edit/${item._id}`}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => deleteDataDetails(item._id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </StyledTable>
    </StyledPaper>
  );
};

export default AllData;
