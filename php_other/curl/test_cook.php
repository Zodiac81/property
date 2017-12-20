<?php

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
}