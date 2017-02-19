<?php

session_start();

mysql_connect('localhost', 'root', '');
mysql_select_db('test');

?>

<html>
<head>
	<title>Test page</title>
</head>
<body>

<?php
if (isset($_POST['go']))
{
	$sql = 'SELECT * FROM users WHERE login="'.$_POST['login'].'" AND pass="'.$_POST['pass'].'"';

	$result = mysql_query($sql);

	echo mysql_error();

	if ($row = mysql_fetch_assoc($result))
	{
		echo 'Login OK';
	}
	else
	{
		echo 'Login failed';
	}
}
else
{
?>
	<form method="POST">
		<input type="text" name="login" /> USER   <br />
		<input type="password" name="pass" /> PASSWORD <br />
		<input type="submit" name="go" value="Send" />
	</form>
<?php
}
?>

</body>
</html>
