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
import PostModal from "../../components/PostModal/PostModal";
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
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const Posts = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});

  const { loading, error, value } = useFetch(`${apiDomain()}/api/recipes`);

  useEffect(() => {
    setTableData(value);
  }, [value]);

  console.log(loading, error, value);

  const getCommonEditTextFieldProps = useCallback(
    (cell) => {
      return {
        error: !!validationErrors[cell.id],
        helperText: validationErrors[cell.id],
        onBlur: (event) => {
          const isValid =
            cell.column.id === "email"
              ? validateEmail(event.target.value)
              : cell.column.id === "age"
              ? validateAge(+event.target.value)
              : validateRequired(event.target.value);
          if (!isValid) {
            //set validation error for cell if invalid
            setValidationErrors({
              ...validationErrors,
              [cell.id]: `${cell.column.columnDef.header} is required`,
            });
          } else {
            //remove validation error for cell if valid
            delete validationErrors[cell.id];
            setValidationErrors({
              ...validationErrors,
            });
          }
        },
      };
    },
    [validationErrors]
  );
  //should be memoized or stable
  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        enableColumnOrdering: false,
        enableEditing: false, //disable editing on this column
        enableSorting: false,
        size: 80,
      },
      {
        accessorKey: "title",
        header: "Title",
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "author",
        header: "Author",
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "content",
        header: "Content",
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "category",
        header: "Category",
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "createdAt",
        header: "Created At",
        size: 80,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
    ],
    [getCommonEditTextFieldProps]
  );

  const handleCreateNewRow = async (values) => {
    console.log(values)
    try {
      const { data } = await axios.post(`${apiDomain()}/api/recipes`, {
        method: "POST",
        mode: "cors",
        body: values,
      });
      console.log(data);
    } catch (err) {
      console.log(err);
    }
    tableData.push(values);
    setTableData([...tableData]);
  };

  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    if (!Object.keys(validationErrors).length) {
      tableData[row.index] = values;
      //send/receive api updates here, then refetch or update local table data for re-render
      try {
        const { data } = await axios.put(
          `${apiDomain()}/api/recipes/${row.id}`,
          {
            method: "POST",
            mode: "cors",
            body: values,
          }
        );
        console.log(data);
      } catch (err) {
        console.log(err);
      }
      setTableData([...tableData]);
      exitEditingMode(); //required to exit editing mode and close modal
    }
  };

  const handleCancelRowEdits = () => {
    setValidationErrors({});
  };

  const handleDeleteRow = useCallback(
    async (row) => {
      if (
        !confirm(`Are you sure you want to delete ${row.getValue("title")}`)
      ) {
        return;
      }
      //send api delete request here, then refetch or update local table data for re-render
      try {
        const { data } = await axios.delete(
          `${apiDomain()}/api/recipes/${row.id}`,
          {
            method: "POST",
            mode: "cors",
          }
        );
        console.log(data);
      } catch (err) {
        console.log(err);
      }
      tableData.splice(row.index, 1);
      setTableData([...tableData]);
    },
    [tableData]
  );

  return (
    <Box mt={16} minHeight="100%">
      <MaterialReactTable
        displayColumnDefOptions={{
          "mrt-row-actions": {
            size: 120,
          },
        }}
        columns={columns}
        data={tableData}
        editingMode="modal" //default
        enableColumnOrdering
        enableEditing
        onEditingRowSave={handleSaveRowEdits}
        onEditingRowCancel={handleCancelRowEdits}
        renderRowActions={({ row, table }) => {
          return (
            <Box sx={{ display: "flex", gap: "1rem" }}>
              <Tooltip arrow placement="left" title="Edit">
                <IconButton onClick={() => table.setEditingRow(row)}>
                  <Edit />
                </IconButton>
              </Tooltip>
              <Tooltip arrow placement="right" title="Delete">
                <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                  <Delete />
                </IconButton>
              </Tooltip>
              <Tooltip arrow placement="right" title="View">
                <Link to={`/posts/${row.original.id}`}>
                  <IconButton color="primary">
                    <OpenInNewIcon />
                  </IconButton>
                </Link>
              </Tooltip>
            </Box>
          );
        }}
        renderTopToolbarCustomActions={() => (
          <button
            className="button is-primary mb-4 mt-4"
            onClick={() => setCreateModalOpen(true)}
          >
            Create Recipe
          </button>
        )}
      />
      <PostModal
        columns={columns}
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateNewRow}
      />
    </Box>
  );
};

export default Posts;
