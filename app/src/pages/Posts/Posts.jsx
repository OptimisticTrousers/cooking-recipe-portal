import React, { useEffect, useMemo, useState } from "react";
import CSSModules from "react-css-modules";
import styles from "./Posts.module.css";
import useFetch from "../../hooks/useFetch";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { useDisclosure } from "@chakra-ui/react";
import PostModal from "../../components/PostModal/PostModal";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import MaterialReactTable from "material-react-table";

//nested data is ok, see accessorKeys in ColumnDef below

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

const Posts = () => {
  //should be memoized or stable
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
  ); // const {loading, error, value} = useFetch("../../data/data.json", {});
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <div style={{ height: 400, width: "100%" }}>
        <button className="button is-primary mb-4 mt-4" onClick={onOpen}>
          Create Post
        </button>
        <MaterialReactTable columns={columns} data={data} />
        <PostModal isOpen={isOpen} onClose={onClose} />
      </div>
    </>
  );
};

export default CSSModules(Posts, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
