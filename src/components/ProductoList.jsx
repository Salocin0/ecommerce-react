import ProductCard from "./ProductCard"
function ProductList({products}){
    return <div>{products.map((product)=>(
        <ProductCard product={product} key={product.id}/>
    ))}</div>
}

export default ProductList