<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\Admin\UserManagementController;
use App\Http\Controllers\Admin\AdminMessageController;

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/
Route::post("register", [AuthController::class, "register"]);
Route::post("login", [AuthController::class, "login"]);

/*
|--------------------------------------------------------------------------
| Common Auth Routes (Admin + User)
|--------------------------------------------------------------------------
*/
Route::middleware("auth:sanctum")->group(function () {

    Route::get("profile", [AuthController::class, "profile"]);
    Route::post("logout", [AuthController::class, "logout"]);
    Route::apiResource("bookings", BookingController::class);
    Route::post('changepassword',[AuthController::class, 'changepassword']);



});

/*
|--------------------------------------------------------------------------
| User Routes
|--------------------------------------------------------------------------
*/
Route::middleware(["auth:sanctum", "role:user"])->group(function () {

    // User bookings only
    // Route::apiResource("bookings", BookingController::class);

});

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/
Route::middleware(["auth:sanctum", "role:admin"])->group(function () {

    // Admin fetch all users
    Route::get("admin/users", [UserManagementController::class, "index"]);

    // Admin block/unblock users
    Route::patch(
        "admin/users/{id}/toggle-status",
        [UserManagementController::class, "toggleStatus"]
    );

    Route::post(
        'admin/bookings/alert',
        [AdminMessageController::class, 'alertUser']
    );

});
