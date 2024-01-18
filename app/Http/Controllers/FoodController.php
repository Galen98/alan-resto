<?php

namespace App\Http\Controllers;

use App\Models\Food;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;

class FoodController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $food = Food::all();

        return Inertia::render('Home',[
            'food' => $food
        ]);
    }

    public function indextransaksi(){
        $food = Food::all();

        return Inertia::render('Transaksi', [
            'food' => $food
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('AddFood');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        Validator::make($request->all(), [
            'name' => ['required'],
            'price' => ['required'],
            'photo' => ['required']
        ])->validate();

        if ($request->hasFile('photo')) {
            $uploadedFile = $request->file('photo');
            $originalFileName = $uploadedFile->getClientOriginalName();
            $photoFileName = $uploadedFile->storeAs('photos', $originalFileName, 'public');
        }

        $food = new Food();
        $food->name = $request->name;
        $food->price = $request->price;
        $food->photo = $originalFileName;
        $food->save();
        return redirect()->to('/')->with('message', 'Data berhasil ditambah');
    }

    /**
     * Display the specified resource.
     */
    public function show(Food $food)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Food $food)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Food $food)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Food $food, Request $request)
    {
        Food::find($request->id)->delete();
        return redirect()->to('/')->with('message', 'Data siswa berhasil dihapus');
    }
}
