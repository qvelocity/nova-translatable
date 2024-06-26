<?php

namespace App\Nova;

use Laravel\Nova\Fields\Text;
use Laravel\Nova\Http\Requests\NovaRequest;
use Laravel\Nova\Resource;

class TextField extends Resource
{

    public static string $model = \App\Models\TextField::class;

    public function fields(NovaRequest $request)
    {
        return [
            Text::make('Name', 'name')->translatable(),
        ];
    }
}
