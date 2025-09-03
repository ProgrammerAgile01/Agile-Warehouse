<?php

namespace App\Http\Controllers\Generate;

use App\Http\Controllers\Controller;
use App\Models\LevelUser;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class LevelUserController extends Controller
{
    public function index()
    {
        try {
            $rows = LevelUser::orderByDesc('updated_at')->get();

            return response()->json([
                'success' => true,
                'message' => "Berhasil menampilkan data LevelUser",
                'data'    => $rows,
            ], 200);
        } catch (\Throwable $e) {
            return response()->json([
                'success'=> false,
                'message' => "Gagal menampilkan data LevelUser - " . $e->getMessage(),
            ], 500);
        }
    }

    public function show($id)
    {
        try {
            $row = LevelUser::findOrFail($id);

            return response()->json([
                'success' => true,
                'message' => "Berhasil menampilkan data LevelUser dari id: $id",
                'data'    => $row,
            ], 200);
        } catch (\Throwable $e) {
            return response()->json([
                'success'=> false,
                'message' => "Gagal menampilkan data LevelUser dari id: $id - " . $e->getMessage(),
            ], 500);
        }
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_level' => ['required', 'string', 'max:100', 'unique:level_user,nama_level'],
            'deskripsi'  => ['required', 'string'],
            'status'     => ['required', 'in:Aktif,Tidak Aktif'],
        ]);

        $row = LevelUser::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'LevelUser berhasil dibuat',
            'data'    => $row->fresh(),
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $row = LevelUser::findOrFail($id);

        $validated = $request->validate([
            'nama_level' => ['required', 'string', 'max:100', Rule::unique('level_user', 'nama_level')->ignore($row->id)],
            'deskripsi'  => ['required', 'string'],
            'status'     => ['required', 'in:Aktif,Tidak Aktif'],
        ]);

        $row->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'LevelUser berhasil diperbarui',
            'data'    => $row->fresh(),
        ]);
    }

    public function destroy($id)
    {
        LevelUser::destroy($id);
        return response()->json([
            'success' => true,
            'message' => '🗑️ Dihapus',
        ]);
    }
}
