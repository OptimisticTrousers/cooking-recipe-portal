import React, { useEffect, useMemo, useState } from "react";
import CSSModules from "react-css-modules";
import styles from "./Categories.module.css";
import useFetch from "../../hooks/useFetch";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import CategoryModal from "../../components/CategoryModal/CategoryModal";
import { Button, useDisclosure } from "@chakra-ui/react";
import MaterialReactTable from "material-react-table";

const data = [
  { id: 1, name: "Jon", description: "Description of thing" },
  { id: 2, name: "Cersei", description: "Description of thing" },
  { id: 3, name: "Jaime", description: "Description of thing" },
  { id: 4, name: "Arya", description: "Description of thing" },
  { id: 5, name: "Daenerys", description: "Description of thing" },
  { id: 6, name: "Melisandre", description: "Description of thing" },
  { id: 7, name: "Ferrara", description: "Description of thing" },
  { id: 8, name: "Rossini", description: "Description of thing" },
  { id: 9, name: "Harvey", description: "Description of thing" },
];

const Categories = () => {
  // const {loading, error, value} = useFetch("../../data/data.json", {});

  const { isOpen, onOpen, onClose } = useDisclosure();

  const columns = useMemo(
    () => [
      {
        accessorKey: "name", //access nested data with dot notation

        header: "Name",
      },

      {
        accessorKey: "description",

        header: "Description",
      },
      {
        accessorKey: "id",
        header: "Update",
        Cell: ({ cell }) => (
            <button className="button is-warning">Update</button>
        ),
      },
      {
        accessorKey: "id",
        header: "Delete",
        Cell: ({ cell }) => (
            <button className="button is-danger">Delete</button>
        ),
      },
    ],
    []
  );

  return (
    <div style={{ height: 400, width: "100%" }}>
      <button className="button is-primary mb-4 mt-4" onClick={onOpen}>
        Create Category
      </button>
      <MaterialReactTable columns={columns} data={data} />
      <CategoryModal isOpen={isOpen} onClose={onClose} />
    </div>
  );
};

export default CSSModules(Categories, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
