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
import { useDisclosure } from "@chakra-ui/react";
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
  Input,
} from "@chakra-ui/react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

//example of creating a mui dialog modal for creating new rows
const CategoryModal = ({
  open,
  columns,
  onClose,
  onSubmit,
  updateData,
  setUpdateData,
}) => {
  const handleSubmit = (event) => {
    //put your validation logic here

    onSubmit(updateData);
    onClose();
  };

  return (
    <Dialog open={open}>
      <form onSubmit={handleSubmit}>
        <DialogTitle textAlign="center">
          {updateData.original?.categoryId
            ? "Update Category"
            : "Create New Category"}
        </DialogTitle>
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
                column.accessorKey === "categoryId" ||
                column.accessorKey === "createdAt"
              )
                return;
              return (
                <TextField
                  key={column.accessorKey}
                  label={column.header}
                  name={column.accessorKey}
                  required
                  value={updateData.original?.[column.accessorKey]}
                  onChange={(e) => {
                    console.log(updateData.original);
                    setUpdateData((prevUpdateData) => {
                      return {
                        ...prevUpdateData,
                        original: {
                          ...prevUpdateData.original,
                          [e.target.name]: e.target.value,
                        },
                      };
                    });
                  }}
                />
              );
            })}
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: "1.25rem" }}>
          <Button onClick={onClose}>Cancel</Button>
          <Button color="secondary" type="submit" variant="contained">
            {updateData.original?.categoryId
              ? "Update Recipe"
              : "Create New Recipe"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
export default CategoryModal;
