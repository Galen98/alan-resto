import { Head } from "@inertiajs/react"
import Nav from "@/Components/Sales/Nav"
import TextInput from "@/Components/TextInput"
import { useState } from "react"
import { router } from "@inertiajs/react"
import InputError from "@/Components/InputError"

export default function AddFood(props){
const [name, setName] = useState('')
const [price, setPrice] = useState('')
const [photo, setPhoto] = useState('')

console.log(props)
const formSubmit = () =>{
const data = {
    name, price, photo
}
router.post("/food", data)
}

    return(
        <>
        <Head title="Home" />
        <div className="min-h-screen bg-gray-100">
        <Nav/>
        <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-sky-400">Tambahkan menu
                        <div className="m-6">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="nama">
                        Nama menu</label>
                        <input type="text"
                            className="rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight 
                            focus:outline-none focus:shadow-outline"
                            onChange={(name) => setName(name.target.value)}
                        />
                        <InputError message={props.errors.name}/>
                        </div>

                        <div className="mx-auto max-w-xs">
                        <label for="example5" className="mb-1 block text-sm font-medium text-gray-700">Upload foto</label>
                        <label className="flex w-full cursor-pointer appearance-none items-center 
                        justify-center rounded-md border-2 border-dashed 
                        border-gray-200 p-6 transition-all hover:border-primary-300">
                            <div className="space-y-1 text-center">
                            <div className="mx-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-6 w-6 text-gray-500">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                                </svg>
                            </div>
                            <div className="text-gray-600">
                            <a href="#" className="font-medium text-primary-500 hover:text-primary-700">
                            Click to upload</a></div>
                            <p className="text-sm text-gray-500">PNG or JPG</p>
                            </div>
                            <input id="example5" type="file" 
                            className="sr-only"
                            accept=".jpg, .jpeg, .png"
                            onChange={(photo) => setPhoto(photo.target.files[0])} />
                        </label>
                        <InputError message={props.errors.photo}/>
                        </div>

                        <div className="m-6">
                        <label for="price" class="block text-sm font-medium leading-6 text-gray-900">Price</label>
                        <div class="relative mt-2 rounded-md shadow-sm">
                            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <span class="text-gray-500 sm:text-sm">Rp.</span>
                            </div>
                            <input type="number" name="price" id="price" class="block w-full 
                            rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset 
                            ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 
                            sm:text-sm sm:leading-6" 
                            onChange={(price) => setPrice(price.target.value)}
                            placeholder="0.00"/>
                        </div>
                        <InputError message={props.errors.price}/>
                        </div>
                        </div>

                        <div className="flex md:flex md:flex-grow flex-row justify-end space-x-1">
                        <button class="m-6 bg-lime-600 hover:bg-lime-700 
                        text-white font-bold py-2 px-4 rounded"
                        onClick={() => formSubmit()}>
                        Simpan
                        </button>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
        </>
    )
}