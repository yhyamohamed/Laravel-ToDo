<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTodoPostRequest;
use App\Http\Requests\StoreTodoUpdateRequest;
use App\Http\Resources\TodoResource;
use App\Models\Todo;
use Illuminate\Http\Request;

class TodoController extends Controller
{

    public function index()
    {
        return TodoResource::collection(Todo::all());
    }


    public function store(StoreTodoPostRequest $request)
    {
        $created_todo = Todo::create($request->all());

        if ($created_todo) {
            return response()->json(new TodoResource($created_todo), 200);
        } else {

            return response()->json(['Error' => 'some thing went wrong sry we cant find that to do'], 500);
        }
    }


    public function show($id)
    {
        $todo = Todo::find($id);
        if ($todo) {
            return response()->json(new TodoResource($todo), 200);
        } else {

            return response()->json(['Error' => 'some thing went wrong sry we cant find that to do'], 500);
        }
    }


    public function update(StoreTodoUpdateRequest $request, Todo $todo)
    {
        $updated = $todo->update($request->all());
        if ($updated) {
            return response()->json(new TodoResource($todo), 200);
        } else {

            return response()->json(['Error' => 'some thing went wrong sry we cant find that to do'], 500);
        }
    }

    public function destroy(Todo $todo)
    {
        $deleted = $todo->delete();
        if ($deleted) {
            return response()->json('todo deleted successfully !', 200);
        } else {

            return response()->json(['Error' => 'some thing went wrong sry we cant find that to do'], 500);
        }
    }
}
