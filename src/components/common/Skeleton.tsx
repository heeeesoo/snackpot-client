
export default function Skeleton() {
    return (
      <div role="status" className="w-9xl animate-pulse">
        <div className="h-[100px] bg-gray-200 rounded-[16px] w-full mb-4"></div>
        <div className="h-[100px] bg-gray-200 rounded-[16px] w-full mb-4"></div>
        <span className="sr-only">Loading...</span>
    </div>
    );
  }
  