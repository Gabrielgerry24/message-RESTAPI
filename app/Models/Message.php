<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;

    protected $fillable = [
        'conversation_id',
        'user_id',
        'body',
    ];
    // public function conversation(){
    //     return $this->hasOne('App\Models\Conversation','id','conversation_id');
    // }
    // public function user(){
    //     return $this->hasOne('App\Models\User','id','user_id');
    // }
}
