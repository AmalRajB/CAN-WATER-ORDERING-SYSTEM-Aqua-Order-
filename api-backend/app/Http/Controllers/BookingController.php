<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use App\Models\AdminMessage;

class BookingController extends Controller
{
    /**
     * List bookings
     * - User: only their bookings
     * - Admin: all bookings
     */
    public function index(Request $request)
    {
        $user = Auth::user();

        if ($user->role === 'admin') {
            $query = Booking::with('user');
        } else {
            $query = Booking::where('user_id', $user->id);
        }

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        $bookings = $query->latest()->get();

        if($user->role ==='admin' && $request->status ==='pending'){
            $bookings = $bookings->map(function($booking){
                $booking->alert_sent = AdminMessage::where('booking_id', $booking->id)->exists();

                return $booking;
            });
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

        // ================= USER UPDATE =================
        if ($user->role !== 'admin') {

            if ($booking->user_id !== $user->id || $booking->status !== 'pending') {
                return response()->json(['message' => 'Unauthorized'], 403);
            }

            $data = $request->validate([
                'delivery_date' => 'required|date',
                'quantity'      => 'required|integer|min:1',
                'mob_number'    => 'required|string',
                'address'       => 'required|string',
                'address_proff' => 'nullable|file|mimes:jpg,jpeg,png,pdf',
            ]);

            // ✅ HANDLE FILE UPDATE
            if ($request->hasFile('address_proff')) {

                // 🔥 DELETE OLD FILE (SAFE)
                if ($booking->address_proff && !str_starts_with($booking->address_proff, 'http')) {
                    Storage::disk('public')->delete($booking->address_proff);
                }

                // STORE NEW FILE
                $path = $request->file('address_proff')->store('address_proofs', 'public');
                $data['address_proff'] = $path;
            }

            $booking->update($data);

            // ✅ RETURN UPDATED DATA WITH IMAGE URL
            return response()->json([
                'message' => 'Booking updated successfully',
                'booking' => [
                    ...$booking->toArray(),
                    'address_proff' => $booking->address_proff
                        ? asset('storage/' . $booking->address_proff)
                        : null,
                ],
            ]);
        }

        // ================= ADMIN UPDATE =================
        $request->validate([
            'status' => 'required|in:pending,delivered'
        ]);

        $booking->update([
            'status' => $request->status
        ]);

        return response()->json(['message' => 'Status updated']);
    }        /**
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
