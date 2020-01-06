<?php

// Replace this with your own email address
$siteOwnersEmail = 'presupuestos@cornerfestival.com';


if($_POST) {

   $contactEmail = trim(stripslashes($_POST['contactEmail']));
   $contactCompany = trim(stripslashes($_POST['contactCompany']));
   $contactCheck = trim(stripslashes($_POST['contactCheck']));
   $contactMessage = trim(stripslashes($_POST['contactMessage']));
   $contactSubject = "Mensaje desde sitio web";

   // Check Name
	if (strlen($contactCompany) < 2) {
		$error['name'] = "<span>Ingrese el nombre</span>";
	}
	//if (strlen($contactApellido) < 2) {
	//	$error['apellido'] = "Ingrese su Apellido";
	//}
	// Check Email
	if (!preg_match('/^[a-z0-9&\'\.\-_\+]+@[a-z0-9\-]+\.([a-z0-9\-]+\.)*+[a-z]{2}/is', $contactEmail)) {
		$error['email'] = "<span>Ingrese un email v&aacute;lido</span>";
	}
	// Check Message
	//if (strlen($contactMessage) < 15) {
		//$error['message'] = "<span>Ingrese un mensaje, de al menos 15 caracteres</span>";
	//}
   // Subject
	/*if (strlen($contactSubject) < 2) {
		$error['subject'] = "You must enter a subject";
	}*/
	


   // Set Message
   $message .= "<strong>De:</strong> " . $contactCompany . "<br />";
   //$message .= "<strong>Apellido:</strong> " . $contactApellido . "<br />";
   //$message .= "<strong>Telefono:</strong> " . $contactTelefono . "<br />";
   $message .= "<strong>Email:</strong> " . $contactEmail . "<br />";
   $message .= "<strong>Mensaje:</strong> " . $contactMessage . "<br />";
   $message .= "<br /> ----- <br /> Este es un formulario de consulta desde cornerfestival.com <br />";

   // Set From: header
   $from =  $contactCompany . " <" . $contactEmail . ">";

   // Email Headers
	$headers = "From: " . $from . "\r\n";
	$headers .= "Reply-To: ". $contactEmail . "\r\n";
 	$headers .= "MIME-Version: 1.0\r\n";
	$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";


   if (!$error) {

      ini_set("sendmail_from", $siteOwnersEmail); // for windows server
      $mail = mail($siteOwnersEmail, $contactSubject, $message, $headers);

		if ($mail) { echo "OK"; }
      else { echo "Hubo un error, por favor vuelva a intentarlo"; }
		
	} # end if - no validation error

	else {

		$response = (isset($error['name'])) ? $error['name'] . "<br /> \n" : null;
		//$response .= (isset($error['apellido'])) ? $error['apellido'] . "<br />" : null;
		$response .= (isset($error['email'])) ? $error['email'] . "<br /> \n" : null;
		//$response .= (isset($error['subject'])) ? $error['subject'] . "<br />" : null;
		
		echo $response;

	} # end if - there was a validation error

}

?>