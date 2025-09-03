<?php

namespace App\Http\Controllers\Generate;

use App\Http\Controllers\Controller;
use App\Models\AccessControlMatrix;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AccessControlMatrixController extends Controller
{
    public function index()
    {
        try {
            $rows = AccessControlMatrix::orderByDesc('updated_at')->get();

            return response()->json([
                'success' => true,
                'message' => "Berhasil menampilkan data AccessControlMatrix",
                'data'    => $rows,
            ], 200);
        } catch (\Throwable $e) {
            return response()->json([
                'success'=> false,
                'message' => "Gagal menampilkan data AccessControlMatrix - " . $e->getMessage(),
            ], 500);
        }
    }

    public function show($id)
    {
        try {
            $row = AccessControlMatrix::findOrFail($id);

            return response()->json([
                'success' => true,
                'message' => "Berhasil menampilkan data AccessControlMatrix dari id: $id",
                'data'    => $row,
            ], 200);
        } catch (\Throwable $e) {
            return response()->json([
                'success'=> false,
                'message' => "Gagal menampilkan data AccessControlMatrix dari id: $id - " . $e->getMessage(),
            ], 500);
        }
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_level_id' => ['required', 'exists:level_user,id'],
            'menu_id'       => ['required', 'exists:mst_menus,id'],
            'view'          => ['nullable', 'boolean'],
            'add'           => ['nullable', 'boolean'],
            'edit'          => ['nullable', 'boolean'],
            'delete'        => ['nullable', 'boolean'],
            'approve'       => ['nullable', 'boolean'],
        ]);

        $data = [
            'user_level_id' => $validated['user_level_id'],
            'menu_id'       => $validated['menu_id'],
            'view'          => (bool) ($validated['view'] ?? false),
            'add'           => (bool) ($validated['add'] ?? false),
            'edit'          => (bool) ($validated['edit'] ?? false),
            'delete'        => (bool) ($validated['delete'] ?? false),
            'approve'       => (bool) ($validated['approve'] ?? false),
        ];

        $row = AccessControlMatrix::create($data);

        return response()->json([
            'success' => true,
            'message' => 'AccessControlMatrix berhasil dibuat',
            'data'    => $row->fresh(),
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $row = AccessControlMatrix::findOrFail($id);

        $validated = $request->validate([
            'user_level_id' => ['required', 'exists:level_user,id'],
            'menu_id'       => ['required', 'exists:mst_menus,id'],
            'view'          => ['nullable', 'boolean'],
            'add'           => ['nullable', 'boolean'],
            'edit'          => ['nullable', 'boolean'],
            'delete'        => ['nullable', 'boolean'],
            'approve'       => ['nullable', 'boolean'],
        ]);

        $data = [
            'user_level_id' => $validated['user_level_id'],
            'menu_id'       => $validated['menu_id'],
            'view'          => (bool) ($validated['view'] ?? false),
            'add'           => (bool) ($validated['add'] ?? false),
            'edit'          => (bool) ($validated['edit'] ?? false),
            'delete'        => (bool) ($validated['delete'] ?? false),
            'approve'       => (bool) ($validated['approve'] ?? false),
        ];

        $row->update($data);

        return response()->json([
            'success' => true,
            'message' => 'AccessControlMatrix berhasil diperbarui',
            'data'    => $row->fresh(),
        ]);
    }

    public function destroy($id)
    {
        AccessControlMatrix::destroy($id);
        return response()->json([
            'success' => true,
            'message' => '🗑️ Dihapus',
        ]);
    }

    /**
     * Sinkronisasi permissions untuk satu user level.
     * Body:
     * {
     *   "user_level_id": 3,
     *   "items": [
     *     { "menu_id": 10, "view": true, "add": false, "edit": true, "delete": false, "approve": false },
     *     ...
     *   ]
     * }
     */
    public function sync(Request $request)
    {
        $payload = $request->validate([
            'user_level_id'    => ['required', 'exists:level_user,id'],
            'items'            => ['required', 'array'],
            'items.*.menu_id'  => ['required', 'exists:mst_menus,id'],
            'items.*.view'     => ['required', 'boolean'],
            'items.*.add'      => ['required', 'boolean'],
            'items.*.edit'     => ['required', 'boolean'],
            'items.*.delete'   => ['required', 'boolean'],
            'items.*.approve'  => ['required', 'boolean'],
        ]);

        $levelId = (int) $payload['user_level_id'];
        $items   = $payload['items'];

        DB::transaction(function () use ($levelId, $items) {
            foreach ($items as $it) {
                AccessControlMatrix::updateOrCreate(
                    [
                        'user_level_id' => $levelId,
                        'menu_id'       => (int) $it['menu_id'],
                    ],
                    [
                        'view'    => (bool) $it['view'],
                        'add'     => (bool) $it['add'],
                        'edit'    => (bool) $it['edit'],
                        'delete'  => (bool) $it['delete'],
                        'approve' => (bool) $it['approve'],
                    ]
                );
            }
        });

        $result = AccessControlMatrix::where('user_level_id', $levelId)->get();

        return response()->json([
            'success' => true,
            'message' => 'Permission tersinkron',
            'data'    => $result,
        ]);
    }
}
