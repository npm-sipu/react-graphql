import type { TUser } from "../schemas/user.schema";

interface UserProps {
  user: TUser;
}

export default function User({ user }: UserProps) {
  return (
    <div className='p-4 bg-white/90 backdrop-blur-sm shadow-md rounded-xl border border-gray-200 hover:shadow-lg hover:scale-[1.02] transition-all duration-200'>
      <div className='flex flex-col gap-2'>
        <h3 className='text-lg font-semibold text-gray-800'>{user.name}</h3>
        <p className='text-sm text-gray-600'>{user.email}</p>

        {user.role && (
          <span className='inline-block w-fit px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-600'>
            {user.role}
          </span>
        )}

        {user.createdAt && (
          <p className='text-xs text-gray-400 mt-1'>
            Joined: {new Date(user.createdAt).toLocaleDateString()}
          </p>
        )}
      </div>
    </div>
  );
}
