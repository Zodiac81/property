<?php

header('Content-Type: text/plain; charset=utf-8');
// header('Content-Type: text/html; charset=utf-8');
// echo '<pre>';
// print_r($data);
// exit;
/*
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 	BASIC 	~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
$url = 'google.com';

if(!empty($_GET) and !empty($_GET['url'])){
	$url = $_GET['url'];
}

$ch = curl_init('http://'.$url);

curl_setopt ( $ch, CURLOPT_RETURNTRANSFER, true); 			// show rezult
curl_setopt ( $ch, CURLOPT_HEADER, true);					// show header`s
curl_setopt ( $ch, CURLOPT_NOBODY, true);					// show header`s
curl_setopt ( $ch, CURLOPT_FOLLOWLOCATION, true);			// следовать за redirect

curl_setopt ( $ch, CURLOPT_SSL_VERIFYHOST, false);			// get ssh без проверок
curl_setopt ( $ch, CURLOPT_SSL_VERIFYHOST, false);			// get ssh без проверок

$rezult = curl_exec($ch);

curl_close($ch);

print_r($rezult);

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 	COOKIES 	~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


$filecookie = 'temp/cookie.txt';

$ch = curl_init('http://test.site/curl/test_cook.php');

curl_setopt ( $ch, CURLOPT_RETURNTRANSFER, true); 			// show rezult
curl_setopt ( $ch, CURLOPT_HEADER, true);					// show header`s
// curl_setopt ( $ch, CURLOPT_NOBODY, true);					// show header`s
// curl_setopt ( $ch, CURLOPT_FOLLOWLOCATION, true);			// следовать за redirect

// curl_setopt ( $ch, CURLOPT_SSL_VERIFYHOST, false);			// get ssh без проверок
// curl_setopt ( $ch, CURLOPT_SSL_VERIFYHOST, false);			// get ssh без проверок

// curl_setopt ( $ch, CURLOPT_COOKIE, 'curl_session_cookie=1;');			// set cookie

curl_setopt ( $ch, CURLOPT_COOKIEJAR, $filecookie);				// save cookie in file
curl_setopt ( $ch, CURLOPT_COOKIEFILE, $filecookie);			// get cookie in file
// curl_setopt ( $ch, CURLOPT_COOKIESESSION, true); 				// ne peredavat` session-cookies

$rezult = curl_exec($ch);

curl_close($ch);

print_r($rezult);

/*


$cook = false;

if(isset( $_COOKIE[ 'curl_session_cookie' ])){
	$cook = true;
	echo "Cooka session is true";
}

if(isset( $_COOKIE[ 'curl_normal_cookie' ])){
	$cook = true;
	echo "Cooka normal is true";
}

setcookie('curl_session_cookie', 1);
setcookie('curl_normal_cookie', 1, microtime(true) + 10000);

if($cook)
{
	echo "I know you!";
} else {
	echo 'You is new user';

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 	POST 	~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

function request( $url, $post = null, $cookiefile = ''){

	$ch = curl_init('http://'.$url);

	curl_setopt ( $ch, CURLOPT_RETURNTRANSFER, true); 			// show rezult
	curl_setopt ( $ch, CURLOPT_HEADER, true);					// show header`s
	curl_setopt ( $ch, CURLOPT_NOBODY, true);					// show header`s
	curl_setopt ( $ch, CURLOPT_FOLLOWLOCATION, true);			// следовать за redirect

	curl_setopt ( $ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)');

	curl_setopt ( $ch, CURLOPT_COOKIEJAR, 'temp/cookie.txt');				// save cookie in file
	curl_setopt ( $ch, CURLOPT_COOKIEFILE, 'temp/cookie.txt');			// get cookie in file

	if(!empty($post)){
		curl_setopt ( $ch, CURLOPT_POSTFIELDS, $post);			// set post
	}

	$rezult = curl_exec($ch);
	curl_close($ch);
	return $rezult;
}

file_put_contents('temp/cookie.txt', '');

// $url = 'laravel.basic';
$url = 'laravel.basic/login';

$post = array(
	'_token' => 'XPaOtNVXDVY7ZShg7QLHoFesyJ0MzoCnIHL6UePE',
	'email' => 'zavodskiy@rambler.ru',
	'password' => 'password',
	// 'remember' => 'on'
	);

$rezult = request($url, $post);

print_r($rezult);