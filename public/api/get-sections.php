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
    
    // Add default for 'about' if not in DB
    if (!isset($formatted['about'])) {
        $formatted['about'] = [
            'title' => 'نصنع ذكريات حلوة منذ 1947',
            'subtitle' => 'تراثنا',
            'description' => 'تأسست شركة سكاكر الصباح في دمشق عام 1947 وتعد من أول وأعرق الشركات في صناعة السكاكر والكراميل. تمتلك الشركة خبرة طويلة وسمعة مميزة في الأسواق المحلية والإقليمية، وتقدم تشكيلة واسعة وفاخرة من النكهات المتعددة لتناسب مختلف الأذواق. نلتزم دائماً بالجودة العالية والمذاق الأصيل.',
            'image_url' => '/Materials/post-new.png'
        ];
    }
    
    echo json_encode($formatted);
} catch (\PDOException $e) {
    echo json_encode(['error' => 'Query failed: ' . $e->getMessage()]);
}
?>
