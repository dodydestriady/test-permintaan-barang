<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RequestItemRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'requested_by' => 'required|exists:employees,id',
            'request_date' => 'required|date_format:Y-m-d H:i:s',
            'details' => 'required|array|min:1',
            'details.*.item_id' => 'required|exists:items,id|distinct',
            'details.*.quantity' => 'required|integer|min:1',
            'details.*.note' => 'nullable'
        ];
    }
}
