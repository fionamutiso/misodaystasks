<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Category;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 5);
        $query = User::query();
        if ($request->has('category_id')) {
            $query->where('category_id', $request->input('category_id'));
        }
        $users = $query->paginate($perPage);
        return response()->json([
            'data' => $users->items(),
            'meta' => [
                'current_page' => $users->currentPage(),
                'last_page' => $users->lastPage(),
                'per_page' => $users->perPage(),
                'total' => $users->total(),
            ]
        ]);
    }

    public function categories()
    {
        return response()->json(Category::all());
    }

    public function setCategory(Request $request)
    {
        $request->validate([
            'category_id' => 'required|exists:categories,id',
        ]);
        $user = $request->user();
        $user->category_id = $request->input('category_id');
        $user->save();
        return response()->json(['success' => true, 'category_id' => $user->category_id]);
    }
} 