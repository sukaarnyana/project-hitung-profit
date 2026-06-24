<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SalesModel extends Model
{
    protected $table = 'sales_masters';
    protected $primaryKey = 'sm_id';
    // protected $keyType = 'string';
    protected $fillable = [
        'sm_no',
        'sm_date',
        'sm_name',
        'sm_source',
        'sm_hpp',
        'sm_jual',
        'sm_qty',
        'created_at',
        'updated_at'
    ];
}
