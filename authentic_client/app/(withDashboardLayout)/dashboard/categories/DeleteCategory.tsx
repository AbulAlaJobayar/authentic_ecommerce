/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useDeleteCategoryMutation } from "@/redux/api/categorieApi";
import { toast } from "sonner";

const DeleteCategory = ({ id, open, setOpen }: { id: string; open: boolean; setOpen: (open: boolean) => void }) => {
  const [deleteCategory] = useDeleteCategoryMutation();
  const handleDelete = async () => {
    try {
      const res = await deleteCategory(id).unwrap()
      console.log(res, "delete response")
      if (res && res.success) {
        toast?.success(res.message || "Category deleted successfully");
        setOpen(false);
      }
      else {
        toast?.error(res.message || "Failed to delete category");
        setOpen(false);
      }


    } catch (error: any) {
      toast.error(error?.message || "An error occurred while deleting the category");
      setOpen(false);
    }
  };

  return (
    <>
      {/* Popup */}
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded shadow-md w-100">
            <h2 className="text-lg font-semibold">Delete this category?</h2>
            <p className="text-sm text-gray-500 mt-2">
              This will permanently remove the category and all associated data.
            </p>

            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={() => setOpen(false)}
                className="px-3 py-1 border rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="px-3 py-1 bg-red-600 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteCategory;