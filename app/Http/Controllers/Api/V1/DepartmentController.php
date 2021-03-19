<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\DepartmentResource;
use App\Models\Department;
use Illuminate\Http\Request;

class DepartmentController extends Controller
{
    public function index(Request $request) {
        $departments = Department::query();
        if($request->search) {
            $departments = $departments->where('name', 'like', "%$request->search%");
        }
        return DepartmentResource::collection($departments->paginate());
    }
}
