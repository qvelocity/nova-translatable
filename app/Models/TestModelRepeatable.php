<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TestModelRepeatable extends Model
{
    protected $casts = [
        'name' => 'array',
    ];
}
