import Tabs from "../components/Tabs"
import { useState } from "react"
import FormProducto from "../components/FormProducto"
import TableProductList from "../components/TableProductList"
import FormCategory from "../components/FormCategory"
import Estadisticas from "../components/Estadisticas"
function Dashboard (){
    const [activeTab,setActiveTab] = useState(1)
    return(
        <div className="flex justify-center bg-gray-700 min-h-screen pt-16">
            <div className=" bg-gray-900 rounded-2xl max-w-2xl w-full mx-4 py-4">
                <Tabs activeTab={activeTab} setActiveTab={setActiveTab}/>

                {activeTab==1 && <FormProducto/>}
                {activeTab==2 && <TableProductList/>}
                {activeTab==3 && <FormCategory/>}
                {activeTab===4 && <Estadisticas/>}
            </div>
        </div>
    )
}

export default Dashboard