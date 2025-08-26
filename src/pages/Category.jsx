import { useEffect,useState } from "react"
import { useParams } from "react-router-dom"
import ProductList from "../components/ProductoList"
function Category(){
    const {category} = useParams()
    const [products,setProducts] = useState([])

    useEffect(()=>{
        pedirProductosPorCategoria()
    },[category])

    async function pedirProductosPorCategoria(){
        if(category){
            const res = await fetch(`https://fakestoreapi.com/products/category/${category}`)
            const data = await res.json()
            setProducts(data)
        }
    }

    return <div className="pt-12">
        <h1 className="text-2xl">
            {category }
        </h1>
        {
            products.length>0 && <ProductList products={products}/>
        }
        
    </div>
}

export default Category