import { useQuery } from "@tanstack/react-query";
import {
  getLocationTree,
  getUsers,
  type UserFilters,
} from "../../services/api.service";
import Loading from "../Loading";
// import AddEditUserModal from "../AddEditUserModal";
import { useState } from "react";
import UsersTable, { type User } from "../UsersTable";
import LocationTree from "../LocationTree";

export default function HomePage() {
  const {
    data: locationData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["location"],
    queryFn: getLocationTree,
  });

  const [filters, setFilters] = useState<UserFilters>({});

  const { data: usersData } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(filters),
    enabled: true,
  });

  const handleSelect = (type: string, id: string) => {
    if (type === "country") {
      setFilters({ countryId: id });
    } else if (type === "state") {
      setFilters({ stateId: id });
    } else {
      setFilters({ cityId: id });
    }
  };

  console.log("usersData", usersData);
  console.log("locationData", locationData);

  if (isLoading) return <Loading />;

  if (isError)
    return (
      <div className='flex h-screen items-center justify-center'>
        <p className='text-red-600 font-medium'>
          Something went wrong: {(error as Error)?.message || "Unknown error"}
        </p>
      </div>
    );

  return (
    <div className='w-full flex'>
      <LocationTree data={locationData?.locationTree ?? []} />

      <UsersTable users={usersData?.users as User[]} />
      {/* <AddEditUserModal open={false} onClose={() => {}} /> */}
    </div>
  );
}
