<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\RequestItemRequest;
use App\Http\Resources\RequestItemResource;
use App\Models\Item;
use App\Models\RequestItem;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RequestItemController extends Controller
{
    public function index(Request $request)
    {
        $requestItems = RequestItem::with(['requester']);

        if($request->search) {
            $requestItems = $requestItems->where('code', 'like', "%$request->search%");
        }
        return RequestItemResource::collection($requestItems->paginate());
    }

    public function store(RequestItemRequest $request)
    {
        DB::beginTransaction();

        try {
            $payload = $request->validated();
            $request_item = $request->user()->request_item()->create($payload);
            foreach ($payload['details'] as $key => $detail) {
                $item = Item::where([
                    ['stock', '>=', $detail['quantity']],
                    ['id', $detail['item_id']]
                ])->decrement('stock', $detail['quantity']);
                if ($item) {
                    $request_item->details()->create($detail);
                } else {
                    return response()->json([
                        'message' => 'insufficient stock',
                        'errors' => [
                            $detail['name'] => [
                                'the stock of this item is insufficient '
                            ]
                        ]
                    ], 422);
                    DB::rollback();
                }
            }

            DB::commit();
            return $request_item;
        } catch (Exception $e) {
            DB::rollback();
            return $e;
        }
    }
}
