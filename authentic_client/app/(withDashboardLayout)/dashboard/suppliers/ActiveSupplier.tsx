/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import {  useUpdateSuppliersMutation } from "@/redux/api/suppliers";
import { toast } from "sonner";

const ActiveSuppliers = ({ id, open, setOpen }: { id: string; open: boolean; setOpen: (open: boolean) => void }) => {
    const [activateSuppliers] = useUpdateSuppliersMutation();
    const handleActivate = async () => {
        try {
            const res = await activateSuppliers({ id, data: { isDeleted: false } }).unwrap()
            console.log(res, "activate  response")
            if (res && res.success) {
                toast?.success(res.message || "Suppliers activated successfully");
                setOpen(false);
            }
            else {
                toast?.error(res.message || "Failed to activate suppliers");
                setOpen(false);
            }


        } catch (error: any) {
            toast.error(error?.message || "An error occurred while activating the suppliers");
            setOpen(false);
        }
    };

    return (
        <>
            {/* Popup */}
            {open && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50">
                    <div className="bg-white p-6 rounded shadow-md w-100">
                        <h2 className="text-lg font-semibold">Activate this supplier?</h2>
                        <p className="text-sm text-gray-500 mt-2">
                            This will permanently activate the supplier and restore all associated data.
                        </p>

                        <div className="flex justify-end gap-3 mt-5">
                            <button
                                onClick={() => setOpen(false)}
                                className="px-3 py-1 border rounded"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleActivate}
                                className="px-3 py-1 bg-green-600 text-white rounded"
                            >
                                Activate
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ActiveSuppliers;