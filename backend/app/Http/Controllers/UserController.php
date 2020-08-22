<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Traits\ApiResponse\JsonResponseTraits;
use App\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Class UserController
 *
 * @package App\Http\Controllers
 */
class UserController extends Controller
{
    use JsonResponseTraits;

    /**
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $data = User::select(["id", "name", "email", "state"])->get();

        return $this->successResponse(UserResource:: collection($data));
    }

    /**
     * @param Request $request
     * @param         $id
     *
     * @return JsonResponse
     */
    public function update(Request $request, $id): JsonResponse
    {
        $state = $request->get('state');

        User::where([['id', $id]])->update(['state' => $state]);

        return $this->successMessage("Update complete");
    }
}
