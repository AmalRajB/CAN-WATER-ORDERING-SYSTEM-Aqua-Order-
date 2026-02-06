<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdminDashboardController extends Controller
{
    public function dashboardStats()
    {
        $totalActiveusers = DB::table('booking')
            ->distinct('user_id')
            ->count('user_id');

        $pendingBookings = DB::table('booking')
            ->where('status', 'pending')
            ->count(); 
            
        $deliveredBookings = DB::table('booking')
            ->where('status', 'delivered')
            ->count();  
            
        $totalWaterCansSold = DB::table('booking')
            ->where('status', 'delivered')
            ->sum('quantity');

        return response()->json([

            'total_active_users'    => $totalActiveusers,
            'pending_bookings'      => $pendingBookings,
            'delivered_bookings'    => $deliveredBookings,
            'total_water_cans_sold' => $totalWaterCansSold,



        ]);  
    
    }
}
