<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Conversation extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id_1',
        'user_id_2',
    ];
    // public function messages(){
    //     return $this->hasMany('App\Models\Message');
    // }
    // public function user(){
    //     return $this->belongsTo(User::class,'id','user_id_2');
    // }
}
