<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{

    protected $guarded = ['id'];

     public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the report that the comment belongs to.
     */
    public function report()
    {
        return $this->belongsTo(Report::class);
    }

    /**
     * Get the parent comment if this is a reply.
     */
    public function parentComment()
    {
        return $this->belongsTo(Comment::class, 'reply_id');
    }

    /**
     * Get the replies to this comment.
     */
    public function replies()
    {
        return $this->hasMany(Comment::class, 'reply_id');
    }
}
