import React from "react";
import Box from "@mui/material/Box";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import { z } from "zod";

// ZOD SCHEMA FOR A SINGLE USER
export const UserSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  dob: z.string(),
  role: z.string(),
  createdAt: z.string(),
  country: z.object({
    id: z.string(),
    name: z.string(),
  }),
  state: z.object({
    id: z.string(),
    name: z.string(),
  }),
  city: z.object({
    id: z.string(),
    name: z.string(),
  }),
});

// ZOD SCHEMA FOR FULL RESPONSE
export const UsersResponseSchema = z.object({
  users: z.array(UserSchema),
});

export type User = z.infer<typeof UserSchema>;

interface UsersTableProps {
  users: User[];
  onEdit?: (user: User) => void;
}

const UsersTable: React.FC<UsersTableProps> = ({ users, onEdit }) => {
  const columns: GridColDef<User>[] = [
    {
      field: "firstName",
      headerName: "First Name",
      flex: 1,
    },
    {
      field: "lastName",
      headerName: "Last Name",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1.5,
    },
    {
      field: "dob",
      headerName: "Date of Birth",
      flex: 1,
      valueGetter: (_, row) => new Date(row.dob).toLocaleDateString(),
    },
    {
      field: "role",
      headerName: "Role",
      flex: 1,
    },
    {
      field: "country",
      headerName: "Country",
      flex: 1,
      valueGetter: (_, row) => row?.country?.name,
    },
    {
      field: "state",
      headerName: "State",
      flex: 1,
      valueGetter: (_, row) => row?.state?.name,
    },
    {
      field: "city",
      headerName: "City",
      flex: 1,
      valueGetter: (_, row) => row?.city?.name,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      flex: 1.2,
      valueGetter: (_, row) =>
        new Date(row.createdAt).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 80,
      renderCell: (params) => (
        <IconButton onClick={() => onEdit?.(params.row)}>
          <EditIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <Box sx={{ height: 600, width: "100%" }}>
      <DataGrid
        rows={users}
        columns={columns}
        getRowId={(row) => row.id}
        pageSizeOptions={[5, 10, 20]}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
      />
    </Box>
  );
};

export default UsersTable;
