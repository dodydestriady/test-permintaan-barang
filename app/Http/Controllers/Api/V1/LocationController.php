<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\LocationResource;
use App\Models\Location;
use Illuminate\Http\Request;

class LocationController extends Controller
{
    public function index(Request $request) {
        $locations = Location::query();
        if($request->search) {
            $locations = $locations->where('name', 'like', "%$request->search%");
        }
        return LocationResource::collection($locations->paginate());
    }
}
