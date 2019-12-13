<?
error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Access-Control-Allow-Origin: *');

// $user_token = '66e49a00446fc6c201d160785f1efc474e00bca8';
// header('Authorization:', 'Basic' . $user_token);
?>
<!DOCTYPE html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>ephemera</title>
    <link href="../assets/css/chosen.css" rel="stylesheet" type="text/css">
    <link href="../assets/css/style.css?=v1" rel="stylesheet" type="text/css">
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-T8Gy5hrqNKT+hzMclPo118YTQO6cYprQmhrYwIiQ/3axmI1hQomh7Ud2hPOy8SP1" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
</head>

<body onload="upNextLoadPostcards()">
    <div id="wrapper"><!--start wrapper-->