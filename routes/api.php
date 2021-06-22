<?php


use Illuminate\Support\Facades\Route;
use App\Events\Message;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::post('login', 'App\Http\Controllers\Api\LoginController@login')->name("api.login");
Route::post('users', 'App\Http\Controllers\Api\UserController@store')->name('api.users');

Route::group(['prefix' => 'auth', 'middleware' => 'auth:sanctum'], function() {

    
    Route::post('conversation', 'App\Http\Controllers\Api\ChatController@store')->name("api.message");

    Route::get('users', 'App\Http\Controllers\Api\UserController@index')->name("api.users");
    // Route::post('logout', 'App\Http\Controllers\Api\LoginController@logout')->name("api.login");
    // Route::post ('/send-message',function(Request $request){
    //     event(
    //         new Message(
    //             $request->input('username'),
    //             $request->input('message')
    //         )
    //     );
    // });
    Route::post('logout', 'App\Http\Controllers\Api\LoginController@logout')->name("api.login");
    Route::post('chats', 'App\Http\Controllers\Api\ChatController@index')->name("api.message");
    Route::post('send', 'App\Http\Controllers\Api\ChatController@sendMessage')->name("api.message");
    
    Route::post('message', 'App\Http\Controllers\Api\ChatController@massageGetById')->name("api.message");
    
});

// Route::get('users/{id}', 'Api\UsersController@show')->name('api.users');

