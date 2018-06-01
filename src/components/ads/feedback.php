<?php
$to = "iliya.mryhin@sumotori.ru, dosananim@mail.ru";
$subject = "Feedback order";
$post = json_decode(file_get_contents('php://input'), true);

$login = $post['login'];
$password = $post['password'];
$email = $post['email'];

$message = "
<html>
<head>
<title>Заявка на обратную связь</title>
</head>
<style>
table {
  border: 1px solid black;
}
</style>
<body>
<p>Заявка на оценку автомобиля по Trade-In</p>
<table>
  <tr>
    <th>Марка</th>
    <th>Модель</th>
    <th>Год</th>
  </tr>
  <tr>
    <td>$login</td>
    <td>$password</td>
    <td>$email</td>
  </tr>
</table>
</body>
</html>
";

// Always set content-type when sending HTML email
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

// More headers
$headers .= 'From: <webmaster@example.com>' . "\r\n";
$headers .= 'Cc: myboss@example.com' . "\r\n";

mail($to,$subject,$message,$headers);
$req = 'ok';
echo json_encode($req);
die;
?>