import React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
  InputLabel,
  FormControl,
  TextField,
  Select,
} from "@mui/material";
import { apiDomain } from "../../utils/utils";
import useFetch from "../../hooks/useFetch";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

//example of creating a mui dialog modal for creating new rows
const RecipeModal = ({
  open,
  columns,
  onClose,
  onSubmit,
  currentRowData,
  setCurrentRow,
}) => {
  const { loading, error, value } = useFetch(`${apiDomain()}/api/categories`);

  const handleSubmit = () => {
    //put your validation logic here
    onSubmit(currentRowData);
    onClose();
  };

  return (
    <Dialog open={open}>
      <form onSubmit={handleSubmit}>
        <DialogTitle textAlign="center">Create New Recipe</DialogTitle>
        <DialogContent>
          <Stack
            sx={{
              width: "100%",
              minWidth: { xs: "300px", sm: "360px", md: "400px" },
              gap: "1.5rem",
            }}
          >
            {columns.map((column) => {
              if (
                column.accessorKey === "recipeId" ||
                column.accessorKey === "createdAt"
              )
                return;
              else if (column.accessorKey === "recipeCategory") {
                return (
                  <Box key={column.accessorKey}>
                    <FormControl fullWidth>
                      <InputLabel>Category</InputLabel>
                      <Select
                        label="Category"
                        id="category"
                        defaultValue={currentRowData?.recipeCategory}
                        onChange={(e) => {
                          setCurrentRow((prevUpdateData) => {
                            return {
                              ...prevUpdateData,
                              original: {
                                ...prevUpdateData.original,
                                recipeCategory: e.target.value,
                              },
                            };
                          });
                        }}
                        required
                      >
                        {value?.map((category) => {
                          if (
                            category.categoryName ===
                            currentRowData?.recipeCategory
                          ) {
                            return (
                              <MenuItem
                                key={category.categoryName}
                                value={category.categoryName}
                                selected
                              >
                                {category.categoryName}
                              </MenuItem>
                            );
                          }
                          return (
                            <MenuItem
                              key={category.categoryName}
                              value={category.categoryName}
                            >
                              {category.categoryName}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </Box>
                );
              } else if (column.accessorKey === "recipeContent") {
                return (
                  <Box key={column.accessorKey}>
                    <FormControl>
                      <InputLabel>Content</InputLabel>
                      <ReactQuill
                        theme="snow"
                        value={currentRowData?.[column.accessorKey]}
                        name={column.accessorKey}
                        label="Content"
                        onChange={(e) =>
                          setCurrentRow((prevUpdateData) => {
                            return {
                              ...prevUpdateData,
                              original: {
                                ...prevUpdateData.original,
                                recipeContent: e,
                              },
                            };
                          })
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
                    value={currentRowData?.[column.accessorKey]}
                    required
                    onChange={(e) =>
                      setCurrentRow((prevUpdateData) => {
                        return {
                          ...prevUpdateData,
                          original: {
                            ...prevUpdateData.original,
                            [e.target.name]: e.target.value,
                          },
                        };
                      })
                    }
                  />
                );
              }
            })}
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: "1.25rem" }}>
          <Button onClick={onClose}>Cancel</Button>
          <Button color="secondary" type="submit" variant="contained">
            Create New Recipe
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default RecipeModal;
