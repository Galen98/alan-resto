import { Link } from "@inertiajs/react"

const TableFood = (data) =>{
console.log(data)
const food = data.data

    return(
        <>
 <div className="overflow-x-auto">
  <table className="table text-gray-500 m-6 p-6">
    <thead>
      <tr>
        <th></th>
        <th>Nama</th>
        <th>Foto</th>
        <th>Harga</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
    {food.length === 0 ? (
  <tr>
    <td colSpan="5">Data kosong</td>
  </tr>
    ) : (
    food.map((item, index) => (
        <tr key={index}>
        <th>{index + 1}</th>
        <td>{item.name}</td>
        <td><div className="avatar">
        <div className="w-20 rounded">
        <img src={`/storage/photos/${item.photo}`} />
        </div>
        </div></td>
        <td>Rp.{item.price}</td>
        <td>
            <Link 
            className="btn btn-error rounded btn-sm 
            rounded-xl text-white"
            href={route('food.delete')} as="button" 
            method="POST" data={{id:item.id}}>Hapus</Link>
        </td>
        </tr>
    ))
    )}
    </tbody>
  </table>
</div>
        </>
    )
}

export default TableFood