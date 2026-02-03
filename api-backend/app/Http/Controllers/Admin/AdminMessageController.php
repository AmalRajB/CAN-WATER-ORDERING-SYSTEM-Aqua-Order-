<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\AdminMessage;
use App\Models\Booking;

class AdminMessageController extends Controller
{
    private const PENDING_ORDER_MESSAGE = 
    'your order is in progress can expect the delivery with in 24 hours .';


    public function alertUser(Request $request)
    {
        $request->validate([
            'booking_id'=> 'required|exists:booking,id'

        ]);

        $alreadySent = AdminMessage::where('booking_id', $request->booking_id)->exists();
        if($alreadySent){
            return response()->json([
                'message'=>'alert already sented'
            ],409);
        }


        $booking = Booking::findOrFail($request->booking_id);

        $adminMessage = AdminMessage::create([
            'booking_id' => $booking->id,
            'user_id'    => $booking->user_id,
            'admin_id'   => auth()->id(),
            'message'    => self::PENDING_ORDER_MESSAGE



        ]);

        return response()->json([
            'status' => true,
            'message' => 'booking alert send successfully',
            'data' =>$adminMessage

        ]);


    }
}
