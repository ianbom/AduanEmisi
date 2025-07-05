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
        Schema::create('reports', function (Blueprint $table) {
            $table->id();
            $table->foreignId('reporter_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('province_id')->nullable()->constrained('provinces')->cascadeOnDelete()->cascadeOnUpdate();
            $table->foreignId('city_id')->constrained('cities')->onDelete('cascade');
            $table->foreignId('district_id')->constrained('districts')->onDelete('cascade');
            $table->foreignId('verified_by_user_id')->nullable()->constrained('users')->onDelete('set null');
            $table->foreignId('completed_by_user_id')->nullable()->constrained('users')->onDelete('set null');
            $table->string('title');
            $table->text('description');
            $table->string('category')->nullable(); // Pertimbangkan tabel terpisah jika kategori adalah daftar terbatas);
            $table->float('latitude')->nullable();
            $table->float('longitude')->nullable();
            $table->text('address')->nullable();
            $table->enum('status', ['pending', 'verified', 'on-progress', 'rejected', 'completed'])->default('pending');
            $table->integer('upvotes_count')->default(0);
            $table->integer('dislikes_count')->default(0);
            $table->timestamp('verified_at')->nullable();
            $table->text('completion_details')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reports');
    }
};
