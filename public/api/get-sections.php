<?php
require_once 'db.php';

try {
    $stmt = $pdo->query('SELECT * FROM sections');
    $sections = $stmt->fetchAll();
    
    // Format as key-value for easier frontend use
    $formatted = [];
    foreach ($sections as $section) {
        $formatted[$section['slug']] = $section;
    }
    
    echo json_encode($formatted);
} catch (\PDOException $e) {
    echo json_encode(['error' => 'Query failed: ' . $e->getMessage()]);
}
?>
