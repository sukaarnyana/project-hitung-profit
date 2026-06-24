<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\SalesModel;
use Illuminate\Http\Request;

class SalesController extends Controller
{
    public function index()
    {
        $data = SalesModel::all();
        return Inertia::render('Sales/IndexSales', [
            'dataSales' => $data
        ]);
    }
    public function store(Request $request)
    {
        // dd($request->all());
        $request->validate([
            'sm_name' => 'required',
            'sm_source' => 'required',
            'sm_hpp' => 'required|numeric',
            'sm_jual' => 'required|numeric',
            'sm_qty' => 'required|integer',
            'sm_date' => 'required|date',
        ]);
        SalesModel::create([
            'sm_name' => $request->sm_name,
            'sm_source' => $request->sm_source,
            'sm_hpp' => $request->sm_hpp,
            'sm_jual' => $request->sm_jual,
            'sm_qty' => $request->sm_qty,
            'sm_no' => 'SM' . str_pad(SalesModel::count() + 1, 4, '0', STR_PAD_LEFT),
            'sm_date' => $request->sm_date,
        ]);

        return redirect()->back()->with('success', 'Data berhasil ditambahkan');
    }
    public function update(Request $request, $id)
    {
        $request->validate([
            'sm_name' => 'required|string|max:255',
            'sm_source' => 'required|string|max:255',
            'sm_hpp' => 'required|numeric',
            'sm_jual' => 'required|numeric',
            'sm_qty' => 'required|integer',
            'sm_date' => 'required|date',
        ]);

        $oldSales = SalesModel::find($id);
        $fields = ['sm_name', 'sm_source', 'sm_hpp', 'sm_jual', 'sm_qty', 'sm_date'];

        $oldSales->update($request->only($fields));

        return redirect()->back();
    }
    public function destroy($id)
    {
        SalesModel::find($id)->delete();
        return redirect()->back();
    }
}
