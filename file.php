<?php

$form = $_POST['form'];
$form = json_decode($form);

$size = count($form);
$request = null;
for($i=0;$i<$size;$i++)
{
    if(empty($form[$i]->value) || empty($form[$i]->field) || empty($form[$i]->operator)  )
    {
        continue;
    }
    else
    {
        if($i>0)
        {
            $request .= '+';
        }
        if($form[$i]->operator == '=')
        {
            $form[$i]->operator = '';
        }

        $request .= $form[$i]->field.":";
        $request .= $form[$i]->operator;
        $request .= $form[$i]->value;
    }
}
if($request == null)
{
    echo 'Rules are empty';
    return;
}
$connection = curl_init();
curl_setopt($connection, CURLOPT_URL, "https://api.github.com/search/repositories?q={$request}");
curl_setopt($connection, CURLOPT_USERAGENT,  "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.1; Trident/4.0; GTB7.0; .NET CLR 1.1.4322; .NET CLR 2.0.50727; .NET CLR 3.0.4506.2152; .NET CLR 3.5.30729; .NET4.0C; .NET4.0E)");
curl_setopt($connection, CURLOPT_RETURNTRANSFER, 1);

$result = json_decode(curl_exec($connection));
curl_close($connection);

$items = $result->items;
$response = null;
foreach($items as $item)
{

    $response .= 'name: '.$item->name.'<br>';
    $response .= 'src: '.$item->html_url.'<br>';
    $response .= 'size: '.$item->size.'<br>';
    $response .= 'forks count: '.$item->forks_count.'<br>';
    $response .= 'stars: '.$item->stargazers_count.'<br>';

    $response .= '<br><br>';
}

echo $response;
