
function addRule() {
    var form = document.querySelector('#form');

    var arr = ['size', 'forks', 'stars', 'followers'];
    var field = createSelect('field[]', arr);

    arr = ['>', '<', '='];
    var operator = createSelect('operator[]', arr);

    var value = document.createElement('input');
    value.type = 'number';
    value.name = 'value[]';

    var id = 1;
    while (document.getElementById(id))
    {
        id++;
    }

    var deleteButton = document.createElement('input');
    deleteButton.type = 'button';
    deleteButton.value = "Delete";
    deleteButton.onclick= function(){ Delete(id); };

    var div = document.createElement('div');

    div.id=id;

    div.appendChild(field);
    div.appendChild(operator);
    div.appendChild(value);
    div.appendChild(deleteButton);

    form.appendChild(div);
}

function createSelect(name, arr)
{
    var select = document.createElement('select');
    select.name=name;

    for(i=0;i<arr.length;i++)
    {
        var option = document.createElement('option');
        option.value = arr[i];
        option.text = arr[i];
        select.appendChild(option);
    }

    return select;
}
function Clear()
{
    form = document.querySelector('#form');
    form.innerHTML='';
    addRule();
}
function submit()
{
    form = document.querySelector('#form');
    form.submit();
}

function Delete(id)
{
    form = document.querySelector('#form');
    var elem = document.getElementById(id);
    form.removeChild(elem);
}