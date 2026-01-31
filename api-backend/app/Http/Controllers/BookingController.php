<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class BookingController extends Controller
{
    /**
     * List bookings
     * - User: only their bookings
     * - Admin: all bookings
     */
    public function index()
    {
        $user = Auth::user();

        if ($user->role === 'admin') {
            $bookings = Booking::with('user')->latest()->get();
        } else {
            $bookings = Booking::where('user_id', $user->id)
                ->latest()
                ->get();
        }

        return response()->json($bookings);
    }

    /**
     * Store a new booking (User)
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'fullname'        => 'required|string|max:100',
            'mob_number'      => 'required|string|max:15',
            'address'         => 'required|string',
            'delivery_date'   => 'required|date|after_or_equal:today',
            'quantity'        => 'required|integer|min:1',
            'address_proff'   => 'nullable|file|mimes:jpg,jpeg,png,pdf|max:2048',
        ]);

        // Handle file upload
        if ($request->hasFile('address_proff')) {
            $data['address_proff'] = $request
                ->file('address_proff')
                ->store('address_proofs', 'public');
        }

        $data['user_id'] = Auth::id();
        $data['status']  = 'pending';

        $booking = Booking::create($data);

        return response()->json([
            'message' => 'Booking created successfully',
            'data'    => $booking
        ], 201);
    }   
     /**
     * Show a single booking
     */
    public function show(string $id)
    {
        $booking = Booking::findOrFail($id);

        // Authorization: user can only see their own booking
        if (Auth::user()->role !== 'admin' && $booking->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return response()->json($booking);
    }

    /**
     * Update booking
     * - Admin: update status
     * - User: update booking details if pending
     */
    public function update(Request $request, string $id)
    {
        $booking = Booking::findOrFail($id);
        $user = Auth::user();

        // USER update (only if pending)
        if ($user->role !== 'admin') {

            if ($booking->user_id !== $user->id || $booking->status !== 'pending') {
                return response()->json(['message' => 'Unauthorized'], 403);
            }

            $data = $request->validate([
                'delivery_date' => 'required|date|after_or_equal:today',
                'quantity'      => 'required|integer|min:1',
                'address_proff' => 'nullable|file|mimes:jpg,jpeg,png,pdf|max:2048',
            ]);

            // Handle file update
            if ($request->hasFile('address_proff')) {

                // Delete old file if exists
                if ($booking->address_proff) {
                    Storage::disk('public')->delete($booking->address_proff);
                }

                // Store new file
                $data['address_proff'] = $request
                    ->file('address_proff')
                    ->store('address_proofs', 'public');
            }

            $booking->update($data);

            return response()->json(['message' => 'Booking updated']);
        }

    // ADMIN update
    $request->validate([
        'status' => 'required|in:pending,delivered'
    ]);

    $booking->update([
        'status' => $request->status
    ]);

    return response()->json(['message' => 'Status updated']);
}
        /**
          * Delete booking (User can cancel if pending)
        */
    public function destroy(string $id)
    {
        $booking = Booking::findOrFail($id);
        $user = Auth::user();

        if ($user->role !== 'admin') {
            if ($booking->user_id !== $user->id || $booking->status !== 'pending') {
                return response()->json(['message' => 'Unauthorized'], 403);
            }
        }

        $booking->delete();

        return response()->json(['message' => 'Booking deleted']);
    }
}
