<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
         $password = \Hash::make(1234);
            User::factory()->create([
            'name' => 'yaya',
            'email' => 'yaya@iti.com',
            'password' => $password,
        ]);
    }
}
