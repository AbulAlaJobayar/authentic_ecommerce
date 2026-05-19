import { Suspense } from "react";
import ProductsPageSkeleton from "./component/ProductsPageSkeleton";
import ProductsPageContent from "./component/ProductsPageContent";

const ProductPage = () => {
    return (

        <Suspense fallback={<ProductsPageSkeleton />}>
            <ProductsPageContent/>
        </Suspense>

    );
}
export default ProductPage;