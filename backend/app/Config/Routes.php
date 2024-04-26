<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */

$routes->get('students', 'Student::list');
$routes->post('students', 'Student::create');
$routes->put('students/(:num)', 'Student::update/$1');
$routes->delete('students/(:num)', 'Student::delete/$1');
