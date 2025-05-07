<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Client extends Model
{
    use HasFactory;
    //add name, cpf, gender and email to fillable
    protected $fillable = ["name", "cpf", "gender", "email"];

    public function vendas()
    {
        return $this->hasMany(Sale::class);
    }
}
