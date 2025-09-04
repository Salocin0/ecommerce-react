import { BadgeCheck,BadgeAlert,Trash,Eye,EyeOff,SquarePen } from "lucide-react"
import useProducts from "../hooks/useProducts"


function TableProductList() {
    const {products,isLoading,error} = useProducts()

    if(isLoading) {
        return (<div>cargando...</div>)
    }

    if(error) {
        return (<div>error:{error}</div>)
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