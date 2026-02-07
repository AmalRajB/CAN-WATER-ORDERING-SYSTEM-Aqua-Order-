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

    public function unreadCount()
    {
        $count = AdminMessage::where('user_id',auth()->id())
            ->where('is_read',false)
            ->count();

        return response()->json([
            'status'=>true,
            'unread_count'=>$count
        ]);    
    }

    public function markAsRead()
    {
        AdminMessage::where('user_id',auth()->id())
            ->where('is_read',false)
            ->update(['is_read'=>true]);

        return response()->json([
            'status'=>true,
            'message'=>'notification marked as read'
        ]);
    }
}
