<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InventoryModel extends Model
{
    protected $table = 'inventory_masters';
    protected $primaryKey = 'in_id';
    // protected $keyType = 'string';
    protected $fillable = [
        'in_name',
        'in_date',
        'in_stock',
        'in_harga_beli',
        'in_status',
        'created_at',
        'updated_at'
    ];
}
