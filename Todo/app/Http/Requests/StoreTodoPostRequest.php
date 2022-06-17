<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTodoPostRequest extends FormRequest
{

    public function authorize()
    {
        return true;
    }


    public function rules()
    {
        return [
            'name' => ['required', 'unique:todos'],
            'status' => ['required','in:done,not-yet'],
            'user_id' => ['required', 'exists:users,id']
        ];
    }
    public function messages()
    {
        return [
            'name.unique' => 'a to do with that name already there',
            'status.in'=>'pls select a status of [done,not-yet] '
        ];
    }
}
