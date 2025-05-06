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

    public function shop() {
        return $this->belongsTo(Shop::class);
    }

    public function vendas()
    {
        return $this->hasMany(Sale::class);
    }
}
