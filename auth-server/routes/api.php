<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ApiController;
use App\Http\Controllers\UserController;


// Open Routes
Route::post("register", [ApiController::class, "register"]);
Route::post("login", [ApiController::class, "login"]);

// Protected Routes
Route::group([ "middleware" => ["auth:api"] ], function(){

    Route::prefix('users')->group(function () {
        Route::get("/", [UserController::class, "index"]);
        Route::post('/', [UserController::class, 'store']);
        Route::get('/{user}', [UserController::class, 'show']);
        Route::post('/{user}', [UserController::class, 'update']);
        Route::delete('/{id}', [UserController::class,'destroy']);
        //Route::get('/auth', AuthController::class);
        //Route::get('/auth-menu', AuthMenuController::class);            
        //
        //Route::post('/auth/avatar', [AvatarController::class, 'store']);
    });

    Route::get("profile", [ApiController::class, "profile"]);
    Route::get("logout", [ApiController::class, "logout"]);
});

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:api');