<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RequestItem extends Model
{
    use HasFactory;

    const PREFIX_CODE = 'RI-';
    protected $fillable = [
        'requested_by',
        'request_date',
        'note'
    ];

    public function requester()
    {
        return $this->belongsTo(Employee::class, 'requested_by');
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function details()
    {
        return $this->hasMany(RequestItemDetail::class);
    }

    public static function boot() {
        parent::boot();
    
        static::creating(function ($model) {
            $model->code = self::PREFIX_CODE.date('ymdhis');
        });
    }
}
