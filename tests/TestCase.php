<?php

namespace Tests;

use Orchestra\Testbench\TestCase as Orchestra;
use Outl1ne\NovaTranslatable\FieldServiceProvider;

class TestCase extends Orchestra
{
    protected function setUp(): void
    {
        parent::setUp();
    }

    protected function getPackageProviders($app): array
    {
        return [
            FieldServiceProvider::class,
        ];
    }

    public function getEnvironmentSetUp($app): void
    {

        // Control config for base testing...
        $app['config']->set('nova-translatable.locales', ['en' => 'English']);
        $app['config']->set('nova-translatable.prioritize_nova_locale', false);


        // Setup default database to use sqlite :memory:
        $app['config']->set('database.default', 'testbench');
        $app['config']->set('database.connections.testbench', [
            'driver'   => 'sqlite',
            'database' => ':memory:',
            'prefix'   => '',
        ]);

    }
}
