<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class TodoTest extends TestCase
{

    public function test_getting_all_todos()
    {
        $response = $this->get('api/todos/');

        $response->assertStatus(200);
    }

    public function test_creating_todo()
    {
        $response = $this->postJson('/api/todos', [
                "name"=> "testing from file",
                "description"=> "blaa bla bla ",
                 "status"=>"not-yet",
                "user_id"=> 1
        ]);

        $response
            ->assertStatus(200);
     }
    public function test_updating_todo()
    {
        $response = $this->withoutExceptionHandling()->putJson('/api/todos/7', [
            "name"=> "testing edit ",
            "description"=> "blaa bla bla "
        ]);

        $response
            ->assertStatus(200);
    }
}
