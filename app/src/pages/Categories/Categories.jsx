import React, { useEffect, useMemo, useState } from "react";
import CSSModules from "react-css-modules";
import styles from "./Categories.module.css";
import useFetch from "../../hooks/useFetch";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import CategoryModal from "../../components/CategoryModal/CategoryModal";
import { useDisclosure } from "@chakra-ui/react";
import MaterialReactTable from 'material-react-table';

const data = [
  {
    name: {
      firstName: "John",

      lastName: "Doe",
    },

    address: "261 Erdman Ford",

    city: "East Daphne",

    state: "Kentucky",
  },

  {
    name: {
      firstName: "Jane",

      lastName: "Doe",
    },

    address: "769 Dominic Grove",

    city: "Columbus",

    state: "Ohio",
  },

  {
    name: {
      firstName: "Joe",

      lastName: "Doe",
    },

    address: "566 Brakus Inlet",

    city: "South Linda",

    state: "West Virginia",
  },

  {
    name: {
      firstName: "Kevin",

      lastName: "Vandy",
    },

    address: "722 Emie Stream",

    city: "Lincoln",

    state: "Nebraska",
  },

  {
    name: {
      firstName: "Joshua",

      lastName: "Rolluffs",
    },

    address: "32188 Larkin Turnpike",

    city: "Charleston",

    state: "South Carolina",
  },
];

const Categories = () => {
  // const {loading, error, value} = useFetch("../../data/data.json", {});

  const { isOpen, onOpen, onClose } = useDisclosure();

  const columns = useMemo(
    () => [
      {
        accessorKey: "name.firstName", //access nested data with dot notation

        header: "First Name",
      },

      {
        accessorKey: "name.lastName",

        header: "Last Name",
      },

      {
        accessorKey: "address", //normal accessorKey

        header: "Address",
      },

      {
        accessorKey: "city",

        header: "City",
      },

      {
        accessorKey: "state",

        header: "State",
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
