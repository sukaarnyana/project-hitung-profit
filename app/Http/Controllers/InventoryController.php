<?php

namespace App\Http\Controllers;

use App\Models\InventoryModel;
use Inertia\Inertia;
use Illuminate\Http\Request;

class InventoryController extends Controller
{
    public function index()
    {
        $data = InventoryModel::all();
        return Inertia::render('Inventory/IndexInventory', [
            'dataInventory' => $data
        ]);
    }
    public function store(Request $request)
    {
        $request->validate([
            'in_name' => 'required',
            'in_date' => 'required',
            'in_stock' => 'required|integer',
            'in_harga_beli' => 'required|numeric',
            'in_status' => 'required',
        ]);
        InventoryModel::create([
            'in_name' => $request->in_name,
            'in_date' => $request->in_date,
            'in_stock' => $request->in_stock,
            'in_harga_beli' => $request->in_harga_beli,
            'in_status' => $request->in_status,
        ]);

        return redirect()->back()->with('success', 'Data berhasil ditambahkan');
    }
    public function update(Request $request, $id)
    {
        $request->validate([
            'in_name' => 'required',
            'in_date' => 'required',
            'in_stock' => 'required|integer',
            'in_harga_beli' => 'required|numeric',
            'in_status' => 'required',
        ]);

        $oldInventory = InventoryModel::find($id);
        $fields = ['in_name', 'in_date', 'in_stock', 'in_harga_beli', 'in_status'];

        $oldInventory->update($request->only($fields));

        return redirect()->back();
    }
    public function destroy($id)
    {
        InventoryModel::find($id)->delete();
        return redirect()->back();
    }
}
