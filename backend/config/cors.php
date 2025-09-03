<?php
return [
    'paths' => ['api/*', 'login', 'logout', 'sanctum/csrf-cookie', '/'],
    'allowed_methods' => ['*'],
    'allowed_origins' => [
        'http://localhost:5173', // o la porta del tuo frontend
    ],
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true,
];