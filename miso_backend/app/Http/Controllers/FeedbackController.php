<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Feedback;

class FeedbackController extends Controller
{
    // List all feedback for the authenticated user
    public function index(Request $request)
    {
        $user = $request->user();
        $feedback = Feedback::where('user_id', $user->id)
            ->orderBy('created_at', 'desc')->get();
        return response()->json($feedback);
    }

    // Store new feedback
    public function store(Request $request)
    {
        $validated = $request->validate([
            'text' => 'required|string|max:1000',
            'rating' => 'required|integer|min:1|max:5',
        ]);

        $feedback = new Feedback();
        $feedback->text = $validated['text'];
        $feedback->rating = $validated['rating'];
        $feedback->user_id = $request->user()->id;
        $feedback->save();

        return response()->json(['message' => 'Feedback submitted successfully', 'feedback' => $feedback], 201);
    }
}
