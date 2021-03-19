<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\EmployeeResource;
use App\Models\Employee;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    public function index(Request $request){
        $employees = Employee::with(['department'])->where('nik', 'like', '%'.$request->search.'%')->paginate();

        return EmployeeResource::collection($employees);
    }
}
