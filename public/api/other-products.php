<?php
require_once 'db.php';

try {
    $stmt = $pdo->query('SELECT * FROM other_products ORDER BY id DESC');
    $products = $stmt->fetchAll();
    echo json_encode($products);
} catch (\PDOException $e) {
    echo json_encode(['error' => 'Query failed: ' . $e->getMessage()]);
}
?>
