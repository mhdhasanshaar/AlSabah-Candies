<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

$target_dir = "../uploads/products/";

// Create directory if it doesn't exist
if (!file_exists($target_dir)) {
    mkdir($target_dir, 0777, true);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['image'])) {
    $file = $_FILES['image'];
    $file_extension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
    $new_filename = uniqid() . '.' . $file_extension;
    $target_file = $target_dir . $new_filename;

    // Check if image file is a actual image
    $check = getimagesize($file['tmp_name']);
    if($check !== false) {
        if (move_uploaded_file($file['tmp_name'], $target_file)) {
            $public_url = "https://alsabahcandies.com/uploads/products/" . $new_filename;
            echo json_encode(['success' => true, 'url' => $public_url]);
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
