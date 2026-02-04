<?php
// Configuración de destinatario
$to_email = "info@gestioncarufel.ca";

// Validar que la petición sea POST
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
    exit;
}

// Obtener y sanitizar datos del formulario
$name = isset($_POST['name']) ? strip_tags(trim($_POST['name'])) : '';
$email = isset($_POST['email']) ? filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL) : '';
$phone = isset($_POST['phone']) ? strip_tags(trim($_POST['phone'])) : '';
$service = isset($_POST['service']) ? strip_tags(trim($_POST['service'])) : '';
$budget = isset($_POST['budget']) ? strip_tags(trim($_POST['budget'])) : '';
$message = isset($_POST['message']) ? strip_tags(trim($_POST['message'])) : '';

// Validar campos requeridos
$errors = [];

if (empty($name)) {
    $errors[] = "El nombre es requerido.";
}

if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = "El correo electrónico es inválido.";
}

if (empty($phone)) {
    $errors[] = "El teléfono es requerido.";
}

if (empty($service)) {
    $errors[] = "El servicio es requerido.";
}

if (empty($message)) {
    $errors[] = "El mensaje es requerido.";
}

// Si hay errores, retornar
if (!empty($errors)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => implode(' ', $errors)]);
    exit;
}

// Traducir el servicio seleccionado
$services = [
    'construction' => 'Construcción',
    'excavation' => 'Excavación',
    'earthwork' => 'Terrassement',
    'landscaping' => 'Paisajismo',
    'project-management' => 'Gestión de Proyectos',
    'other' => 'Otro'
];
$service_name = isset($services[$service]) ? $services[$service] : $service;

// Traducir el presupuesto
$budgets = [
    'less-10k' => 'Menos de $10,000',
    '10k-25k' => '$10,000 - $25,000',
    '25k-50k' => '$25,000 - $50,000',
    '50k-100k' => '$50,000 - $100,000',
    'more-100k' => 'Más de $100,000',
    'not-sure' => 'No estoy seguro'
];
$budget_name = isset($budgets[$budget]) ? $budgets[$budget] : $budget;

// Crear el asunto del correo
$subject = "Nueva Solicitud de Cotización - $service_name - Gestion Carufel";

