import { Head } from "@inertiajs/react"
import Nav from "@/Components/Sales/Nav"
import { Link } from "@inertiajs/react"
import TableFood from "@/Components/Sales/TableFood"
import Swal from "sweetalert2"

export default function Home(props){
    console.log(props)
    const message = props.flash.message
    if(message != null){
        Swal.fire({
            icon: "success",
            title: "Sukses",
            text: message,
          });
    }
    return(
        <>
        <Head title="Home" />
        <div className="min-h-screen bg-gray-100">
        <Nav/>
        <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-sky-400">
                        <Link
                        href={route('food.create')} as="button" 
                        method="GET"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Tambah menu
                        </Link>
                        <TableFood data={props.food}/>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
        </>
    )
}