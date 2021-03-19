<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\UnitResource;
use App\Models\Unit;
use Illuminate\Http\Request;

class UnitController extends Controller
{
    public function index(Request $request)
    {
        $units = Unit::query();
        if($request->search) {
            $units = $units->where('name', 'like', "%$request->search%");
        }
        return UnitResource::collection($units->paginate());
    }
}
