import { Head } from "@inertiajs/react"
import Nav from "@/Components/Sales/Nav"
import { useState } from "react"
import Swal from "sweetalert2"

export default function Transaksi(props){
const food = props.food
const [uang, setUang] = useState(0)
const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
})

const resetCart = () => {
    localStorage.clear();
    setCart([])
}

const saveCart = () => {
     const cartSave = JSON.stringify(cart);
     localStorage.setItem('cart', cartSave);
     Swal.fire({
        icon: "success",
        title: "Sukses",
        text: "Bill berhasil disimpan!",
      }); 
}

const addToCart = (id) => {
    const selectedFood = food.find(item => item.id === id);
    if (selectedFood) {
      const existingFood = cart.findIndex(item => item.id === selectedFood.id);

      if (existingFood !== -1) {
        const updatedCart = [...cart];
        updatedCart[existingFood].quantity += 1;
        const harga = selectedFood.price;
        updatedCart[existingFood].price += harga;
        setCart(updatedCart);
      } else {
        const newItem = {
          id: selectedFood.id,
          name: selectedFood.name,
          price: selectedFood.price,
          quantity: 1,
          photo: selectedFood.photo
        };
        setCart(prevCart => [...prevCart, newItem]);
      }
    }
  };

  const calculateHarga = () => {
    return cart.reduce((total, item) => total + (item.price), 0);
  };

  const calculateKembalian = () => {
    const totalHarga = calculateHarga();
    if(uang > totalHarga){
    const kembalian = uang - totalHarga;
    return kembalian;
    }
  };

  const bayar = () => {
    const totalHarga = calculateHarga();
    if(uang == totalHarga || uang > totalHarga){
    const kembalian = uang - totalHarga;
    Swal.fire({
        icon: "success",
        title: "Sukses",
        text: "Pembayaran berhasil!",
      }) 
    localStorage.clear();
    setCart([])
    } else {
        Swal.fire({
            icon: "error",
            title: "Gagal",
            text: "Uang kurang!",
          }); 
    }
  }

    return(
        <>
        <Head title="Home" />
        <div className="min-h-screen bg-gray-100">
        <Nav/>
        <div className="py-12">

            <dialog id="my_modal_1" className="modal">
            <div className="modal-box bg-white">
                <div className="modal-action">
                <div class="grid grid-cols-3 gap-4">
                <div class="col-span-2">
                <div className="overflow-x-auto">
                <table className="table">
                <thead>
                    <th>#</th>
                    <th>Nama</th>
                    <th>Foto</th>
                    <th>Harga</th>
                </thead>
                    <tbody>
                    {cart.map((data,i) => (
                    <tr>
                        <td>{i + 1}</td>
                        <td>{data.name}</td>
                        <td><img className="w-12" src={`/storage/photos/${data.photo}`}/></td>
                        <td>{data.price}</td>
                    </tr>
                    ))}
                    </tbody>
                    </table>
                    </div>
                </div>
                <div>
                <form method="dialog" className="text-center">
                    <p className="mb-2 text-black font-bold">Total: Rp.{calculateHarga()}</p>
                    <p className="mb-2 text-black font-semibold">Uang Pembeli (Rp)</p>
                    <input type="number" placeholder="Jumlah uang" 
                    className="input input-bordered mt-2 mb-3 bg-white w-full max-w-xs"
                    onChange={(uang) => setUang(uang.target.value)} />
                    <button className="btn mr-2 btn-info text-white btn-sm"
                    onClick={() => bayar()}>Pay!</button>
                    <button className="btn btn-sm btn-ghost">Close</button>
                    <p className="text-red-500 btn-sm m-4">Kembalian: Rp.{calculateKembalian()}</p>
                </form> 
                </div>
                </div>
                </div>
            </div>
            </dialog>

                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="grid grid-cols-3 gap-4">
                <div class="col-span-2">
                <div class="grid grid-cols-3 gap-4">
                {food.map((data, i) => (
                <a href="#"
                onClick={() => addToCart(data.id)}
                key={i}>
                <div className="card w-30 rounded text-center text-capitalize card-compact mb-3 bg-base-100 shadow-sm">
                    <figure className="w-xl">
                    <img src={`/storage/photos/${data.photo}`}
                    alt={data.name} />
                    </figure>
                    <div className="card-body bg-white">
                        <h2 className="text-2xl font-semibold text-black">{data.name}</h2>
                        <p className="text-md text-sky-400">Rp.{data.price}</p>
                        <div className="card-actions justify-end">
                        </div>
                    </div>
                    </div>
                    </a>
                    ))}
                </div>

                </div>
                <div>
                <div className="card w-96 bg-white shadow-xl">
                <div className="card-body items-center text-center">
                <h2 className="card-title text-bold text-black">PESANAN</h2>
                <div className="overflow-x-auto">
                <table className="table">
                    <tbody>
                    {cart.length === 0 ? (
                    <>
                    <tr>
                        <td colSpan="4">Data kosong</td>
                    </tr>
                    </>
                    ) : (
                        <>
                    <div id="pdf-container">
                    {cart.map((data, i) => (
                    <tr>
                        <th><img className="w-16"
                        src={`/storage/photos/${data.photo}`} /></th>
                        <td>{data.name}</td>
                        <td>X{data.quantity}Rp.{data.price}</td>
                    </tr>
                    ))}
                    </div>
                    <button className="btn btn-outline mt-5 w-full btn-error"
                    onClick={() => resetCart()}>Clear cart</button>
                    <center>
                    <button className="text-white btn btn-accent mt-3 mr-3"
                    onClick={() => saveCart()}>Save bill</button>
                    <button className="text-white btn btn-accent mt-3">Print bill</button>
                    </center>
                    <button className="btn text-white mt-5 w-full btn-info"
                    onClick={()=>document.getElementById('my_modal_1').showModal()}>Charge Rp.{calculateHarga()}</button>
                    </>
                    )}
                    </tbody>
                </table>
                </div>
                </div>
                </div>
                </div>
                </div>
                </div>
                </div>
                </div>
        </>
    )
}