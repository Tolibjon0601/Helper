<?php
$name = $_POST['name'];
$email = $_POST['email'];
$subject = $_POST['subject'];
$message = $_POST['message'];

require '/vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;

$mail = new PHPMailer(true);

try {
    $mail->isSMTP();                                  // SMTP ishlatishni yoqish
    $mail->Host = 'smtp.gmail.com';                    // SMTP server
    $mail->SMTPAuth = true;                            // SMTP autentifikatsiyasi
    $mail->Username = 'your@email.com';                // SMTP foydalanuvchi ismi
    $mail->Password = 'password';                      // SMTP parol
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // TLS xavfsizlikni yoqish
    $mail->Port = 587;                                // SMTP porti

    // Yuboruvchini o'rnatish
    $mail->setFrom($email, $name);

    // Qabul qiluvchini o'rnatish
    $mail->addAddress('egamberdiyevtolibjon0601@gmail.com', 'Recipient Name');

    // Mavzu va xabar matnini o'rnatish
    $mail->Subject = $subject;
    $mail->Body = $message;

    // Emailni yuborish
    $mail->send();
    echo 'Email yuborildi!';
} catch (Exception $e) {
    echo "Xatolik yuz berdi: {$mail->ErrorInfo}";
}
?>
