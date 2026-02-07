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
        "password" => Hash::make($data["password"]),
        "is_active" => true    
    ]);

    return response()->json([
        "status"=> true,
        "message" => "User created successfully..."
    ]);

    }
    //login api
    public function login(Request $request)
    {
        $request->validate([
            "email" => "required|email",
            "password" => "required"
        ]);

        // 1️⃣ Find user by email
        $user = User::where('email', $request->email)->first();

        // 2️⃣ Invalid credentials
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                "status" => false,
                "message" => "Invalid credentials"
            ], 401);
        }

        // 3️⃣ Block inactive users
        if (!$user->is_active) {
            return response()->json([
                "status" => false,
                "message" => "Your account has been blocked by admin"
            ], 403);
        }

        // 4️⃣ Login + create token
        Auth::login($user);
        $token = $user->createToken("myToken")->plainTextToken;

        return response()->json([
            "status" => true,
            "message" => "User logged in successfully",
            "token" => $token,
            "user" => [
                "id" => $user->id,
                "role" => $user->role,
                "is_active" => $user->is_active
            ]
        ]);
    }
    //see profile api
    public function profile(){
        $user = Auth::user();

        return response()->json([
            
            "email"=>Auth::user()->email
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


    public function changepassword(Request $request)
    {
        $user = Auth::user();

        $request->validate([
            'current_password'=>'required',
            'new_password'=>'required|min:6|confirmed',
        ]);

        if(!Hash::check($request->current_password, $user->password)){
            return response()->json([
                'status'=> false,
                'message' =>'current password is incorrect'
            ],422);
        }
        $user->password = Hash::make($request->new_password);
        $user->save();

        return response()->json([
            'status'=>true,
            'message'=>'password changed successfully'
        ]);
    }
}
