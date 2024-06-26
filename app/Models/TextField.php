<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TextField extends Model
{
    protected $casts = [
        'name' => 'array',
    ];

}
