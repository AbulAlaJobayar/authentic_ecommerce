const ProductsPageSkeleton = () => {
  return (
   <div className="p-6 space-y-4 animate-pulse">
      <div className="h-10 w-1/3 bg-gray-200 rounded" />
      <div className="h-10 w-full bg-gray-200 rounded" />

      <div className="h-100 w-full bg-gray-200 rounded-xl" />

      <div className="h-10 w-1/2 bg-gray-200 rounded" />
    </div>
  );
};

export default ProductsPageSkeleton;