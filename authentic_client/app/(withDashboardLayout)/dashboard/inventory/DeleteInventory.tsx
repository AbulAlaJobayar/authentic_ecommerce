/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useDeleteInventoryMutation } from "@/redux/api/inventory";
import { toast } from "sonner";

const DeleteInventory = ({ id, open, setOpen }: { id: string; open: boolean; setOpen: (open: boolean) => void }) => {
  const [DeleteInventory] = useDeleteInventoryMutation();
  const handleDelete = async () => {
    try {
      const res = await DeleteInventory(id).unwrap()
      console.log(res, "delete response")
      if (res && res.success) {
        toast?.success(res.message || "Inventory deleted successfully");
        setOpen(false);
      }
      else {
        toast?.error(res.message || "Failed to delete inventory");
        setOpen(false);
      }


    } catch (error: any) {
      toast.error(error?.message || "An error occurred while deleting the Inventory");
      setOpen(false);
    }
  };

  return (
    <>
      {/* Popup */}
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded shadow-md w-100">
            <h2 className="text-lg font-semibold">Delete this Inventory?</h2>
            <p className="text-sm text-gray-500 mt-2">
              This will permanently remove the Inventory and all associated data.
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

export default DeleteInventory;