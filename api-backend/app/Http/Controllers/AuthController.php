<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    //reg api 
    public function register(Request $request){

    $data = $request->validate([
        "name" => "required|string|max:255",
        "email" => "required|email|unique:users,email",
        "password" => "required|min:6|confirmed"
    ]);
    $user = User::create([
        "name" => $data["name"],
        "email" => $data["email"],
        "password" => Hash::make($data["password"])
    ]);

    return response()->json([
        "status"=> true,
        "message" => "User created successfully..."
    ]);

    }
    //login api
    public function login(Request $request){
        $request->validate([
            "email" => "required|email",
            "password" => "required"
        ]);

        if(!Auth::attempt($request->only("email", "password"))){
            return response()->json([
                "status" => false,
                "message" => "invalid credentials"
            ]);
        }
        $user = Auth::user();
        $token = $user->createToken("myToken")->plainTextToken;

        return response()->json([
            "status"=>true,
            "message"=>"user logged in  successfully..",
            "token"=>$token,
            "user" => [
                "id" => $user->id,
                "role" => $user->role
            ]
            
        ]);

    }
    //see profilr api
    public function profile(){
        $user = Auth::user();

        return response()->json([
            "status"=>true,
            "message"=>"user profile data",
            "user"=>$user
        ]);

    }
    //logout api
    public function logout(){

        Auth::logout();

        return response()->json([
            "status"=>true,
            "message"=>"user logged out successfully"
        ]);

    }
}
