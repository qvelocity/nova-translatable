<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::truncate();

        $user = new User();
        $user->name = 'Test';
        $user->email = 'test@example.com';
        $user->password = Hash::make('test');
        $user->save();
    }
}
