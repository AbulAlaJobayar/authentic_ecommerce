"use client"
import { useParams } from "next/navigation";
import InventoryContentPage from "./InventoryContent";

const InventoryDetails = () => {
   
    const params = useParams<{ id: string }>()
    return (
        <div>
            <InventoryContentPage id={params.id} />
        </div>
    );
};

export default InventoryDetails;
