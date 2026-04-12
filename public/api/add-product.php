<?php
require_once 'db.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (isset($data['name'], $data['description'], $data['image_url'])) {
        try {
            $sql = "INSERT INTO products (name, description, image) VALUES (?, ?, ?)";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([$data['name'], $data['description'], $data['image_url']]);
            echo json_encode(['success' => true, 'id' => $pdo->lastInsertId()]);
        } catch (\PDOException $e) {
            echo json_encode(['success' => false, 'error' => $e->getMessage()]);
        }
    } else {
        echo json_encode(['success' => false, 'error' => 'Missing required fields.']);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Invalid request method.']);
}
?>
