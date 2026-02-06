<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserManagementController extends Controller
{
    public function index(Request $request)
    {
        try {
            $query = User::query();
            if($request->filled('search')){
                $query->where('email','LIKE','%' . $request->search . '%');
            }

            $users = $query->paginate(4);
            return response()->json([
                'status' => true,
                'message' => 'Users retrieved successfully',
                'data' => $users
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function toggleStatus(Request $request, $id)
    {
        try {
            $user = User::findOrFail($id);

            // Prevent admin from blocking themselves
            if ($user->id === auth()->id()) {
                return response()->json([
                    'status' => false,
                    'message' => 'You cannot block yourself'
                ], 403);
            }

            // Toggle active status
            $user->is_active = !$user->is_active;
            $user->save(); // ✅ important

            return response()->json([
                'status' => true,
                'message' => $user->is_active
                    ? 'User unblocked successfully'
                    : 'User blocked successfully',
                'is_active' => $user->is_active
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
