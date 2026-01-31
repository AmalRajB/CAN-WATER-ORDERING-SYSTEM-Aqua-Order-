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
        Schema::create('booking', function(Blueprint $table){

        $table->id();
        $table->string("fullname",100);
        $table->string("mob_number",10);
        $table->longText("address");
        $table->string("address_proff",220)->nullable();
        $table->date("delivery_date");
        $table->integer("quantity");
        $table->foreignId('user_id')
              ->constrained("users")
              ->onDelete('cascade');
        $table->enum('status', [
            'pending',
            'delivered',
        ])->default('pending');
        $table->timestamps();



        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('booking');
    }
};
