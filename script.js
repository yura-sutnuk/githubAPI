
function addRule() {
    var form = document.querySelector('#form');

    var arr = ['size', 'forks', 'stars', 'followers'];
    var field = createSelect('field', arr);
    var option = createPlaceholder('field');
    field.insertBefore(option, field.children[0]);
    field.onclick=function(){this.style.color='black'};

    arr = ['>', '<', '='];
    var operator = createSelect('operator', arr);
    var option = createPlaceholder('operator');
    operator.insertBefore(option, operator.children[0]);
    operator.onclick=function(){this.style.color='black'};

    var value = document.createElement('input');
    value.type = 'number';
    value.name = 'value';
    value.placeholder = 'value';

    var id = 1;
    while (document.getElementById(id))
    {
        id++;
    }

    var deleteButton = document.createElement('a');
    deleteButton.className = 'Delete Button';
    deleteButton.innerHTML = "Delete";
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

function createPlaceholder(text)
{
    var option = document.createElement('option');
    option.value ='';
    option.selected = true;
    option.className = 'placeholder';
    option.innerHTML = text;
    return option;
}
function Clear()
{
    form = document.querySelector('#form');
    form.innerHTML='';
    addRule();
}
function submit()
{
    formData = getFormData();
    var req = new XMLHttpRequest();
    req.onreadystatechange = function(){
        if(req.readyState==4 && req.status == 200)
        {
            var result  = document.querySelector('#result');
            result.innerHTML = req.responseText;

            document.getElementById('body').appendChild(result);
        }
    }

    req.open("POST","file.php",true);
    req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    req.send('form='+formData);

}

function getFormData()
{
    var form = document.querySelector('#form');
    var data = new Array();
    for(var i = 0; i+2 < form.elements.length; i+=3)
    {
        var param = new Object();
        param[form.elements[i].name] = form.elements[i].value;
        param[form.elements[i+1].name] = form.elements[i+1].value;
        param[form.elements[i+2].name] = form.elements[i+2].value;
        data.push(param);
    }

    return JSON.stringify(data);
}

function Delete(id)
{
    form = document.querySelector('#form');
    var elem = document.getElementById(id);
    form.removeChild(elem);
}