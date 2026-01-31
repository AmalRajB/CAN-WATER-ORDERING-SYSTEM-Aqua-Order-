<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BookingController;

Route::post("register", [AuthController::class, "register"] );
Route::post("login", [AuthController::class, "login"] );

Route::middleware("auth:sanctum")->group(function () {

    Route::get("profile", [AuthController::class, "profile"]);
    Route::post("logout", [AuthController::class, "logout"]);

    Route::apiResource("bookings", BookingController::class);

});

/*
|--------------------------------------------------------------------------
| User Routes
|--------------------------------------------------------------------------
*/
Route::middleware(["auth:sanctum", "role:user"])->group(function () {

    // Route::get("user/dashboard", [UserController::class, "dashboard"]);
    // Route::get("user/orders", [UserController::class, "orders"]);

});

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/
Route::middleware(["auth:sanctum", "role:admin"])->group(function () {

    // Route::get("admin/dashboard", [AdminController::class, "dashboard"]);
    // Route::get("admin/users", [AdminController::class, "users"]);
    // Route::post("admin/order-status", [AdminController::class, "updateOrderStatus"]);

});
