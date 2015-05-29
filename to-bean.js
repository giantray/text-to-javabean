//todo:2、处理对象中有对象的情况
//todo:3、一键复制
//todo:4、能让用户自定义输入要使用的package

function main() {

    try {
        //获取要解析的文本
        var text = document.getElementById('input-textarea').value;
        var textType = document.getElementById('source-type').innerHTML;


        if (text) {


            var fields;
            if (textType === 'json') {
                fields = getBeanFieldFromJson(text);
            } else if (textType === 'sql') {
                alert("还没实现");
            }

            var beanText = toBeanText(fields);
            //beanText = beanText.replace(/\n/g, "<br />");
            document.getElementById('result').innerHTML = beanText;
        }
    }
    catch(e){
        document.getElementById('result').innerHTML = '无法解析，请确认格式正确'
    }

}



function toBeanText(beanFields) {
    var importText = "";
    var fieldText = "";
    var setterText = "";

    var typeSet = {};

    var shoudImportJackson = false;
    for (key in beanFields) {
        var camelKey = camelCase(key);
        if (camelKey != key) {
            fieldText += '   @JsonProperty("' + key + '")\n';
            shoudImportJackson = true;
        }

        fieldText += "   private " + beanFields[key] + " " + camelKey + ";\n";
        typeSet[beanFields[key]] = 'true';

        var tpl = document.getElementById('getset-templ').innerHTML;

        var tplMap = {
            a: camelKey,
            A: firstToUpperCase(camelKey),
            T: beanFields[key]
        };
        setterText += tpl.replace(/a|A|T/g, function(matched) {
            return tplMap[matched];
        });

    }

    for (t in typeSet) {
        if (importMap[t]) {
            importText += "import " + importMap[t] + ";\n";
        }
    }

    if (shoudImportJackson) {
        importText += "import org.codehaus.jackson.annotate.JsonIgnoreProperties;\nimport org.codehaus.jackson.annotate.JsonProperty;"
    }


    return importText + "\n\n   \npublic class A {\n\n" + fieldText + setterText + "\n}";

}

function getBeanFieldFromJson(text) {


    //1.先将文本转换成json对象
    var jsonObject = null;
    //把首尾空格去掉，因为后面会判断首尾除掉空格外，第一和最后一个字符，是否为[]，如果是，说明是json数组，而非对象
    text = trimStr(text);
    if (text[0] === "[" && text[text.length - 1] === "]") {
        text = '{ "list": ' + text + '}';
        jsonObject = JSON.parse(text).list[0];
    } else {
        jsonObject = JSON.parse(text);
    }

    //2.将json对象转换成bean类
    var bean = {};
    for (key in jsonObject) {
        var val = jsonObject[key];
        bean[key] = jsonToBeanMap[getJsObjectType(val)];
    }
    return bean;
}



function getJsObjectType(val) {

    var typeofStr = typeof(val);
    if (typeofStr === 'number') {
        if (isInt(val)) {
            return "int";
        } else {
            return "double";
        }
    } else if (typeofStr === 'boolean' || typeofStr === 'undefined' || typeofStr === 'null') {
        return typeofStr;
    } else if (isDate(val)) {
        return "date";
    } else if (typeofStr === 'string') {
        return typeofStr;
    } else {
        if (isArray(typeofStr)) {
            return ''
        } else {
            return 'object';
        }
    }
}

var jsonToBeanMap = {
    'string': 'String',
    'int': 'int',
    'double': 'double',
    'boolean': 'Boolean',
    'date': 'Date'
}


var importMap = {
    'Date': 'import java.util.Date'
}

    function trimStr(str) {
        return str.replace(/(^\s*)|(\s*$)/g, "");
    }

    function isArray(o) {
        return Object.prototype.toString.call(o) === '[object Array]';
    }

    function firstToUpperCase(str) {
        return str.substr(0, 1).toUpperCase() + str.substr(1);
    }

    function camelCase(input) {
        return input.toLowerCase().replace(/_(.)/g, function(match, group1) {
            return group1.toUpperCase();
        });
    }

    function isDate(date) {
        return ((new Date(date) !== "Invalid Date" && !isNaN(new Date(date))));
    }

    function isInt(n) {
        return n % 1 === 0;
    }

document.addEventListener("DOMContentLoaded", function(event) {

    //当输入框有变化时，重新显示解析结果

    var area = document.getElementById('input-textarea');
    if (area.addEventListener) {
        area.addEventListener('input', function() {
            main();
            //对大部分浏览器生效
        }, false);
    } else if (area.attachEvent) {
        area.attachEvent('onpropertychange', function() {
            // 对ie浏览器生效
            main();
        });
    }

})