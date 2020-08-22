<?php

namespace App\Traits\ApiResponse;

use Illuminate\Http\JsonResponse;

/**
 * Trait JsonResponseTraits
 *
 * @package App\Traits\ApiResponse
 */
trait JsonResponseTraits
{
    /**
     * @param      $data
     * @param int  $code
     *
     * @return JsonResponse
     */
    protected function successResponse($data, int $code = 202): JsonResponse
    {
        $response = ['success' => true, 'data' => $data, 'code' => $code];

        return response()->json($response, $code);
    }

    /**
     * @param       $message
     * @param array $data
     * @param int   $code
     *
     * @return JsonResponse
     */
    protected function successMessage($message, $data = [], int $code = 202): JsonResponse
    {
        $data = empty($data) ? (object)$data : $data;
        $response = ['success' => true, 'message' => $message, 'code' => $code, 'data' => $data];

        return response()->json($response, $code);
    }

    /**
     * @param     $message
     * @param int $code
     *
     * @return JsonResponse
     */
    protected function errorResponse($message, int $code = 403): JsonResponse
    {
        $response = ['success' => false, 'error' => $message, 'code' => $code, 'data' => (object)[]];

        return response()->json($response, $code);
    }

    /**
     * @param       $message
     * @param int   $code
     *
     * @return JsonResponse
     */
    protected function errorMessage($message, int $code = 403): JsonResponse
    {
        $response = ['success' => true, 'message' => $message, 'code' => $code, 'data' => (object)[]];

        return response()->json($response, $code);
    }
}
