<?php

namespace App\Nova;

use Laravel\Nova\Fields\Text;
use Laravel\Nova\Http\Requests\NovaRequest;
use Laravel\Nova\Resource;
use Outl1ne\NovaSimpleRepeatable\SimpleRepeatable;

class TestModelRepeatable extends Resource
{
    public static string $model = \App\Models\TestModelRepeatable::class;

    public function fields(NovaRequest $request)
    {
        return [
            SimpleRepeatable::make('Fields', 'name', [
                Text::make('Key')->translatable(),
            ]),
        ];
    }
}
