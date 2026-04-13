<?php
require_once 'db.php';

try {
    $stmt = $pdo->query('SELECT * FROM banners WHERE active = 1 ORDER BY id DESC LIMIT 1');
    $banner = $stmt->fetch();
    
    // Check for both 'banner_url' and 'banner' columns for robustness
    $banner_url = '';
    if ($banner) {
        $banner_url = isset($banner['banner_url']) ? $banner['banner_url'] : (isset($banner['banner']) ? $banner['banner'] : '');
    }
    
    if (!$banner_url) {
        $banner_url = '/Materials/smooth-looping.mp4';
    }
    
    echo json_encode(['banner' => $banner_url]);
} catch (\PDOException $e) {
    echo json_encode(['error' => 'Query failed: ' . $e->getMessage()]);
}
?>
