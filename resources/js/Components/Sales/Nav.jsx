import NavLink from '@/Components/NavLink';
import { Link } from '@inertiajs/react';
export default function Nav(){

    return(
        <>
        <div className="bg-sky-400 shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <div className="shrink-0 flex items-center">
                        <Link href="/">Alan Resto</Link>
                    </div>
                </div>
                </div>
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink href={route('home')} active={route().current('home')}>
                                    Food
                                </NavLink>
                                <NavLink href={route('transaksi')} active={route().current('transaksi')}>
                                    Transaksi
                                </NavLink>
                            </div>
                </div>
            </header>
        </>
    )
}