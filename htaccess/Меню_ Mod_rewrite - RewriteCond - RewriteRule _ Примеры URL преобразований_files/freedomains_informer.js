if (typeof encodeURIComponent1251 == 'undefined') {
    // Инициализируем таблицу перевода
    var trans = [];
    for (var i = 0x410; i <= 0x44F; i++)
    trans[i] = i - 0x350; // А-Яа-я
    trans[0x401] = 0xA8;    // Ё
    trans[0x451] = 0xB8;    // ё

    // Назначаем функцию encodeURIComponent1251
    encodeURIComponent1251 = function(str)
    {
    var ret = [];
    // Составляем массив кодов символов, попутно переводим кириллицу
    for (var i = 0; i < str.length; i++)
    {
	var n = str.charCodeAt(i);
	if (typeof trans[n] != 'undefined')
	n = trans[n];
	if (n <= 0xFF)
	ret.push(n);
    }
    return window.escape(String.fromCharCode.apply(null, ret));
    }
}

var data = typeof(data) != 'undefined' ? data : [];

document.writeln('<div class="rereg-outer-block">')
document.writeln('<table class="rereg-inner-table" border="0" cellpadding="3" cellspacing="0">');
document.writeln('<tr class="rereg-header" bgcolor="#FFFFFF">');
document.writeln('<th align="left">Домен</th>');
document.writeln('<th>CY</th>');
document.writeln('<th>PR</th>');
if (show_price) {
    document.writeln('<th>Цена, руб *</th>');
}
document.writeln('<th>&nbsp;</th>');
document.writeln('</tr>');
var j = 1;
for (var i = 0; i < data.length; i++) {
    var row_class = (j % 2 == 1) ? 'odd' : 'even';
    document.writeln('<tr class="rereg-row-' + row_class + '">');
    document.writeln('<td><a href="http://' + server + '/domain/new/checkmany?rid=' + uid + '&domains=' + escape(data[i].domain_name) + '">' + data[i].domain_name + '</a></td>');
    document.writeln('<td align="center">' + data[i].yandex_tic + '</td>');
    document.writeln('<td align="center">' + (parseInt(data[i].google_pr) == -1 ? 'n/a' : data[i].google_pr) + '</td>');
    if (show_price) {
        document.writeln('<td align="center">590.00</td>');
    }
    document.writeln('<td align="right"><a href="http://' + server + '/domain/new/checkmany?rid=' + uid + '&domains=' + data[i].domain_name + '"><img src="https://' + server + '/i/icon/basket.gif" alt="" width="14" height="14" border="0" /></a></td>');
    document.writeln('</tr>');
    j = j + 1;
}
document.writeln('</table>');
if (show_price) {
    document.writeln('<i>* Указана базовая цена без учета скидок</i>');
}
document.writeln('</div>');

