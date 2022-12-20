import React, { useCallback, useEffect, useMemo, useState } from "react";
import MaterialReactTable from "material-react-table";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Link } from "react-router-dom";
import "bulma/css/bulma.min.css";
import { posts as data } from "../../data/data";
import {
  apiDomain,
  validateAge,
  validateEmail,
  validateRequired,
} from "../../utils/utils";
import useFetch from "../../hooks/useFetch";
import {
  ChakraProvider,
  FormControl,
  FormLabel,
  Select,
  Input,
} from "@chakra-ui/react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

//example of creating a mui dialog modal for creating new rows
const RecipeModal = ({ open, columns, onClose, onSubmit, updateData }) => {
  const { loading, error, value } = useFetch(`${apiDomain()}/api/categories`);

  const [values, setValues] = useState(
    () =>
      updateData ??
      columns.reduce((acc, column) => {
        acc[column.accessorKey ?? ""] = "";
        return acc;
      }, {})
  );

  const handleSubmit = () => {
    //put your validation logic here
    if (!values.content) {
      alert("Please enter content");
      return;
    }
    onSubmit(values);
    onClose();
  };

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Create New Recipe</DialogTitle>
      <DialogContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <Stack
            sx={{
              width: "100%",
              minWidth: { xs: "300px", sm: "360px", md: "400px" },
              gap: "1.5rem",
            }}
          >
            {columns.map((column) => {
              if (
                column.accessorKey === "id" ||
                column.accessorKey === "createdAt"
              )
                return;
              else if (column.accessorKey === "category") {
                return (
                  <Box key={column.accessorKey}>
                    <FormControl>
                      <FormLabel>Category</FormLabel>
                      <Select isRequired={true}>
                        {value.map((category) => {
                          if (category.name === updateData.category) {
                            return (
                              <option value={category.name} selected={true}>
                                {category.name}
                              </option>
                            );
                          }
                          return (
                            <option value={category.name}>
                              {category.name}
                            </option>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </Box>
                );
              } else if (column.accessorKey === "content") {
                return (
                  <Box key={column.accessorKey}>
                    <FormControl>
                      <FormLabel>Content</FormLabel>
                      <ReactQuill
                        theme="snow"
                        value={updateData.content}
                        name={column.accessorKey}
                        label="Content"
                        onChange={(e) =>
                          setValues((prevValues) => ({
                            ...prevValues,
                            content: e,
                          }))
                        }
                      />
                    </FormControl>
                  </Box>
                );
              } else {
                return (
                  <TextField
                    key={column.accessorKey}
                    label={column.header}
                    name={column.accessorKey}
                    value={updateData[accessorKey]}
                    isRequired={true}
                    onChange={(e) =>
                      setValues({ ...values, [e.target.name]: e.target.value })
                    }
                  />
                );
              }
            })}
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: "1.25rem" }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="secondary" onClick={handleSubmit} variant="contained">
          Create New Recipe
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RecipeModal;
