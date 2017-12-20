document.writeln('\
<div class="reg.premium">\
    <table class="rereg-inner-table" border="0" cellpadding="0" cellspacing="0">\
        <thead>\
            <tr bgcolor="#FFFFFF">\
                <th style="padding-right: 0.5em">Премиум-домен</th>\
                <th>Цена, р.</th>\
                <th><img src="https://' + server + '/i/icon/basket.gif" alt="" width="14" height="14" border="0" /></th>\
            </tr>\
        </thead>\
        <tbody>'
);

for (var i = 0; i < domains.length; i++) {
    document.writeln('\
            <tr class="rereg-row-' + ( i % 2 == 1 ? 'even' : 'odd' ) + '">\
                <td>' + domains[i].name + '</td>\
                <td>' + domains[i].price + '</td>\
                <td><a href="https://' + server +  '/domain/new/checkmany?rid=' + rid + '&dname=' + encodeURIComponent( domains[i].name ) + '" target="_blank" title="Зарегистрировать этот домен прямо сейчас">Купить</a></td>\
            </tr>'
    );
}

document.writeln('\
        </tbody>\
    </table>\
</div>');

