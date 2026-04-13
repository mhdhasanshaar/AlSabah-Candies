<?php
require_once 'db.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (isset($data['banner_url'])) {
        try {
            // Deactivate old banners
            $pdo->query("UPDATE banners SET active = 0");
            
            // Insert new active banner
            $sql = "INSERT INTO banners (banner_url, active) VALUES (?, 1)";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([$data['banner_url']]);
            echo json_encode(['success' => true]);
        } catch (\PDOException $e) {
            echo json_encode(['success' => false, 'error' => $e->getMessage()]);
        }
    } else {
        echo json_encode(['success' => false, 'error' => 'Missing banner_url.']);
    }
}
?>
