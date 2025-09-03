import { useState } from "react"
import { BadgeCheck,BadgeAlert,Trash,Eye,EyeOff,SquarePen } from "lucide-react"


function TableProductList() {
    const [products,setProducts] = useState([])

    useState(()=>{
        pedirProductos()
    },[])

    async function pedirProductos(){
        const res = await fetch(`https://fakestoreapi.com/products/`)
        const data = await res.json()
        setProducts(data)
    }


    return <div className="text-white">
        <table>
            <thead>
                <tr> 
                    <th>Product</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>State</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product)=>(
                    <tr>
                        <td>{product?.title}</td>
                        <td>{product?.price}</td>
                        <td>{product?.category}</td>
                        <td>{product?.title ? <BadgeCheck size={18}/> : <BadgeAlert size={18}/>}</td>
                        <td>
                            <button><Trash size={18}/></button>
                            <button><EyeOff size={18}/></button>
                            <button><SquarePen size={18}/></button>
                        </td>
                    </tr>  
                ))}
            </tbody>
        </table>
    </div>
}

export default TableProductList