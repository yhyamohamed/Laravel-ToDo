<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreTodoUpdateRequest extends FormRequest
{

    public function authorize()
    {
        return true;
    }


    public function rules()
    {
        $todo = $this->route('todo');
        return [
//            'name' => ['required', Rule::unique('todos')->ignore($this)],
            'name' => "unique:todos,name,$todo->id" ,
            'status' => ['in:done,not-yet'],
            'user_id' => ['exists:users,id']
        ];
    }
}
