<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Seller extends Model
{
    protected $fillable = [
        'id_shop',
        'name',
        'cpf',
    ];

    public function shops() {
        return $this->belongsTo(Shop::class, 'id_shop');
    }
}
