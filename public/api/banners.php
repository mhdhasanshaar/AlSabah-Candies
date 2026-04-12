<?php
require_once 'db.php';

try {
    $stmt = $pdo->query('SELECT * FROM banners WHERE active = 1 LIMIT 1');
    $banner = $stmt->fetch();
    echo json_encode($banner ? $banner : ['banner' => '']);
} catch (\PDOException $e) {
    echo json_encode(['error' => 'Query failed: ' . $e->getMessage()]);
}
?>
