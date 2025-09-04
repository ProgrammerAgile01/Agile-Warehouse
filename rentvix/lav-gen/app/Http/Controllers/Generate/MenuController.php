<?php

namespace App\Http\Controllers\Generate;

use App\Http\Controllers\Controller;
use App\Models\Menu;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MenuController extends Controller
{
    // GET /api/menus?product_code=RENTVIX&trash=with|only|none
    public function index(Request $req)
    {
        $productCode = $req->query('product_code');
        $trash = $req->query('trash', 'none');

        $q = Menu::query()->forProduct($productCode);
        if ($trash === 'with') $q->withTrashed();
        elseif ($trash === 'only') $q->onlyTrashed();

        return response()->json(['success' => true, 'data' => $q->orderBy('order_number')->get()]);
    }

 
   public function tree(Request $req)
{
    $q = Menu::query();

    if ($pc = $req->query('product_code')) {
        $q->forProduct($pc);
    }
    if (!$req->boolean('include_inactive')) {
        $q->active();
    }

    $roots = $q->whereNull('parent_id')
        ->orderBy('order_number')
        ->with(['recursiveChildren'])
        ->get();

    /** @var callable|null $mapNode */
    $mapNode = null; // <-- pre-declare agar analyzer tidak protes
  // Map ke bentuk tree generik { id, title, type, children:[] }
$mapNode = function (Menu $m) use (&$mapNode) {
    $rawType = strtolower($m->type ?? '');

    // Akui 'submenu' sebagai kontainer juga
    if (in_array($rawType, ['group', 'module', 'menu', 'submenu'], true)) {
        $type = $rawType === 'submenu' ? 'module' : $rawType;
    } else {
        // fallback by level
        $lvl = (int) ($m->level ?? 0);
        $type = ($lvl <= 0)
            ? 'group'
            : ($lvl === 1 ? 'module' : 'menu');
    }

    return [
        'id'         => $m->id,
        'title'      => $m->title,
        'type'       => $type,               // <-- sekarang 'submenu' jadi 'module'
        'route_path' => $m->route_path,
        'icon'       => $m->icon,
        'color'      => $m->color,
        'children'   => $m->recursiveChildren
            ? $m->recursiveChildren->map(fn($c) => $mapNode($c))->values()->all()
            : [],
    ];
};


    $data = $roots->map(fn (Menu $m) => $mapNode($m))->values()->all();

    return response()->json([
        'success' => true,
        'data'    => $data,
    ]);
}




    public function store(Request $req)
    {
        $data = $req->validate([
            'title'        => ['required', 'string', 'max:255'],
            'type'         => ['required', 'in:group,module,menu,submenu'],
            'product_code' => ['nullable', 'string', 'max:64'],
            'parent_id'    => ['nullable', 'exists:mst_menus,id'],
            'icon'         => ['nullable', 'string', 'max:100'],
            'color'        => ['nullable', 'string', 'max:32'],
            'order_number' => ['nullable', 'integer'],
            'crud_builder_id' => ['nullable', 'exists:crud_builders,id'],
            'route_path'   => ['nullable', 'string', 'max:255'],
            'is_active'    => ['nullable', 'boolean'],
            'note'         => ['nullable', 'string'],
            'created_by'   => ['nullable', 'exists:users,id'],
        ]);

        $data['level'] = !empty($data['parent_id'])
            ? (int) (Menu::find($data['parent_id'])->level ?? 0) + 1
            : 1;

        $row = Menu::create($data);
        return response()->json(['success' => true, 'data' => $row], 201);
    }

    public function show(string $id)
    {
        return response()->json(['success' => true, 'data' => Menu::withTrashed()->findOrFail($id)]);
    }

    public function update(Request $req, string $id)
    {
        $data = $req->validate([
            'title'        => ['sometimes', 'string', 'max:255'],
            'type'         => ['sometimes', 'in:group,module,menu,submenu'],
            'product_code' => ['sometimes', 'nullable', 'string', 'max:64'],
            'parent_id'    => ['sometimes', 'nullable', 'exists:mst_menus,id'],
            'icon'         => ['sometimes', 'nullable', 'string', 'max:100'],
            'color'        => ['sometimes', 'nullable', 'string', 'max:32'],
            'order_number' => ['sometimes', 'integer'],
            'crud_builder_id' => ['sometimes', 'nullable', 'exists:crud_builders,id'],
            'route_path'   => ['sometimes', 'nullable', 'string', 'max:255'],
            'is_active'    => ['sometimes', 'boolean'],
            'note'         => ['sometimes', 'nullable', 'string'],
            'created_by'   => ['sometimes', 'nullable', 'exists:users,id'],
        ]);

        $row = Menu::withTrashed()->findOrFail($id);

        if (array_key_exists('parent_id', $data)) {
            $parentLevel = $data['parent_id'] ? ((int)(Menu::find($data['parent_id'])->level ?? 0)) : 0;
            $data['level'] = $data['parent_id'] ? $parentLevel + 1 : 1;
        }

        $row->update($data);
        return response()->json(['success' => true, 'data' => $row]);
    }

    public function destroy(string $id)
    {
        Menu::findOrFail($id)->delete();
        return response()->json(['success' => true]);
    }

    public function restore(string $id)
    {
        $row = Menu::onlyTrashed()->findOrFail($id);
        $row->restore();
        return response()->json(['success' => true, 'data' => $row]);
    }

    public function forceDelete(string $id)
    {
        DB::transaction(function () use ($id) {
            $this->deleteSubtree((int)$id);
        });
        return response()->json(['success' => true]);
    }

    private function deleteSubtree(int $id): void
    {
        $node = Menu::withTrashed()->find($id);
        if (!$node) return;

        $children = Menu::withTrashed()->where('parent_id', $id)->get();
        foreach ($children as $ch) $this->deleteSubtree((int)$ch->id);

        $node->forceDelete();
    }

    // POST /api/menus/reorder
    // Body: [{ "id": 10, "order_number": 1, "parent_id": null }, ...]
    public function reorder(Request $req)
    {
        $items = $req->validate([
            '*.id'           => ['required', 'integer', 'exists:mst_menus,id'],
            '*.order_number' => ['required', 'integer'],
            '*.parent_id'    => ['nullable', 'integer', 'exists:mst_menus,id'],
        ]);

        DB::transaction(function () use ($items) {
            foreach ($items as $it) {
                $m = Menu::find($it['id']);
                $m->order_number = $it['order_number'];
                $m->parent_id    = $it['parent_id'] ?? null;
                $m->level        = $m->parent_id ? ((int)(Menu::find($m->parent_id)->level ?? 0) + 1) : 1;
                $m->save();
            }
        });

        return response()->json(['success' => true]);
    }
    
}