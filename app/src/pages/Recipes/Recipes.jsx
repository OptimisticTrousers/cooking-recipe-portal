import React, { useCallback, useEffect, useMemo, useState } from "react";
import MaterialReactTable from "material-react-table";
import {
  Box,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Link } from "react-router-dom";
import RecipeModal from "../../components/RecipeModal/RecipeModal";
import "bulma/css/bulma.min.css";
import {
  apiDomain,
} from "../../utils/utils";
import useFetch from "../../hooks/useFetch";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const Recipes = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
<<<<<<< HEAD
  const [tableData, setTableData] = useState();
=======
  const [tableData, setTableData] = useState([]);
>>>>>>> e5c17472178c64d9fc6fdfa4f95a8db5cc600e99
  const [validationErrors, setValidationErrors] = useState({});

  const { loading, error, value } = useFetch(`${apiDomain()}/api/recipes`);

<<<<<<< HEAD
  console.log(loading, error, value);
=======
  useEffect(() => {
    setTableData(value);
  }, [value]);
>>>>>>> e5c17472178c64d9fc6fdfa4f95a8db5cc600e99

  //should be memoized or stable
  const columns = useMemo(
    () => [
      {
        accessorKey: "recipeId",
        header: "ID",
        enableColumnOrdering: false,
        enableEditing: false, //disable editing on this column
        enableSorting: false,
        size: 80,
      },
      {
        accessorKey: "recipeTitle",
        header: "Title",
        size: 140,
      },
      {
        accessorKey: "recipeAuthor",
        header: "Author",
        size: 140,
      },
      {
        accessorKey: "recipeContent",
        header: "Content",
        size: 140,
      },
      {
        accessorKey: "recipeCategory",
        header: "Category",
        size: 140,
      },
      {
        accessorKey: "createdAt",
        header: "Created At",
        size: 80,
      },
    ],
    []
  );

  const [currentRow, setCurrentRow] = useState(() =>
    columns.reduce((acc, column) => {
      acc[column.accessorKey ?? ""] = "";
      return acc;
    }, {})
  );

  const currentRowData = currentRow.original;

  const handleCreateNewRow = async (values) => {
    values.recipeId = uuidv4();
    values.createdAt = Date.now();
    try {
      const { data } = await axios.post(`${apiDomain()}/api/recipes`, values);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
    tableData.push(values);
    setTableData([...tableData]);
  };

  const handleSaveRowEdits = async (values) => {
    if (!Object.keys(validationErrors).length) {
      tableData[currentRow.index] = values;
      //send/receive api updates here, then refetch or update local table data for re-render
      try {
        const { data } = await axios.put(
          `${apiDomain()}/api/recipes/${currentRowData.recipeId}`,
          values
        );
        console.log(data);
      } catch (err) {
        console.log(err);
      }
      setTableData([...tableData]);
    }
  };

  const handleCancelRowEdits = () => {
    setValidationErrors({});
  };

  const handleDeleteRow = useCallback(
    async (row) => {
      if (
        !confirm(
          `Are you sure you want to delete ${row.getValue("recipeTitle")}`
        )
      ) {
        return;
      }
      // send api delete request here, then refetch or update local table data for re-render
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
                <IconButton
                  onClick={() => {
                    setCreateModalOpen(true);
                    setCurrentRow({ index: row.index, original: row.original });
                  }}
                >
                  <Edit />
                </IconButton>
              </Tooltip>
              <Tooltip arrow placement="right" title="Delete">
                <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                  <Delete />
                </IconButton>
              </Tooltip>
              <Tooltip arrow placement="right" title="View">
                <Link to={`/recipes/${row.original.recipeId}`}>
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
      <RecipeModal
        columns={columns}
        open={createModalOpen}
        onClose={() => {
          setCreateModalOpen(false);
          setCurrentRow((prevData) => {
            return {
              ...prevData,
              original: columns.reduce((acc, column) => {
                acc[column.accessorKey ?? ""] = "";
                return acc;
              }, {}),
            };
          });
        }}
        onSubmit={
          currentRow.original?.recipeId
            ? handleSaveRowEdits
            : handleCreateNewRow
        }
        currentRowData={currentRowData}
        setCurrentRow={setCurrentRow}
      />
    </Box>
  );
};

export default Recipes;
