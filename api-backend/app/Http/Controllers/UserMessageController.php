<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\AdminMessage;

class UserMessageController extends Controller
{
    public function myNotifications()
    {
        $messages = AdminMessage::where('user_id', auth()->id())
            ->latest()
            ->get();

        return response()->json([
            'status' => true,
            'message' => 'user notifications',
            'data' => $messages
        ]);
    }
}
