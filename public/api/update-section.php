<?php
require_once 'db.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (isset($data['slug'], $data['title'], $data['subtitle'], $data['description'], $data['image_url'])) {
        try {
            // Check if section exists
            $check = $pdo->prepare("SELECT id FROM sections WHERE slug = ?");
            $check->execute([$data['slug']]);
            
            if ($check->fetch()) {
                $sql = "UPDATE sections SET title = ?, subtitle = ?, description = ?, image_url = ? WHERE slug = ?";
                $stmt = $pdo->prepare($sql);
                $stmt->execute([$data['title'], $data['subtitle'], $data['description'], $data['image_url'], $data['slug']]);
            } else {
                $sql = "INSERT INTO sections (slug, title, subtitle, description, image_url) VALUES (?, ?, ?, ?, ?)";
                $stmt = $pdo->prepare($sql);
                $stmt->execute([$data['slug'], $data['title'], $data['subtitle'], $data['description'], $data['image_url']]);
            }
            echo json_encode(['success' => true]);
        } catch (\PDOException $e) {
            echo json_encode(['success' => false, 'error' => $e->getMessage()]);
        }
    } else {
        echo json_encode(['success' => false, 'error' => 'Missing fields']);
    }
}
?>
