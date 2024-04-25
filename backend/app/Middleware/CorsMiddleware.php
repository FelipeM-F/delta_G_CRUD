<?php
namespace App\Middleware;

class CorsMiddleware
{
    public function handle($request, $response, $next)
    {
        $response = $next($request);

        $response->setHeader('Access-Control-Allow-Origin', 'http://localhost:3000"');
        $response->setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
        $response->setHeader('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Accept-Encoding');

        return $response;
    }
}
