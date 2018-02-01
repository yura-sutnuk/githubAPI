<?php


$size = count($_POST['field']);
$request = 'q=';
for($i=0;$i<$size;$i++)
{
    if(!empty($_POST['value'][$i]) )
    {
        if($i>0)
        {
            $request .= '+';
        }
        if($_POST['operator'][$i] == '=')
        {
            $_POST['operator'][$i] = '';
        }

        $request .= $_POST['field'][$i].":";
        $request .= $_POST['operator'][$i];
        $request .= $_POST['value'][$i];
    }
}

$connection = curl_init();
curl_setopt($connection, CURLOPT_URL, "https://api.github.com/search/repositories?{$request}");
curl_setopt($connection, CURLOPT_USERAGENT,  "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.1; Trident/4.0; GTB7.0; .NET CLR 1.1.4322; .NET CLR 2.0.50727; .NET CLR 3.0.4506.2152; .NET CLR 3.5.30729; .NET4.0C; .NET4.0E)");
curl_setopt($connection, CURLOPT_RETURNTRANSFER, 1);
$result = json_decode(curl_exec($connection));

$items = $result->items;
foreach($items as $item)
{
    echo 'name: '.$item->name.'<br>';
    echo 'src: '.$item->html_url.'<br>';
    echo 'size: '.$item->size.'<br>';
    echo 'forks count: '.$item->forks_count.'<br>';
    echo 'stars: '.$item->stargazers_count.'<br>';

    echo '<br><br>';
}

curl_close($connection);