<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            $table->foreignId('user_id')->after('id')->constrained()->onDelete('cascade');
            $table->integer('quantity')->after('user_id');
            $table->date('delivery_date')->after('quantity');
            $table->text('delivery_address')->after('delivery_date');
            $table->enum('status', ['pending', 'confirmed', 'delivered', 'cancelled'])
                ->default('pending')
                ->after('delivery_address');
            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            //
        });
    }
};
