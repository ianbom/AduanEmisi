<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::insert([
            [
                'name' => 'Ian',
                'email' => 'ianbom@gmail.com',
                'password' => Hash::make('ianbom123'),
            ],
            [
                'name' => 'Admin',
                'email' => 'admin@gmail.com',
                'password' => Hash::make('admin123'),
            ],
            [
                'name' => 'Argya',
                'email' => 'argyawoles@gmail.com',
                'password' => Hash::make('argya123'),
            ]

        ]);
    }
}
