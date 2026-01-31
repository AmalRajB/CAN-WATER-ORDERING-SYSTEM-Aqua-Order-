<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;

    // 👇 REQUIRED because table name is `booking`
    protected $table = 'booking';

    // 👇 Allow mass assignment
    protected $fillable = [
        'fullname',
        'mob_number',
        'address',
        'address_proff',
        'delivery_date',
        'quantity',
        'user_id',
        'status'
    ];

    // 👇 Relationship
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
