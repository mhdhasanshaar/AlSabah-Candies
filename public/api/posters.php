<?php
require_once 'db.php';

try {
    $stmt = $pdo->query('SELECT * FROM posters');
    $posters = $stmt->fetchAll();
    echo json_encode($posters);
} catch (\PDOException $e) {
    echo json_encode(['error' => 'Query failed: ' . $e->getMessage()]);
}
?>
