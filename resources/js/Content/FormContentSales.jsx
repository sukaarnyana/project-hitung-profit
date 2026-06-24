import TextInput from "@/Components/TextInput";
import { Fragment, useEffect } from "react";

export default function FormContentSales({ action, setData, data, errors, title, defaultValue, children }) {
    if (action === 'DETAIL') {
        useEffect(() => {
            if (defaultValue) {
                setData(prev => ({
                    ...prev,
                    sm_date: defaultValue.sm_date,
                    sm_name: defaultValue.sm_name,
                    sm_source: defaultValue.sm_source,
                    sm_hpp: defaultValue.sm_hpp,
                    sm_jual: defaultValue.sm_jual,
                    sm_qty: defaultValue.sm_qty,
                }))
            }
        }, [defaultValue]);
        return (
            <div>
                <div class="px-4 py-2 sm:px-0">
                    <h3 class="text-lg leading-6 font-medium text-gray-900 text-left border-b-2">
                        Edit Sales
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
                    sm_date: '',
                    sm_name: '',
                    sm_source: '',
                    sm_hpp: '',
                    sm_jual: '',
                    sm_qty: '',
                }))
            }
        }, [defaultValue]);

        return (
            <div>
                <div class="px-4 py-2 sm:px-0">
                    <h3 class="text-lg leading-6 font-medium text-gray-900 text-left border-b-2">
                        Tambah Sales
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
                    sm_date: defaultValue.sm_date,
                    sm_name: defaultValue.sm_name,
                    sm_source: defaultValue.sm_source,
                    sm_hpp: defaultValue.sm_hpp,
                    sm_jual: defaultValue.sm_jual,
                    sm_qty: defaultValue.sm_qty,
                }))
            }
        }, [defaultValue]);
        return (
            <div>
                <div class="px-4 py-2 sm:px-0">
                    <h3 class="text-lg leading-6 font-medium text-gray-900 text-left border-b-2">
                        Edit Sales
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
                    <label htmlFor="sm_date" className="text-sm font-medium text-gray-700">
                        Tanggal
                    </label>
                    <TextInput
                        type="date"
                        id="sm_date"
                        defaultValue={data.sm_date ?? ''}
                        onChange={(e) => setData('sm_date', e.target.value)}
                        className={`w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm ${errors.sm_date ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500' : ''}`}
                    />
                    {errors.sm_date && <span className="text-xs text-rose-600 mt-0.5 font-medium">{errors.sm_date}</span>}
                </div>

                <div className="flex flex-col gap-1.5 md:col-span-2">
                    <label htmlFor="sm_name" className="text-sm font-medium text-gray-700">
                        Nama Produk
                    </label>
                    <TextInput
                        id="sm_name"
                        placeholder="Masukkan nama produk..."
                        defaultValue={data.sm_name ?? ''}
                        onChange={(e) => setData('sm_name', e.target.value)}
                        className={`w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm ${errors.sm_name ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500' : ''}`}
                    />
                    {errors.sm_name && <span className="text-xs text-rose-600 mt-0.5 font-medium">{errors.sm_name}</span>}
                </div>
            </div>

            <div className="flex flex-col gap-1.5">
                <label htmlFor="sm_source" className="text-sm font-medium text-gray-700">
                    Sumber / Vendor
                </label>
                <TextInput
                    id="sm_source"
                    placeholder="Contoh: Supplier A, Gudang Pusat..."
                    defaultValue={data.sm_source ?? ''}
                    onChange={(e) => setData('sm_source', e.target.value)}
                    className={`w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm ${errors.sm_source ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500' : ''}`}
                />
                {errors.sm_source && <span className="text-xs text-rose-600 mt-0.5 font-medium">{errors.sm_source}</span>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-gray-50/50 p-4 rounded-xl border border-gray-100">
                <div className="flex flex-col gap-1.5">
                    <label htmlFor="sm_hpp" className="text-sm font-medium text-gray-700">
                        Harga Pokok (HPP)
                    </label>
                    <div className="relative rounded-md shadow-sm">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <span className="text-gray-400 text-xs">Rp</span>
                        </div>
                        <TextInput
                            type="number"
                            id="sm_hpp"
                            placeholder="0"
                            defaultValue={data.sm_hpp ?? ''}
                            onChange={(e) => setData('sm_hpp', e.target.value)}
                            className={`w-full pl-8 rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm ${errors.sm_hpp ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500' : ''}`}
                        />
                    </div>
                    {errors.sm_hpp && <span className="text-xs text-rose-600 mt-0.5 font-medium">{errors.sm_hpp}</span>}
                </div>

                <div className="flex flex-col gap-1.5">
                    <label htmlFor="sm_jual" className="text-sm font-medium text-gray-700">
                        Harga Jual
                    </label>
                    <div className="relative rounded-md shadow-sm">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <span className="text-gray-400 text-xs">Rp</span>
                        </div>
                        <TextInput
                            type="number"
                            id="sm_jual"
                            placeholder="0"
                            defaultValue={data.sm_jual ?? ''}
                            onChange={(e) => setData('sm_jual', e.target.value)}
                            className={`w-full pl-8 rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm ${errors.sm_jual ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500' : ''}`}
                        />
                    </div>
                    {errors.sm_jual && <span className="text-xs text-rose-600 mt-0.5 font-medium">{errors.sm_jual}</span>}
                </div>

                <div className="flex flex-col gap-1.5">
                    <label htmlFor="sm_qty" className="text-sm font-medium text-gray-700">
                        Jumlah (Qty)
                    </label>
                    <TextInput
                        type="number"
                        id="sm_qty"
                        placeholder="0"
                        defaultValue={data.sm_qty ?? ''}
                        onChange={(e) => setData('sm_qty', e.target.value)}
                        className={`w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm ${errors.sm_qty ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500' : ''}`}
                    />
                    {errors.sm_qty && <span className="text-xs text-rose-600 mt-0.5 font-medium">{errors.sm_qty}</span>}
                </div>
            </div>
        </div>
    )
}