import { useQuery } from "@tanstack/react-query";

import Loading from "./Loading";

import { getLocationTree } from "../services/api.service";
import LocationTree from "./LocationTree";

export default function UsersList() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users"],
    queryFn: getLocationTree,
  });

  if (isLoading) return <Loading />;

  if (isError)
    return (
      <div className='flex h-screen items-center justify-center'>
        <p className='text-red-600 font-medium'>
          Something went wrong: {(error as Error)?.message || "Unknown error"}
        </p>
      </div>
    );

  console.log(data);

  return (
    <div className='p-6'>
      <h2 className='text-2xl font-semibold mb-4 text-center'>data</h2>

      <LocationTree data={data?.locationTree ?? []} />
    </div>
  );
}
