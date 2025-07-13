<?php

namespace Database\Seeders;

use App\Models\Community;
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
        // User::create([
        //     'name' => 'Ian',
        //     'email' => 'ianbom@gmail.com',
        //     'password' => Hash::make('ianbom123'),
        // ]);

        $komunitas = User::create([
            'name' => 'komunitas',
            'email' => 'komunitas@gmail.com',
            'password' => Hash::make('ianbom123'),
        ]);

        Community::create([
            'user_id' => $komunitas->id,
            'name' => $komunitas->name,
            'description' => 'Ini deskripsi komunitas',
            'member_count' => 10
        ]);
    }
}
