<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Word;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class WordController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Word::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'finnish' => 'required|string|max:255',
            'english' => 'required|string|max:255',
            'example' => 'required|string|max:255',
        ]);

        $word = Word::create($validated);
        return response()->json($word, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Word::findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $word = Word::findOrFail($id);

        $validated = $request->validate([
            'finnish' => 'required|string|max:255',
            'english' => 'required|string|max:255',
            'example' => 'required|string|max:255',
        ]);

        $word->update($validated);

        return response()->json($word);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $word = Word::findOrFail($id);
        $word->delete();
        return response()->json(null, 204);
    }

    public function fetchFromFinnfast()
    {
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . env('FINNFAST_API_KEY')
        ])->get('https://finnfast.fi/api/words');

        if ($response->successful()) {
            return $response->json();
        }

        return response()->json(['error' => 'Failed to fetch data'], 500);
    }
}
