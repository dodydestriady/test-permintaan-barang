<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'department_id',
        'nik',
    ];

    public function department()
    {
        return $this->belongsTo(Department::class, 'department_id');
    }

    public function request_item()
    {
        return $this->hasMany(RequestItem::class, 'requested_by', 'id');
    }
}
