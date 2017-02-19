<html>
<head>
	<title>Test page</title>
</head>
<body>

<form method="GET">
	<input type="text" name="search" /> 
	<input type="submit" name="go" value="Search!" />
</form>

<br />
<br />

<?php

if (isset($_GET['go']))
{
	echo $_GET['search'];
}

?>

</body>
</html>

