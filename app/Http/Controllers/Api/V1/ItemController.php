<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\ItemResource;
use App\Models\Item;
use Illuminate\Http\Request;

class ItemController extends Controller
{
    public function index(Request $request)
    {
        $items = Item::with(['location', 'unit'])->where('name', 'like', '%'.$request->search.'%')->orWhere('code', 'like', '%'.$request->search.'%')->paginate();

        return ItemResource::collection($items);
    }
}
