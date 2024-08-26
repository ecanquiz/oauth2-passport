<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class ApiController extends Controller
{
    // POST [ name, email, password ]
    public function register(Request $request){

        // Validation
        $request->validate([
            "name" => "required|string",
            "email" => "required|string|email|unique:users",
            "password" => "required|confirmed" // password_confirmation
        ]);

        // Create User
        User::create([
            "name" => $request->name,
            "email" => $request->email,
            "password" => bcrypt($request->password)
        ]);

        return response()->json([
            "status" => true,
            "message" => "User registered successfully",
            "data" => []
        ]);
    }

    // POST [ email, password ]
    public function login(Request $request){
        $request->validate([
            "email" => "required|email|string",
            "password" => "required"
        ]);
        $user = User::where("email", $request->email)->first();
        if(!empty($user)){
            if(Hash::check($request->password, $user->password)){
                $accessToken = $user->createToken("mytoken")->accessToken;
                return response()->json([
                    "status" => true,
                    "message" => "Login successful",
                    "accessToken" => $accessToken,
                    "data" => []  
                ], 200);
            }else{
                return response()->json([
                    "status" => false,
                    "message" => "Password didn't match",
                    "errors" => [
                       "Password" => ["Password didn't match."]
                    ]
                ], 401);
            }
        }else{
            return response()->json([
                "status" => false,
                "message" => "Invalid Email value",
                "errors" => [
                    "Email" => ["Invalid Email value."]
                ]
            ], 401);
        }
    }

    // GET [Auth: Token]
    public function profile(){

        $userData = auth()->user();

        return response()->json([
            "status" => true,
            "message" => "Profile information",
            "data" => $userData,
            "id" => auth()->user()->id
        ]);
    }

     // GET [Auth: Token]
     public function logout(){

        $token = auth()->user()->token();

        $token->revoke();

        return response()->json([
            "status" => true,
            "message" => "User Logged out successfully"
        ]);
     }
}