<?php

 $contact_name = htmlspecialchars($_POST['name']);
 $contact_email = htmlspecialchars($_POST['email']);
 $contact_message = htmlspecialchars($_POST['message']);
 
 $to_email = 'bonganimkonto@gmail.com';
 
 $subject = "Contact Form [bonganimk.com] - {$contact_name}";

 $headers = "To: bonganimkonto@gmail.com".PHP_EOL;
 $headers .= "From: {$contact_email}".PHP_EOL;
 $headers .= "Reply-To: {$contact_email}".PHP_EOL;
 $headers .= "MIME-Version: 1.0".PHP_EOL;
 $headers .= "Date:".date('d-m-Y').PHP_EOL;
 $headers .= "X-Mailer: PHP/".phpversion().PHP_EOL;
 $headers .= "Content-Type: text/html; charset=utf-8".PHP_EOL;

 $body = '<table style="border-collapse:collapse; width: 600px; display:block; margin:0;font-family:Helvetica,sans-serif;">';
 $body .= '<tbody>';
 $body .= '<tr><td align="center" valign="top" style="text-align:left;">&#160;</td><tr>';
 $body .= '<tr><td align="center" valign="top" style="text-align:left;">'.$contact_message.'</td><tr>';
 $body .= '<tr><td align="center" valign="top" style="text-align:left;">&#160;</td><tr>';
 $body .= '<tr><td align="center" valign="top" style="text-align:left;">Bongani Mkonto &copy; '.date('Y').'</td><tr>';
 $body .= '<tr><td align="center" valign="top" style="text-align:left;">&#160;</td><tr>';
 $body .= '</tbody>';
 $body .= '</table>';

 mail($to_email, $subject, $body, $headers);

?>