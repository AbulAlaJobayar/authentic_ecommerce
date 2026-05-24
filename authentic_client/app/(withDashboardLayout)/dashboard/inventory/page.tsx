import { Suspense } from 'react';
import ProductsPageSkeleton from '../product/component/ProductsPageSkeleton';
import InventoryPageContent from './InventoryPageContent';

const InventoryPage = () => {
    return (
      
         
        <Suspense fallback={<ProductsPageSkeleton />}>
            <InventoryPageContent/>
        </Suspense>
       
    );
};

export default InventoryPage;