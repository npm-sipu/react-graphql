import { useQuery } from "@tanstack/react-query";
import { usersData } from "../services/baseApi";
import type { TUser } from "../schemas/user.schema";
import Loading from "./Loading";
import User from "./User";

export default function UsersList() {
  const { data, isLoading, isError, error } = useQuery<{ users: TUser[] }>({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await usersData();
      return res;
    },
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

  if (!data?.users || data.users.length === 0)
    return (
      <div className='flex h-screen items-center justify-center'>
        <p className='text-gray-500 text-lg'>No users found.</p>
      </div>
    );

  return (
    <div className='p-6'>
      <h2 className='text-2xl font-semibold mb-4 text-center'>User List</h2>
      <ul className='grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {data.users.map((user) => (
          <User user={user} />
        ))}
      </ul>
    </div>
  );
}
