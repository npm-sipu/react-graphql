import { useQuery } from "@tanstack/react-query";
import {
  getLocationTree,
  getUsers,
  type UserFilters,
} from "../../services/api.service";

import AddEditUserModal from "../AddEditUserModal";
import { useState } from "react";
import UsersTable, { type User } from "../UsersTable";
import LocationTree from "../LocationTree";
import { Backdrop, Button, CircularProgress } from "@mui/material";

export default function HomePage() {
  const {
    data: locationData,
    isLoading: isLocationLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["location"],
    queryFn: getLocationTree,
  });

  const [filters, setFilters] = useState<UserFilters>({});

  const [editOpen, setEditOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);

  const [userDetails, setUserDetails] = useState<User>();

  const handleOpenAddEdit = () => setAddOpen(true);
  const handleCloseAddEdit = () => setAddOpen(false);

  const handleOpenEdit = () => setEditOpen(true);
  const handleCloseEdit = () => setEditOpen(false);

  const handleUpdateUser = (userData: User) => {
    handleOpenEdit();
    setUserDetails(userData);
  };

  const {
    data: usersData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users", filters],
    queryFn: () => getUsers(filters),
    enabled: true,
  });

  const reloadData = () => {
    refetch();
  };

  const handleSelect = (type: string, id: string) => {
    if (type === "country") {
      setFilters({ countryId: id });
    } else if (type === "state") {
      setFilters({ stateId: id });
    } else {
      setFilters({ cityId: id });
    }
  };

  if (isError)
    return (
      <div className='flex h-screen items-center justify-center'>
        <p className='text-red-600 font-medium'>
          Something went wrong: {(error as Error)?.message || "Unknown error"}
        </p>
      </div>
    );

  return (
    <div className='w-full flex items-start max-h-screen'>
      <div className='flex flex-col w-[20%] justify-start gap-2 items-start'>
        <div className='flex justify-end'>
          <Button variant='outlined' size='small' onClick={handleOpenAddEdit}>
            Create
          </Button>
        </div>

        <LocationTree
          onSelect={handleSelect}
          data={locationData?.locationTree ?? []}
        />
      </div>

      <div className='flex flex-1 w-[80vw] overflow-x-auto'>
        <UsersTable
          onEdit={handleUpdateUser}
          users={usersData?.users as User[]}
        />
      </div>

      <AddEditUserModal
        type={"edit"}
        defaultData={userDetails}
        reloadData={reloadData}
        open={editOpen}
        onClose={handleCloseEdit}
      />

      <AddEditUserModal
        reloadData={reloadData}
        open={addOpen}
        onClose={handleCloseAddEdit}
        type={"add"}
      />

      <Backdrop
        sx={(theme) => ({
          color: "#fff",
          zIndex: theme.zIndex.drawer + 1,
        })}
        open={isLoading || isLocationLoading}
      >
        <CircularProgress color='primary' />
      </Backdrop>
    </div>
  );
}
