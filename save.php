<?php

$file = 'donnees_modifiees.json';

$request_body = file_get_contents('php://input');
$data = json_decode($request_body, true);

if (!isset($data['index']) || !isset($data['data'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Données invalides']);
    exit;
}

$index = $data['index'];
$newData = $data['data'];

$existing = file_exists($file) ? json_decode(file_get_contents($file), true) : [];

$existing[$index] = $newData;

file_put_contents($file, json_encode($existing, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

echo json_encode(['success' => true]);
?>
<?php
