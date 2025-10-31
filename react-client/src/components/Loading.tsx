export default function Loading() {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-sm'>
      <div className='h-14 w-14 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin'></div>
    </div>
  );
}
