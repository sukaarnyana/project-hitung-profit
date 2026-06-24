import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from "@inertiajs/react";
import { useState } from "react";
import { ModalView } from "@/Components/ModalView";
import FormContentSales from '@/Content/FormContentSales';
import toast, { Toaster } from 'react-hot-toast';


export default function IndexSales(props) {
    console.log('isi props', props);

    const [searchTerm, setSearchTerm] = useState("");
    const salesData = props.dataSales;

    const filteredSales = salesData.filter((sales) =>
        sales.sm_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sales.sm_date.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const [openModal, setOpenModal] = useState({
        isOpen: false,
        action: '',
        dataSales: '',
        title: '',
    });

    console.log('is open', openModal.isOpen);


    const { data, setData, post, processing, errors, reset, delete: destroy, put, clearErrors } = useForm({
        sm_date: '',
        sm_name: '',
        sm_source: '',
        sm_hpp: '',
        sm_jual: '',
        sm_qty: '',
    });


    const closeModal = () => {
        reset();
        setOpenModal(prev => ({ ...prev, isOpen: false }));
        clearErrors();
    }

    const handleTambah = (e) => {
        e.preventDefault();
        console.log('masuk sini');

        post('/sales', {
            onSuccess: () => {
                reset();
                toast.success('Sukses Ditambah', {
                    style: {
                        border: '1px solid #713200',
                        padding: '16px',
                        color: '#713200',
                    },
                    iconTheme: {
                        primary: '#713200',
                        secondary: '#FFFAEE',
                    },
                });
                closeModal();
            },
            onError: () => {
                toast.error('Gagal Menyimpan');
            }
        });
    };
    const handleEdit = (e) => {
        e.preventDefault();
        put(`/sales/${openModal.dataSales.sm_id}`, {
            onSuccess: () => {
                toast.success('Sukses Diubah');
                closeModal();
            },
            onError: () => {
                toast.error('Gagal Menyimpan');
            }
        });
    };

    const handleDelete = (id) => {
        //bsok tambahin comfirmation dialog
        destroy(`/sales/${id}`, {
            onSuccess: () => {
                toast.success('Sukses Di Hapus');
                closeModal();
            },
            onError: () => {
                toast.error('Gagal Di Hapus');
            }
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <h2 className="text-xl font-bold leading-tight text-gray-800">
                        Sales Management
                    </h2>
                    <button onClick={() => setOpenModal(prev => ({ ...prev, isOpen: true, action: 'TAMBAH', dataSales: '', title: 'Tambah Data Sales' }))}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Add New Sales
                    </button>
                </div>
            }
        >
            <Toaster />
            <Head title="Sales List" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-4">
                    <div className="flex items-center justify-end">
                        <div className="relative w-full max-w-md">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.603 10.602Z" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                placeholder="Search by name or job..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition-all placeholder:text-gray-400"
                            />
                        </div>
                    </div>

                    <div className="bg-white border border-gray-100 shadow-sm rounded-xl overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-gray-100 bg-gray-50/75 text-xs font-semibold uppercase tracking-wider text-gray-500">
                                        <th className="px-6 py-4 text-center w-16">ID</th>
                                        <th className="px-6 py-4">Product Name</th>
                                        <th className="px-6 py-4">Date</th>
                                        <th className="px-6 py-4">Buy Price</th>
                                        <th className="px-6 py-4">Stock</th>
                                        <th className="px-6 py-4 text-center w-40">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 text-sm text-gray-600">
                                    {filteredSales.length > 0 ? (
                                        filteredSales.map((sales) => (
                                            <tr key={sales.sm_id} className="hover:bg-gray-50/50 transition-colors">
                                                <td className="px-6 py-4 font-medium text-gray-400 text-center">{sales.sm_id}</td>
                                                <td className="px-6 py-4 font-semibold text-gray-900">{sales.sm_name}</td>
                                                <td className="px-6 py-4 text-gray-500">{sales.sm_date}</td>
                                                <td className="px-6 py-4">{sales.sm_hpp}</td>
                                                <td className="px-6 py-4">{sales.sm_qty}</td>
                                                <td className="px-6 py-4 text-center">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <button onClick={() => setOpenModal(prev => ({ ...prev, isOpen: true, action: 'DETAIL', dataSales: sales, title: 'Detail Data Sales' }))}
                                                            title="Detail" className="p-1.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                            </svg>
                                                        </button>

                                                        <button onClick={() => setOpenModal(prev => ({ ...prev, isOpen: true, action: 'EDIT', dataSales: sales, title: 'Edit Data Sales' }))}
                                                            title="Edit" className="p-1.5 text-gray-500 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                            </svg>
                                                        </button>

                                                        <button onClick={() => handleDelete(sales.sm_id)}
                                                            title="Delete" className="p-1.5 text-gray-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="px-6 py-10 text-center text-sm text-gray-400 italic">
                                                No sales data found matching "{searchTerm}"
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
            {openModal.action === 'TAMBAH' &&
                <ModalView openModal={openModal.isOpen} data={openModal.data} closeModal={() => closeModal()}>
                    <form onSubmit={handleTambah}>
                        <FormContentSales action={openModal.action} setData={setData} data={data} errors={errors} title={openModal.action} defaultValue={openModal.dataSales} />
                    </form>
                </ModalView>
            }
            {openModal.action === 'EDIT' &&
                <ModalView openModal={openModal.isOpen} data={openModal.data} closeModal={() => closeModal()}>
                    <form onSubmit={handleEdit}>
                        <FormContentSales title={openModal.action} data={data} setData={setData} defaultValue={openModal.dataSales} action={openModal.action} errors={errors} />
                    </form>
                </ModalView>
            }
            {openModal.action === 'DETAIL' &&
                <ModalView openModal={openModal.isOpen} data={openModal.data} closeModal={() => closeModal()}>
                    <form>
                        <FormContentSales title={openModal.action} data={data} setData={setData} defaultValue={openModal.dataSales} action={openModal.action} errors={errors} />
                    </form>
                </ModalView>
            }
        </AuthenticatedLayout >
    );
}