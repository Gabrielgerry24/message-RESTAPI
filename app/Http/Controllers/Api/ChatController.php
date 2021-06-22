<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Conversation;
use App\Models\Message;
use App\Models\User;
use Response;


class ChatController extends Controller
{
    public function index(Request $request)
    {
        $input = $request->all();
        // $conversation = Conversation::leftJoin('users','users.id','=','user_id_2')->select('conversations.*','users.name')->get();
        
        $conversation = Conversation::all();
        $conv= array();
        foreach($conversation as $values){
            if( $values->user_id_1 === $input['user_id']*1 || $values->user_id_2 === $input['user_id']*1 ){
                array_push($conv,$values);
            }
        }
        $users = array();

        foreach( $conv as $value){
            if( $value->user_id_1 === $input['user_id']*1  ){

                $user=User::where('id',$value->user_id_2)->first();
                $array=[
                            "id_user_2" => $user->id,
                            "id_conversation" => $value->id,
                            "name" => $user->name,
                            "is_login" => $user->is_login,
                            "login_at" => $user->login_at,
                ];
                array_push($users, $array);

            }else if($value->user_id_2 === $input['user_id']*1){
                $user=User::where('id',$value->user_id_1)->first();
                $array=[
                            "id_user_2" => $user->id,
                            "id_conversation" => $value->id,
                            "name" => $user->name,
                            "is_login" => $user->is_login,
                            "login_at" => $user->login_at,
                        ];
                array_push($users,$array);
            }

        }

        // $user=User::where('id',$conversation->user_id_2);
       
            // foreach($conversation as $values){
            
            //     $user=User::find($values->user_id_2);
            //     $array=[
            //         "id_user_2" => $user->id,
            //         "id_conversation" => $values->id,
            //         "name" => $user->name,
            //         "is_login" => $user->is_login,
            //         "login_at" => $user->login_at,
            //     ];

            //     array_push($users,$array);
            // } 
        

        $respon = [
            'status' => 'success',
            'errors' => null,
            'content' =>  $users,
           
            
            
        ];
        
        return Response::json($respon,200);
      
     
        
    } 
    public function store(Request $request)
    {   
    $input = $request->all();
	$conversation = Conversation::create($input);
   
 
        if(!$conversation)
        {
            return Response::json("error saving",500);
        }
        $respon = [
            'status' => 'success',
            'msg' => 'Create Conversation successfully',
            'errors' => null,
            'content' => $conversation
        ];
        return response()->json($respon, 200);
    } 

    public function sendMessage(Request $request)
    {   
    $input = $request->all();
	$message = Message::create($input);
   
 
        if(!$message)
        {
            return Response::json("error saving",500);
        }
        $respon = [
            'status' => 'success',
            'msg' => 'Create Conversation successfully',
            'errors' => null,
            
        ];
        return response()->json($respon, 200);
    } 


    public function massageGetById(Request $request)
    {   
    $input = $request->all();
	$message = Message::get()->where('conversation_id',$input['conversation_id']);
    $messages= array();
    foreach($message as $values){
            
        
        $array=[
            "id" => $values->id,
            "conversation_id" => $values->conversation_id,
            "user_id" => $values->user_id,
            "body" => $values->body,
            "created_at" => $values->created_at,
        ];

        array_push($messages,$array);
    } 
        if(!$message)
        {
            return Response::json("error saving",500);
        }
        $respon = [
            'status' => 'success',
            'msg' => 'Create Conversation successfully',
            'errors' => null,
            'content' => $messages
        ];
        return response()->json($respon, 200);
    } 
}
