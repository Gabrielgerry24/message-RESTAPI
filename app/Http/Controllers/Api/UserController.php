<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Response;
use Hash;
use Str;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     * @param Request $request
     */
    public function index()
    {
        $users = User::all();
        
        return Response::json($users,200);
      
     
        
    }
    public function store(Request $request)
    {   
    $input = $request->all();
    $input['password'] = Hash::make($input['password']);
    $input['api_token'] =  Str::random(60);
    $input['status'] = "active";

	$user = User::create($input);
   
 
        if(!$user)
        {
            return Response::json("error saving",500);
        }
        $respon = [
            'status' => 'success',
            'msg' => 'Create user successfully',
            'errors' => null,
            'content' => []
        ];
        return response()->json($respon, 200);
    }
}
