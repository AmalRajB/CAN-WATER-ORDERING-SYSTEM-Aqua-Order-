<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserBlockingTest extends TestCase
{
    // Removing RefreshDatabase to use the actual database state for this specific check, 
    // but in a real CI environment we would use it. 
    // Here we want to testing against the current state if possible, 
    // or we can use it and seed data.
    // Let's use RefreshDatabase to ensure clean state for the test.
    use RefreshDatabase;

    public function test_admin_can_block_user()
    {
        $admin = User::factory()->create(['role' => 'admin', 'is_active' => true]);
        $user = User::factory()->create(['role' => 'user', 'is_active' => true]);

        $response = $this->actingAs($admin)
                         ->patchJson("/api/admin/users/{$user->id}/toggle-status");

        $response->assertStatus(200)
                 ->assertJson(['status' => true, 'is_active' => false]);
                 
        $this->assertDatabaseHas('users', [
            'id' => $user->id,
            'is_active' => false,
        ]);
    }

    public function test_blocked_user_cannot_login()
    {
        $user = User::factory()->create([
            'role' => 'user', 
            'is_active' => false,
            'password' => bcrypt('password'),
            'email' => 'blocked@example.com'
        ]);

        $response = $this->postJson('/api/login', [
            'email' => 'blocked@example.com',
            'password' => 'password',
        ]);

        $response->assertStatus(403)
                 ->assertJson(['message' => 'Your account has been blocked by admin']);
    }

    public function test_admin_cannot_block_themselves()
    {
        $admin = User::factory()->create(['role' => 'admin', 'is_active' => true]);

        $response = $this->actingAs($admin)
                         ->patchJson("/api/admin/users/{$admin->id}/toggle-status");

        $response->assertStatus(403)
                 ->assertJson(['message' => 'You cannot block yourself']);
    }

    public function test_admin_can_fetch_all_users()
    {
        $admin = User::factory()->create(['role' => 'admin', 'is_active' => true]);
        User::factory()->count(3)->create(['role' => 'user']);

        $response = $this->actingAs($admin)
                         ->getJson('/api/admin/users');

        $response->assertStatus(200)
                 ->assertJsonStructure([
                     'status',
                     'message',
                     'data' => [
                         '*' => ['id', 'name', 'email', 'role', 'is_active']
                     ]
                 ]);
    }
}
