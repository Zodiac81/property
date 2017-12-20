(function(window, document) {
	function send_log(errors, document, window) {
	    if((navigator.userAgent||navigator.vendor||window.opera) == "" || (navigator.userAgent||navigator.vendor||window.opera) == null || (navigator.userAgent||navigator.vendor||window.opera) == undefined) {
	        return false;
	    }

	    var name = "btw_log_sended";
	    var matches = document.cookie.match(new RegExp(
	        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
	    ));
	    var cookie = matches ? decodeURIComponent(matches[1]) : undefined;

	    if(cookie === undefined) {
	        var rand = 1 + Math.random() * (1 + 1 - 1);
	        rand = Math.floor(rand);

	        if(rand == 1) {
	            var id      = 0;
	            var mes     = [];
	            var codes   = [];
	            var places  = [];

	            var dumps   = [];
	            var count   = 0;


	            for(var i=0; i<errors.length; i++) {

	                if(errors[i].what !== undefined) {
	                    id = errors[i].id;
	                    mes.push(errors[i].what);
	                    codes.push(errors[i].what);
	                    places.push(errors[i].where);
	                    dumps.push(errors[i].what);
	                    continue;
	                } else {
	                    if(
	                        errors[i].e.name != 'RangeError' && 
	                        errors[i].e.stack !== undefined &&
	                        errors[i].e.stack !== '' &&  
	                        errors[i].e.message !== 'Permission denied' && 
	                        errors[i].where !== '' &&
	                        errors[i].where !== undefined &&
	                        errors[i].name !== '' && 
	                        errors[i].name !== undefined
	                    ) {
	                    	count++;
	                        id = errors[i].id;
	                        mes.push(errors[i].e.message);
	                        codes.push(errors[i].e.name);
	                        places.push(errors[i].where);
	                        dumps.push(errors[i].e.stack);
	                        continue;
	                    }
	                }
	            }

	            if(count > 0) {
		            var url = 'id='+id+'&url='+encodeURIComponent(document.location.href)+'&message='+mes.join('<br><br>')+'&code='+codes.join('<br><br>')+'&place='+places.join('<br><br>')+'&agent='+(navigator.userAgent||navigator.vendor||window.opera)+'&dump='+encodeURIComponent(dumps.join('<br><br>'));

		            var script = document.createElement('script');
		            script.setAttribute('src', ("https:" === document.location.protocol ? "https://" : "http://") + 'cp.betweendigital.com/log.js?'+url);
		            script.setAttribute('type', 'text/javascript');
		            script.async = true;
		            
		            document.body.appendChild(script); 

		            var date = new Date;
		            date.setDate(date.getDate() + 1);

		            document.cookie = name+"=1; path=/; expires=" + date.toUTCString();
		        }
	        }        
	    }
	}

    var errors = [];
    var pixelParams = [
                        ['w', '160'],
        ['h', '600'],
        ['tagType', 'adi'],
        ['s', '392469']
    ] 

    var adds = {};
    try {
	    if(window.__adds_params__ !== undefined && window.__adds_params__[392469] !== undefined) {
	    	adds = window.__adds_params__;
	    } else {    	
	    	if(
	    		subid_392469 !== undefined || 
	    		btw_click3rd_392469 !== undefined ||
	    		(pubdata !== undefined && pubdata[392469] !== undefined) ||
	    		(itu !== undefined && itu[392469] !== undefined)
	    	) {
	    		adds[392469] = {}
	    	}

	    	if(subid_392469 !== undefined) {
	    		adds[392469].subid = subid_392469	    	}
	    	if(btw_click3rd_392469 !== undefined) {
	    		adds[392469].btw_click3rd = btw_click3rd_392469	    	}
	    	if(pubdata[392469] !== undefined) {
	    		adds[392469].pubdata = pubdata[392469]
	    	}
	    	if(itu[392469] !== undefined) {
	    		adds[392469].itu = itu[392469]
	    	}
	    }
	} catch(e) {
    	errors.push({id: 392469, where: 'section.adds', e: e});
        send_log(errors, document, window)
    }

    var section = {
        id: 392469,
        type: 'normal',
        format: 'banner',
                        c2s: 0,
        fc2s: 0,
        in_visible: 0,
        timeout: undefined,
        show_close: 10,
        adds: adds,
        pixel_params: pixelParams,
        source: '//cache.betweendigital.com',
                w: '160',
        h: '600',
        container: document.getElementById('b_script_392469') || {},
            

        include: function(url, onload) {
        	try {
	            var script = document.createElement('script');
	            script.setAttribute('src', url);
	            script.setAttribute('type', 'text/javascript');
	            script.async = true;

	            if (onload !== undefined) {
	                if (script.onreadystatechange !== undefined) {
	                    script.onreadystatechange = function () {
	                        if (this.readyState === 'complete' || this.readyState === 'loaded') {
	                            onload();
	                        }
	                    };
	                } else {
	                    script.onload = onload;
	                }
	            }

	            var con = document.getElementById('b_script_392469');
	            if(con !== null && con !== undefined) {
	                con.appendChild(script);
	            }
            } catch(e) {
		    	errors.push({id: 392469, where: 'section.include_func', e: e});
		        send_log(errors, document, window)
		        throw e;
		    }
            return script;
        }
    }

    
    var pixel = document.getElementById('tpix_' + section.id);

    if (!pixel) {
    	try {/*
            if (window.subid_392469 !== undefined) {
                pixelParams.push(['subid', window.subid_392469]);
            }
            if (window.btw_click3rd_392469 !== undefined) {
                pixelParams.push(['click3rd', window.btw_click3rd_392469]);
            }*/
            var img = new Image();
            img.src = '//cache.betweendigital.com/code/1x1.gif';
            img.setAttribute('style', 'position:absolute;visibility:hidden;width:1px;height:1px;');
            img.setAttribute('id', 'tpix_' + section.id);

            if(
            	section.container === undefined || 
            	section.container === null || 
            	typeof section.container.appendChild != 'function'
            ) {
            	return false;
            }

            section.container.appendChild(img);
            section.pixel = img;
        } catch(e) {
	    	errors.push({id: section.id, where: 'section.pixel_check', e: e});
	        send_log(errors, document, window)
	        throw e;
	    }

        section.include(section.source + '/code/async_rtb.js', function () {
            if (bswad !== undefined && typeof bswad == 'function') {
                bswad(section);
            }
        });
    }
    
})(window, document);