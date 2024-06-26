<?php

use Laravel\Nova\Fields\Markdown;
use Laravel\Nova\Fields\Number;
use Laravel\Nova\Fields\Text;
use Laravel\Nova\Fields\Textarea;
use Tests\Fixtures\TestModel;
use function Pest\Faker\fake;

it('mixes into text fields', function (string $fieldClass) {
    $mixedField = $fieldClass::make('Name')->translatable();
    $this->assertTrue($mixedField->__translatable);
    $this->assertInstanceOf($fieldClass, $mixedField);
})->with([
    [Text::class],
    [Number::class],
    [Markdown::class],
    [Textarea::class]
]);

it('test_it_prepares_meta_for_vue_render_as_expected', function (string $fieldClass) {

    $nativeField = $fieldClass::make('Name');
    $field = $fieldClass::make('Name')->translatable();
    $instance = TestModel::make(['name' => ['en' => fake()->word]]);

    $field->resolve($instance, 'name');

    $this->assertEquals('name', $field->meta['translatable']['original_attribute']);
    $this->assertEquals($nativeField->component, $field->meta['translatable']['original_component']);
    $this->assertEquals($instance->name, $field->meta['translatable']['value']);

    $this->assertEquals(config('nova-translatable.prioritize_nova_locale'), $field->meta['translatable']['prioritize_nova_locale']);
    $this->assertEquals(config('nova-translatable.display_type'), $field->meta['translatable']['display_type']);
    $this->assertEquals(config('nova-translatable.locales'), $field->meta['translatable']['locales']);
    $this->assertArrayNotHasKey('previewFor', $field->meta['translatable']);

})->with([
    [Text::class],
    [Number::class],
    [Textarea::class]
]);

test('It does prepare the previewFor Markdown fields', function () {

    $fieldClass = Markdown::class;
    $nativeField = $fieldClass::make('Name');
    $field = $fieldClass::make('Name')->translatable();
    $instance = TestModel::make(['name' => ['en' => fake()->word]]);

    $field->resolve($instance, 'name');

    $this->assertEquals('name', $field->meta['translatable']['original_attribute']);
    $this->assertEquals($nativeField->component, $field->meta['translatable']['original_component']);
    $this->assertEquals($instance->name, $field->meta['translatable']['value']);

    $this->assertArrayHasKey('previewFor', $field->meta['translatable']);

    $this->assertEquals(
        sprintf(sprintf("<p>%%s</p>%s", PHP_EOL), $instance->name['en']),
        $field->meta['translatable']['previewFor']['en']
    );

});

test('it does not mangle 0 value to float for text field', function () {
    $field = Text::make('Name')->translatable();
    $instance = TestModel::make(['name' => ['en' => 0]]);

    $field->resolve($instance, 'name');
    $this->assertSame((string)$instance->name['en'], $field->meta['translatable']['value']['en']);
});

test('it does cast number to float for number field', function () {
    $field = Number::make('Name')->translatable();
    $instance = TestModel::make(['name' => ['en' => 0]]);

    $field->resolve($instance, 'name');
    $this->assertSame((float)$instance->name['en'], $field->meta['translatable']['value']['en']);
});







