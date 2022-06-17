<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TodoResource extends JsonResource
{

    public function toArray($request)
    {
        return [
            'id' => $this->id,
            "name" => $this->name,
            "status" => $this->status,
            "description" => $this->description,
            "updated_at" => $this->updated_at->format('Y-M-d h:m:s'),
            "created_at" => $this->created_at->format('Y-M-d'),
            "creator" => $this->user,

        ];
    }
}
