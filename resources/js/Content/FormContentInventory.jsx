import TextInput from "@/Components/TextInput";
import { Fragment, useEffect } from "react";

export default function FormContentInventory({ action, setData, data, errors, title, defaultValue, children }) {
    if (action === 'DETAIL') {
        useEffect(() => {
            if (defaultValue) {
                setData(prev => ({
                    ...prev,
                    in_date: defaultValue.in_date,
                    in_name: defaultValue.in_name,
                    in_stock: defaultValue.in_stock,
                    in_harga_beli: defaultValue.in_harga_beli,
                    in_status: defaultValue.in_status,
                }))
            }
        }, [defaultValue]);
        return (
            <div>
                <div class="px-4 py-2 sm:px-0">
                    <h3 class="text-lg leading-6 font-medium text-gray-900 text-left border-b-2">
                        Edit Inventory
                    </h3>
                    {children}
                </div>
                <fieldset disabled>
                    <FormData setData={setData} data={data} errors={errors} />
                </fieldset>
            </div>
        )
    }

    if (action === 'TAMBAH') {
        useEffect(() => {
            if (defaultValue) {
                setData(prev => ({
                    ...prev,
                    in_date: '',
                    in_name: '',
                    in_stock: '',
                    in_harga_beli: '',
                    in_status: '',
                }))
            }
        }, [defaultValue]);

        return (
            <div>
                <div class="px-4 py-2 sm:px-0">
                    <h3 class="text-lg leading-6 font-medium text-gray-900 text-left border-b-2">
                        Tambah Inventory
                    </h3>
                    {children}
                </div>
                <FormData data={data} setData={setData} errors={errors} />
                <button type="submit" class="btn btn-primary mt-3 text-white">Simpan</button>
            </div>
        )
    }
    if (action === 'EDIT') {
        useEffect(() => {
            if (defaultValue) {
                setData(prev => ({
                    ...prev,
                    in_date: defaultValue.in_date,
                    in_name: defaultValue.in_name,
                    in_stock: defaultValue.in_stock,
                    in_harga_beli: defaultValue.in_harga_beli,
                    in_status: defaultValue.in_status,
                }))
            }
        }, [defaultValue]);
        return (
            <div>
                <div class="px-4 py-2 sm:px-0">
                    <h3 class="text-lg leading-6 font-medium text-gray-900 text-left border-b-2">
                        Edit Inventory
                    </h3>
                    {children}
                </div>
                <FormData setData={setData} data={data} errors={errors} />
                <button type="submit" class="btn btn-success mt-3 text-white">Simpan</button>
            </div>
        )
    }
}
function FormData({ setData, data, errors }) {
    return (
        <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col gap-1.5">
                    <label htmlFor="in_date" className="text-sm font-medium text-gray-700">
                        Tanggal
                    </label>
                    <TextInput
                        type="date"
                        id="in_date"
                        defaultValue={data.in_date ?? ''}
                        onChange={(e) => setData('in_date', e.target.value)}
                        className={`w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm ${errors.in_date ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500' : ''}`}
                    />
                    {errors.in_date && <span className="text-xs text-rose-600 mt-0.5 font-medium">{errors.in_date}</span>}
                </div>

                <div className="flex flex-col gap-1.5 md:col-span-2">
                    <label htmlFor="in_name" className="text-sm font-medium text-gray-700">
                        Nama Produk
                    </label>
                    <TextInput
                        id="in_name"
                        placeholder="Masukkan nama produk..."
                        defaultValue={data.in_name ?? ''}
                        onChange={(e) => setData('in_name', e.target.value)}
                        className={`w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm ${errors.in_name ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500' : ''}`}
                    />
                    {errors.in_name && <span className="text-xs text-rose-600 mt-0.5 font-medium">{errors.in_name}</span>}
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col gap-1.5">
                    <label htmlFor="in_stock" className="text-sm font-medium text-gray-700">
                        Stok
                    </label>
                    <TextInput
                        type="number"
                        id="in_stock"
                        placeholder="Masukkan stok..."
                        defaultValue={data.in_stock ?? ''}
                        onChange={(e) => setData('in_stock', e.target.value)}
                        className={`w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm ${errors.in_stock ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500' : ''}`}
                    />
                    {errors.in_stock && <span className="text-xs text-rose-600 mt-0.5 font-medium">{errors.in_stock}</span>}
                </div>

                <div className="flex flex-col gap-1.5">
                    <label htmlFor="in_harga_beli" className="text-sm font-medium text-gray-700">
                        Harga Beli
                    </label>
                    <TextInput
                        type="number"
                        id="in_harga_beli"
                        placeholder="Masukkan harga beli..."
                        defaultValue={data.in_harga_beli ?? ''}
                        onChange={(e) => setData('in_harga_beli', e.target.value)}
                        className={`w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm ${errors.in_harga_beli ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500' : ''}`}
                    />
                    {errors.in_harga_beli && <span className="text-xs text-rose-600 mt-0.5 font-medium">{errors.in_harga_beli}</span>}
                </div>

                <div className="flex flex-col gap-1.5">
                    <label htmlFor="in_status" className="text-sm font-medium text-gray-700">
                        Status
                    </label>
                    <select
                        id="in_status"
                        value={data.in_status ?? ''}
                        onChange={(e) => setData('in_status', e.target.value)}
                        className={`w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm ${errors.in_status ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500' : ''}`}
                    >
                        <option value="">Pilih status</option>
                        <option value="Tersedia">Tersedia</option>
                        <option value="Tidak Tersedia">Tidak Tersedia</option>
                    </select>
                    {errors.in_status && <span className="text-xs text-rose-600 mt-0.5 font-medium">{errors.in_status}</span>}
                </div>
            </div>
        </div>
    )
}
