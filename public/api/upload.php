<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Determine target directory based on type
$type = isset($_POST['type']) ? $_POST['type'] : 'products';
$allowed_types = ['products', 'banners', 'sections'];

if (!in_array($type, $allowed_types)) {
    $type = 'products';
}

$base_dir = "../uploads/" . $type . "/";

// Create directory if it doesn't exist
if (!file_exists($base_dir)) {
    mkdir($base_dir, 0777, true);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['image'])) {
    $file = $_FILES['image'];
    $original_name = pathinfo($file['name'], PATHINFO_FILENAME);
    $extension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
    
    // Sanitize filename
    $original_name = preg_replace("/[^a-zA-Z0-9_-]/", "_", $original_name);
    
    $filename = $original_name . '.' . $extension;
    $target_file = $base_dir . $filename;
    
    // Handle duplicate filenames
    $counter = 1;
    while (file_exists($target_file)) {
        $filename = $original_name . '-' . $counter . '.' . $extension;
        $target_file = $base_dir . $filename;
        $counter++;
    }

    // Check if image file is a actual image
    $check = getimagesize($file['tmp_name']);
    if($check !== false) {
        if (move_uploaded_file($file['tmp_name'], $target_file)) {
            // Return relative path as requested
            $relative_url = "/uploads/" . $type . "/" . $filename;
            echo json_encode(['success' => true, 'url' => $relative_url]);
        } else {
            echo json_encode(['success' => false, 'error' => 'Failed to move uploaded file.']);
        }
    } else {
        echo json_encode(['success' => false, 'error' => 'File is not an image.']);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Invalid request.']);
}
?>
