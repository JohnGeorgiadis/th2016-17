<?php

header('Cache-Control: no-cache');
header('Pragma: no-cache');

$file = fopen('sniffer_log.txt', 'a+');
fputs($file, print_r($_GET, true));
fclose($file);

?>