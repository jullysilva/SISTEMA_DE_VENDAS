<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Shop extends Model
{
    use HasFactory;

    protected $fillable = ["name", "cnpj", "cep", "address", "neighborhood", "city", "state"];

    public function sellers()
    {
        return $this->hasMany(Seller::class, 'id_shop');
    }

    public function vendas()
    {
        return $this->hasMany(Sale::class);
    }
}
