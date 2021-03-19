<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RequestItemDetail extends Model
{
    use HasFactory;

    protected $fillable = [
        'request_item_id',
        'item_id',
        'quantity',
        'note'
    ];
    
    public function request_item()
    {
        return $this->belongsTo(RequestItem::class, 'request_item_id');
    }

    public function item()
    {
        return $this->belongsTo(Item::class, 'item_id');
    }
}