// Crear el mensaje HTML
$email_message = "
<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #FF6B35; color: white; padding: 20px; text-align: center; }
        .content { background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
        .field { margin-bottom: 15px; }
        .field-label { font-weight: bold; color: #FF6B35; }
        .field-value { margin-top: 5px; }
        .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h2>Nueva Solicitud de Cotización</h2>
        </div>
        <div class='content'>
            <div class='field'>
                <div class='field-label'>Nombre Completo:</div>
                <div class='field-value'>$name</div>
            </div>
            
            <div class='field'>
                <div class='field-label'>Correo Electrónico:</div>
                <div class='field-value'><a href='mailto:$email'>$email</a></div>
            </div>
            
            <div class='field'>
                <div class='field-label'>Teléfono:</div>
                <div class='field-value'><a href='tel:$phone'>$phone</a></div>
            </div>
            
            <div class='field'>
                <div class='field-label'>Servicio de Interés:</div>
                <div class='field-value'>$service_name</div>
            </div>
            
            <div class='field'>
                <div class='field-label'>Presupuesto Estimado:</div>
                <div class='field-value'>$budget_name</div>
            </div>
            
            <div class='field'>
                <div class='field-label'>Mensaje / Descripción del Proyecto:</div>
                <div class='field-value'>" . nl2br($message) . "</div>
            </div>
        </div>
        <div class='footer'>
            <p>Este correo fue enviado desde el formulario de contacto de Gestion Carufel Inc.</p>
            <p>Fecha: " . date('d/m/Y H:i:s') . "</p>
        </div>
    </div>
</body>
</html>
";

// Headers del correo
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= "From: Formulario Web Gestion Carufel <noreply@gestioncarufel.ca>" . "\r\n";
$headers .= "Reply-To: $email" . "\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Enviar el correo a la empresa
$email_sent_to_company = mail($to_email, $subject, $email_message, $headers);

// Crear correo de confirmación para el cliente
$client_subject = "Confirmación de Solicitud - Gestion Carufel Inc.";

$client_email_message = "
<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #FF6B35; color: white; padding: 20px; text-align: center; }
        .content { background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
        .message-box { background-color: #fff; padding: 15px; margin: 15px 0; border-left: 4px solid #FF6B35; }
        .field { margin-bottom: 15px; }
        .field-label { font-weight: bold; color: #FF6B35; }
        .field-value { margin-top: 5px; }
        .contact-info { background-color: #fff; padding: 15px; margin: 15px 0; border-radius: 5px; }
        .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h2>¡Gracias por contactarnos!</h2>
        </div>
        <div class='content'>
            <div class='message-box'>
                <p><strong>Hola $name,</strong></p>
                <p>Hemos recibido tu solicitud de cotización correctamente. Nuestro equipo la revisará y se pondrá en contacto contigo en menos de 24 horas.</p>
            </div>
            
            <h3 style='color: #FF6B35;'>Resumen de tu solicitud:</h3>
            
            <div class='field'>
                <div class='field-label'>Servicio de Interés:</div>
                <div class='field-value'>$service_name</div>
            </div>
            
            <div class='field'>
                <div class='field-label'>Presupuesto Estimado:</div>
                <div class='field-value'>$budget_name</div>
            </div>
            
            <div class='field'>
                <div class='field-label'>Mensaje / Descripción del Proyecto:</div>
                <div class='field-value'>" . nl2br($message) . "</div>
            </div>
            
            <div class='contact-info'>
                <h4 style='color: #FF6B35; margin-top: 0;'>Información de Contacto</h4>
                <p><strong>Teléfono:</strong> <a href='tel:+14509323608'>450-932-3608</a></p>
                <p><strong>Correo:</strong> <a href='mailto:info@gestioncarufel.ca'>info@gestioncarufel.ca</a></p>
                <p><strong>Dirección:</strong> 280 Rang Point du Jour Nord, L'Assomption, QC J5W 1G7, CA</p>
                <p><strong>Horario:</strong> Lunes a Viernes: 7:00 - 18:00 | Sábado: 8:00 - 14:00</p>
            </div>
            
            <p style='margin-top: 20px;'><em>Si tienes alguna pregunta adicional, no dudes en contactarnos directamente.</em></p>
        </div>
        <div class='footer'>
            <p><strong>Gestion Carufel Inc.</strong></p>
            <p>Expertos en construcción, excavación y gestión de proyectos</p>
            <p>Fecha de solicitud: " . date('d/m/Y H:i:s') . "</p>
        </div>
    </div>
</body>
</html>
";

// Headers para el correo del cliente
$client_headers = "MIME-Version: 1.0" . "\r\n";
$client_headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$client_headers .= "From: Gestion Carufel Inc. <info@gestioncarufel.ca>" . "\r\n";
$client_headers .= "Reply-To: info@gestioncarufel.ca" . "\r\n";
$client_headers .= "X-Mailer: PHP/" . phpversion();

// Enviar correo de confirmación al cliente
$email_sent_to_client = mail($email, $client_subject, $client_email_message, $client_headers);

// Verificar si ambos correos se enviaron correctamente
if ($email_sent_to_company && $email_sent_to_client) {
    http_response_code(200);
    echo json_encode([
        'success' => true, 
        'message' => '¡Gracias por tu solicitud! Hemos enviado una copia a tu correo. Nos pondremos en contacto contigo en menos de 24 horas.'
    ]);
} else if ($email_sent_to_company) {
    // Si solo se envió a la empresa
    http_response_code(200);
    echo json_encode([
        'success' => true, 
        'message' => 'Tu solicitud ha sido enviada correctamente. Nos pondremos en contacto contigo en menos de 24 horas.'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'message' => 'Hubo un error al enviar tu solicitud. Por favor, intenta de nuevo o contáctanos directamente.'
    ]);
}
?>
