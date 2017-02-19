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

$sql = 'SELECT * FROM articles WHERE id='.($_GET['id']).'';
$result = mysql_query($sql);
$row = mysql_fetch_assoc($result);

echo $row['text'];


?>

</body>
</html>
