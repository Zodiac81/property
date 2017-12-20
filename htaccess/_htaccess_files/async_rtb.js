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

function bswad(section) {
	if(section.id === undefined) {
        send_log([{id: null, where: 'async', e: {stack: 'section.id undefined', name: 'our error', message: 'section.id undefined'}}], document, window)

		return false;
	}
	if(section.type === undefined) {
        send_log([{id: section.id, where: 'async', e: {stack: 'section.type undefined', name: 'our error', message: 'section.type undefined'}}], document, window)

		return false;
	}
	if(section.format === undefined) {
        send_log([{id: section.id, where: 'async', e: {stack: 'section.format undefined', name: 'our error', message: 'section.format undefined'}}], document, window)

		return false;
	}
	if(section.container === null) {
        send_log([{id: section.id, where: 'async', e: {stack: 'container null', name: 'our error', message: 'container null'}}], document, window)

		return false;
	}
    
    section.shown = false;
    section.container.style.position = 'relative';
    section.container_id = section.container.getAttribute('id');
    section.banner_data = {ads_url: ("https:" === document.location.protocol ? "https://" : "http://") + "ads.betweendigital.com"}

    return (function (window, document) {
        var errors = []
        var validate = {
            check_mobile: function() {
                var check = false;
                (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
                return !!check;
            },
            check_hidden: function() {

            },
            check_visible: function() {

            },
            init: function(obj) {
                this.check_hidden()
                this.check_visible()
                obj.is_mobile = this.check_mobile()
            }
        }

        var positioner = {
            is_in_frame: function(obj) {
                core.check_obj(obj,'positioner.is_in_frame')

                try {
                    obj.in_frame = window.self !== window.top;
                } catch(e) {
                    errors.push({id: obj.id, where: 'positioner.is_in_frame', e: e})
                    return null
                }
                return obj.in_frame;
            },
            get_styles: function(obj) {
                core.check_obj(obj,'positioner.get_styles')

                try {
                    if(obj.format == 'full_video') {
                        var styles = 'display: none; width: 100%;position:relative; margin: auto';
                    } else {
                        var styles = "width:" + obj.w + 'px;height:' + obj.h + 'px;display:none;';
                        styles += "position:fixed;bottom:0;right:0;z-index:9999998;text-align:center;background:rgba(0,0,0,.3);";

                        if (obj.pos_x == 'right') {
                            styles += 'right:0px;';
                        } else if (obj.pos_x == 'left') {
                            styles += 'left:0px;';
                        } else {
                            styles += 'left:50%;margin-left:-' + Math.round(obj.w / 2) + 'px;';
                        }

                        if (obj.pos_y == 'bottom') {
                            styles += 'bottom:0px;';
                        } else if (obj.pos_y == 'top') {
                            styles += 'top:0px;';
                        } else {
                            styles += 'top:50%;margin-top:-' + Math.round(obj.h / 2) + 'px;';
                        }
                    }
                } catch(e) {
                    errors.push({id: obj.id, where: 'positioner.get_styles', e: e});
                    send_log(errors, document, window)
                    throw e;
                }

                return styles;
            },
            set_style: function(el, styles) {
                try {
                    if (!!el.style.setAttribute) {
                        el.style.setAttribute("cssText", styles);
                    } else {
                        el.setAttribute("style", styles);
                    }
                } catch(e) {
                    errors.push({id: section.id, where: 'positioner.set_style', e: e})
                    send_log(errors, document, window)
                    throw e;
                }
            },
            header_pos: function(obj) {
                core.check_obj(obj,'positioner.header_pos')

                try {
                    document.body.insertBefore(obj.container, document.body.firstChild);
                    obj.container.style.textAlign = 'center';
                } catch(e) {
                    errors.push({id: obj.id, where: 'positioner.header_pos', e: e});
                    send_log(errors, document, window)
                    throw e;
                }
            },
            floating_pos: function(obj) {
                core.check_obj(obj,'positioner.floating_pos')

                try {
                    var container = document.body;

                    var banner = document.createElement("div");
                    banner.id = "fl_btw_ad_" + obj.pos_x + obj.pos_y;

                    this.set_style(banner, this.get_styles(obj));

                    if(obj.format == 'full_video') {
                        var flex = document.createElement("div");
                        flex.id = "flex_btw_con";
                        flex.setAttribute('style', 'position:fixed;display:flex; width:100%;height:100%;z-index:99997;top:0;left:0;')
                        flex.appendChild(banner);
                        container.appendChild(flex)
                    } else {
                        container.appendChild(banner);  
                    }
                    //container.appendChild(banner);
                    obj.container = banner;
                } catch(e) {
                    errors.push({id: obj.id, where: 'positioner.floating_pos', e: e})
                    send_log(errors, document, window)
                    throw e;
                }
            },
            check_pos: function(obj) {
                core.check_obj(obj,'positioner.check_pos')

                switch(obj.format) {
                    case 'header': {
                        this.header_pos(obj);
                        break;
                    }
                    case 'full': 
                    case 'floating': 
                    case 'full_video': {
                        this.floating_pos(obj)
                        break;
                    }
                }
            },
            get_window_size: function() {
                try {
                    var winWidth = 0, winHeight = 0;
                    if (typeof window.innerWidth === "number") {
                        //Non-IE
                        winWidth = window.innerWidth;
                        winHeight = window.innerHeight;
                    } else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
                        //IE 6+ in "standards compliant mode"
                        winWidth = document.documentElement.clientWidth;
                        winHeight = document.documentElement.clientHeight;
                    } else if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
                        //IE 4 compatible
                        winWidth = document.body.clientWidth;
                        winHeight = document.body.clientHeight;
                    }
                } catch(e) {
                    errors.push({id: section.id, where: 'positioner.get_window_size', e: e})
                    return null
                }

                return {
                    width: winWidth,
                    height: winHeight
                };
            },
            get_top_scroll: function() {
                return window.pageYOffset || (document.documentElement && document.documentElement.scrollTop) || (document.body && document.body.scrollTop);
            },
            get_left_scroll: function() {
                return window.pageXOffset || (document.documentElement && document.documentElement.scrollLeft) || (document.body && document.body.scrollLeft);
            },
            check_scroll: function(obj) {
                core.check_obj(obj,'positioner.check_scroll')

                try {
                    var windowSize = this.get_window_size();
                    
                    if(windowSize === null){return undefined;}

                    var posY = windowSize.height + this.get_top_scroll();
                    var posX = windowSize.width + this.get_left_scroll();

                    obj.in_visible_area = (posY >= obj.position.y && posX >= obj.position.x);
                    return true;
                } catch(e) {
                    errors.push({id: obj.id, where: 'positioner.check_scroll', e: e});
                    return undefined;
                }
            },
            init: function(obj) {
                core.check_obj(obj,'positioner.init')

                var in_frame = this.is_in_frame(obj);

                if((in_frame === true || in_frame === null) && (obj.format == 'floating' || obj.format == 'full' || obj.format == 'full_video')) {
                    throw new Error('Slider in iframe or we cant check iframe it or not');
                } else {
                    this.check_pos(obj);
                    return true;
                }
            }
        }
        
        var generate_url = {
            build: function(obj) {
                core.check_obj(obj,'generate_url.build')

                try {
                    var array = [];
                    for(var i in obj.banner_data.params) {
                        if(obj.banner_data.params.hasOwnProperty(i)) {
                            if(i !== 'pubdata' && i !== 'itu') {
                                array.push(i+'='+obj.banner_data.params[i]);
                            }
                        }
                    }
                    obj.banner_data.uri = array.join('&')+'&tagType=adi&w='+obj.w+'&h='+obj.h+'&s='+obj.id+obj.banner_data.params.pubdata+obj.banner_data.params.itu
                    obj.banner_url = obj.banner_data.ads_url+'/adi?'+obj.banner_data.uri;
                } catch(e) {
                    errors.push({id: obj.id, where: 'generate_url.build', e: e})
                    send_log(errors, document, window)
                    throw e;
                }
            },
            get_itu: function(obj) {
                core.check_obj(obj,'generate_url.get_itu')

                try {
                    if(obj.adds !== undefined && obj.adds[obj.id] !== undefined && obj.adds[obj.id].itu !== undefined) {
                        obj.banner_data.params.itu = '&itu=' + encodeURIComponent(obj.adds[obj.id].itu)
                    } else {
                        obj.banner_data.params.itu = ""
                    }
                } catch(e) {
                    errors.push({id: obj.id, where: 'generate_url.get_itu', e: e})
                    obj.banner_data.params.itu = ""
                }
            },
            get_pubdata: function(obj) {
                core.check_obj(obj,'generate_url.get_pubdata')

                try {
                    var url = "";
                    if(obj.adds !== undefined) {
                        if(obj.adds[obj.id] !== undefined && obj.adds[obj.id].pubdata !== undefined) {
                            for(var key in obj.adds[obj.id].pubdata) {
                                url = url + '&' + encodeURIComponent('pubside_macro[' + key + ']') + '=' + encodeURIComponent(obj.adds[obj.id].pubdata[key]);
                            }
                        }
                    }
                    if(url != "") {
                        obj.banner_data.params.pubdata = url 
                    } else {
                        obj.banner_data.params.pubdata = ""
                    }
                } catch(e) {
                    errors.push({id: obj.id, where: 'generate_url.get_pubdata', e: e})
                    obj.banner_data.params.pubdata = ""
                }
            },
            get_subid: function(obj) {
                core.check_obj(obj,'generate_url.get_subid')

                try {
                    if(obj.adds !== undefined && obj.adds[obj.id] !== undefined && obj.adds[obj.id].subid !== undefined) {
                        obj.banner_data.params.subid = obj.adds[obj.id].subid;    
                    }                
                } catch(e) {
                    errors.push({id: obj.id, where: 'generate_url.get_subid', e: e})
                }
            },
            get_click3rd: function(obj) {
                core.check_obj(obj,'generate_url.get_click3rd')

                try {
                    if(obj.adds !== undefined && obj.adds[obj.id] !== undefined && obj.adds[obj.id].click3rd !== undefined) {
                        obj.banner_data.params.click3rd = obj.adds[obj.id].click3rd;  
                    }
                } catch(e) {
                    errors.push({id: obj.id, where: 'generate_url.get_click3rd', e: e})
                }
            },
            get_eeni: function(obj) {
                core.check_obj(obj,'generate_url.get_eeni')

                try {
                    if (window.location.origin == obj.banner_data.params.ads_url) {
                        obj.banner_data.params.enforce_eeni = 1;
                    }
                } catch(e) {
                    errors.push({id: obj.id, where: 'generate_url.get_eeni', e: e})
                    obj.banner_data.params.enforce_eeni = 0;
                }
            },
            get_rr: function(obj) {
                core.check_obj(obj,'generate_url.get_rr')

                try {
                    try {
                        var td = top.document;
                        var rr = td.referrer;
                    } catch (err) {}

                    if(typeof rr != 'undefined' && rr.length > 0) {
                        obj.banner_data.params.rr = encodeURIComponent(rr);
                    } else if(typeof rr != 'undefined' && rr == "") {
                        obj.banner_data.params.rr = "direct";
                    }
                } catch(e) {
                    errors.push({id: obj.id, where: 'generate_url.get_rr', e: e})
                    if(obj.banner_data.params.rr !== undefined) {
                        delete obj.banner_data.params.rr
                    }
                }
            },
            get_ord: function(obj) {
                core.check_obj(obj,'generate_url.get_ord')

                obj.banner_data.params.ord = Math.random() * 10000000000000000
            },
            get_frl: function(obj) {
                core.check_obj(obj,'generate_url.get_frl')

                try {
                    var level = 0;
                    var currentFrame = window;

                    while (window.top != currentFrame.window) {
                        level++;
                        try {
                            currentFrame = currentFrame.parent;
                        } catch(e) {
                            currentFrame = null;
                        }

                        if (level >= 20) {
                            break;
                        }
                        if(currentFrame === null) {
                            level = undefined;
                            break;
                        }
                    }
                    obj.banner_data.params.frl = level;
                } catch(e) {
                    errors.push({id: obj.id, where: 'generate_url.get_frl', e: e})
                    if(obj.banner_data.params.frl !== undefined) {
                        delete obj.banner_data.params.frl
                    }
                }
            },
            get_fl: function(obj) {
                core.check_obj(obj,'generate_url.get_fl')

                try {
                    if (navigator.plugins !== undefined && navigator.plugins !== null) {
                        if(navigator.plugins["Shockwave Flash"] !== undefined && navigator.plugins["Shockwave Flash"] !== null && typeof navigator.plugins["Shockwave Flash"] === "object") {
                            var description = navigator.plugins["Shockwave Flash"].description;
                            if (description && !(navigator.mimeTypes !== undefined && navigator.mimeTypes["application/x-shockwave-flash"] && !navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin)) {
                                description = description.replace(/^.*\s+(\S+\s+\S+$)/, "$1").replace(/^(.*)\..*$/, "$1");

                                obj.banner_data.params.fl = parseInt(description, 10);
                                return false;
                            }
                        }
                    }

                    if (window.ActiveXObject !== undefined) {
                        try {
                            var flash = new window.ActiveXObject("ShockwaveFlash.ShockwaveFlash");
                            if (flash) {
                                var version = flash.GetVariable("$version");
                                if (!!version) {
                                    version = version.split(" ")[1].split(",");

                                    obj.banner_data.params.fl = parseInt(version[0], 10);
                                    return false;
                                }
                            }
                        } catch (e) {}
                    }
                    obj.banner_data.params.fl = 0;
                    return false;
                } catch(e) {
                    errors.push({id: obj.id, where: 'generate_url.get_fl', e: e})
                    if(obj.banner_data.params.fl !== undefined) {
                        delete obj.banner_data.params.fl
                    }
                }
            },
            get_tz: function(obj) {
                core.check_obj(obj,'generate_url.get_tz')

                obj.banner_data.params.tz = new Date().getTimezoneOffset();
            },
            get_ref: function(obj) {
                core.check_obj(obj,'generate_url.get_ref')

                try {
                    obj.banner_data.params.ref = (obj.in_frame) ? encodeURIComponent(document.referrer) : ""
                } catch(e) {
                    errors.push({id: obj.id, id: obj.id, where: 'generate_url.get_ref', e: e})
                    if(obj.banner_data.params.ref !== undefined) {
                        delete obj.banner_data.params.ref
                    }
                }
            },
            get_pos: function(obj) {
                core.check_obj(obj,'generate_url.get_pos')

                try {
                    var x = 0
                    var y = 0;
                    var o = obj.pixel

                    while (o) {
                        x += o.offsetLeft;
                        y += o.offsetTop;
                        o = o.offsetParent;
                    }

                    obj.position = {x: x, y: y}

                    if(!!obj.in_visible || obj.format == 'floating' || obj.format == 'full' || obj.format == 'full_video' || obj.format == 'header') {
                        obj.banner_data.params.pos = 'atf';
                        return false
                    }
                    if(obj.in_frame === true) {
                        return false
                    }

                    var windowSize = positioner.get_window_size();

                    if(windowSize !== null) {
                        if (windowSize.height > 0 && windowSize.width > 0) { // If winHeight === 0, there is something wrong, so report as N/A
                            if(x < windowSize.width && y < windowSize.height) {
                                obj.banner_data.params.pos = "atf";
                            } else {
                                obj.banner_data.params.pos = "btf";
                            }
                        }
                    }
                } catch(e) {
                    errors.push({id: obj.id, where: 'generate_url.get_pos', e: e})
                    if(obj.banner_data.params.pos !== undefined) {
                        delete obj.banner_data.params.pos
                    }
                }
            },
            get_c2s: function(obj) {
                core.check_obj(obj,'generate_url.get_c2s')

                try {
                    if(obj.c2s == 1) {
                        obj.banner_data.params.c2s = 1;
                    }
                } catch(e) {
                    errors.push({id: obj.id, where: 'generate_url.get_c2s', e: e})
                }
            },
            init: function(obj) {
                core.check_obj(obj,'generate_url.init')

                obj.banner_data.params = {}
                this.get_subid(obj);
                this.get_click3rd(obj);
                this.get_pos(obj);
                this.get_ref(obj);
                this.get_tz(obj);
                this.get_fl(obj);
                this.get_frl(obj);
                this.get_ord(obj);
                this.get_pubdata(obj);
                this.get_eeni(obj);
                this.get_itu(obj);
                this.get_rr(obj);
                this.get_c2s(obj);

                this.build(obj);
            }
        }

        var creator = {
            iframe: function(obj) {
                core.check_obj(obj,'creator.iframe')

                try {
                    var iframe = document.createElement("iframe");
                    iframe.style.display = 'none';
                    iframe.frameBorder = 0;
                    iframe.style.width = obj.w + "px";
                    iframe.style.height = obj.h + "px";
                    iframe.width = obj.w + "px";
                    iframe.height = obj.h + "px";
                    iframe.id = "btw_ad_" + obj.id;
                    iframe.scrolling = "no";
                    iframe.src = obj.banner_url;

                    obj.ads_block = iframe;
                } catch(e) {
                    errors.push({id: obj.id, where: 'creator.iframe', e: e})
                    send_log(errors, document, window)
                    throw e;
                }
            },
            video: function(obj) {
                core.check_obj(obj,'creator.video')

                try {
                    var video = document.createElement('video');
                    if(obj.format == 'full_video') {
                        video.width = '100%';
                        video.style.width = '100%';
                        video.style.display = 'block';
                    } else {
                        video.width = obj.w;
                        video.style.width = obj.w+'px';
                        video.height = obj.h;
                        video.style.height = obj.h+'px';
                    }
                    
                    video.id = 'btw_video_' + obj.id;
                    video.setAttribute('hidden', '');
                    
                    obj.ads_block = video;
                } catch(e) {
                    errors.push({id: obj.id, where: 'creator.video', e: e})
                    send_log(errors, document, window)
                    throw e;
                }
            },
            close_button: function(obj) {
                core.check_obj(obj,'creator.close_button')

                try {
                    var container = document.createElement("div");
                    var closeButton = document.createElement("img");
                    closeButton.src = "//cache.betweendigital.com/code/close.png";


                    if(obj.format == 'full_video') {
                        positioner.set_style(closeButton, "width:100%;height:100%;display: inline-block;margin-top:17px;");
                        positioner.set_style(container, "width:15%;position:absolute;top:1px;text-align:center;right:1px;z-index:9999999;-moz-border-radius:70px;-webkit-border-radius:70px;border-radius:70px;overflow:hidden;cursor:pointer;")
                    } else {
                        positioner.set_style(closeButton, "width:35px;height:35px;display: inline-block;margin-top:17px;");
                        positioner.set_style(container, "width:70px;height:70px;position:absolute;top:1px;text-align:center;right:1px;z-index:9999999;-moz-border-radius:70px;-webkit-border-radius:70px;border-radius:70px;overflow:hidden;cursor:pointer;")
                    }
                    
                                        
                    core.add_event(closeButton, "click", function(e) {
                        shower.clear(obj.container);
                    });

                    container.appendChild(closeButton);
                    if(obj.format == 'full_video') {
                        document.getElementById('flex_btw_con').appendChild(container);
                    } else {
                        obj.container.appendChild(container);
                    }
                } catch(e) {
                    errors.push({id: obj.id, where: 'creator.close_button', e: e})
                    send_log(errors, document, window)
                    throw e;
                }
            },
            bg: function() {
                if(document.getElementById('btw_shadow_bg') === null) {
                    var bg = document.createElement('div');
                    bg.style.display = 'block';
                    bg.style.position = "fixed";
                    bg.style.width = "100%";
                    bg.style.height = "100%";
                    bg.style.opacity = "0.8";
                    bg.style.top = "0";
                    bg.style.left = "0";
                    bg.style.background = "#000";
                    bg.id = "btw_shadow_bg";

                    document.body.appendChild(bg)
                }
            },
            load: function(obj) {
                core.check_obj(obj,'creator.load')

                try {
                    if(obj.format == 'out-stream' || obj.format == 'full_video') {
                        this.video(obj)
                    }

                    if((obj.format == 'floating' && obj.type == 'mobile') || obj.format == 'full') {
                        if(typeof obj.timeout != 'undefined') {
                            var now = Math.floor(Date.now()/1000);
                            var lastdate = core.get_cookie('timedelay');
                            var show = 0;
                            if(lastdate === undefined) {
                                document.cookie = "timedelay="+Math.floor(Date.now()/1000)+"; path=/;"
                                show = 1;
                            }
                            //var d = new Date();
                            if(show === 0) {
                                if((now - lastdate) > obj.timeout*60000) {
                                    document.cookie = "timedelay="+Math.floor(Date.now()/1000)+"; path=/;"  
                                    show = 1;
                                } 
                            }

                            if(show === 1) {
                                obj.container.appendChild(obj.ads_block); 
                            }
                        } else {
                            obj.container.appendChild(obj.ads_block); 
                        }
                    } else {
                        obj.container.appendChild(obj.ads_block); 
                    }
                    
                    if(obj.format == 'out-stream' || obj.format == 'full_video') {
                        shower.load_video(obj)
                    }
                } catch(e) {
                    errors.push({id: obj.id, where: 'creator.load', e: e})
                    send_log(errors, document, window)
                    throw e;
                }
            }
        }

        var core = {
            add_event: function(el, event, callback) {
                if (el.addEventListener) {
                    el.addEventListener(event, callback, false);
                } else {
                    el.attachEvent("on" + event, callback);
                }
            },
            get_cookie: function(name) {
                var matches = document.cookie.match(new RegExp(
                    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
                ));
                return matches ? decodeURIComponent(matches[1]) : undefined;
            },
            check_obj: function(obj, where) {
                if(obj === undefined || obj === null) {
                    errors.push({id: null, where: where, what: 'we dont have section object|section='+((obj===null)?'null':(typeof obj))})
                    throw new TypeError('in function `'+where+'` undefined `section` object');
                }
            }
        }

        var shower = {
            show_banner: function(obj) {
                core.check_obj(obj,'shower.show_banner')

                obj.ads_block.style.display = 'inline-block'
            },
            show_container: function(obj) {
                core.check_obj(obj,'shower.show_container')

                obj.container.style.display = 'block'
            },
            show_video: function(data) {
                try{
                    var errors = section.vastPlayer.errors()
                    if(errors.length === 0) {  
                        
                        shower.show_container(section)

                        if(section.format == 'full_video') { 
                            document.cookie = "btw_video_timedelay="+Math.floor(Date.now()/1000); 
							creator.bg();
                            if(section.show_close !== undefined) {
                                setTimeout(function() {
                                    creator.close_button(section); 
                                }, 1000*parseInt(section.show_close));
                            } else {
                                creator.close_button(section)
                            }    
                        }              
                    }
                } catch(e) {
                    errors.push({id: section.id, where: 'shower.show_video', e: e})
                    send_log(errors, document, window)
                    throw e;
                }
            },
            load_video: function(obj) {
                core.check_obj(obj,'shower.load_video')

                try{
                    if (!obj.shown) {
                        if(obj.format == 'full_video') {
                            var now = Math.floor(Date.now()/1000);
                            var lastdate = core.get_cookie('btw_video_timedelay');
                            var show = 0;
                            if(lastdate === undefined) {
                                var rand = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
                                if(rand <= 30) {
                                    show = 1;
                                }
                            }

                            if(show === 0) {
                                if((now - lastdate) > 600) {
                                    show = 1;
                                } else {
                                    return false;
                                }
                            }
                        } else {
                            var show = 1
                        }
                        if(show == 1) {
                            obj.shown = true;
                            obj.include(obj.source+'/code/Promise.js', function () {
                                obj.include(obj.source+'/code/video.js', function () {
                                    if (typeof VastPlayer === 'function') {
                                        obj.vastPlayer = new VastPlayer();
                                        obj.vastPlayer.init({
                                            video_player_id: 'btw_video_'+obj.id, 
                                            xml_url: ("https:" === document.location.protocol ? "https:" : "http:") + obj.video_url, 
                                            callback: function(data) {
                                                shower.show_video(data)
                                            }
                                        });
                                    }
                                });
                            });
                        }
                    } 
                } catch(e) {
                    errors.push({id: obj.id, where: 'shower.load_video', e: e})
                    send_log(errors, document, window)
                    throw e;
                } 
            },
            clear: function(el) {
                try{
                    var bg = document.getElementById("btw_shadow_bg");
                    if(bg !== null) {
                        document.body.removeChild(bg)
                    }
                    if(section.format == 'full_video') {
                        document.body.removeChild(document.getElementById("flex_btw_con"))
                    }
                    
                    el.style.display = 'none'
                    el.innerHTML = ""
                } catch(e) {
                    errors.push({id: section.id, where: 'shower.clear', e: e})
                    send_log(errors, document, window)
                    throw e;
                } 
            }
        }

        var response = {
            validate: function(e, obj) {
                core.check_obj(obj,'response.validate')

                try{
                    if(e.origin !== obj.banner_data.ads_url)
                        return false;

                    if(e.data.provider && e.data.provider == "between" && e.data.section == obj.id) {
                        if(typeof e.data.async_creative_html == 'string' && obj.c2s == 1) {
                            this.c2s(e, obj)
                        } else if(e.data.is_show !== false) {
                            this.basic(obj)
                        }
                    }
                } catch(e) {
                    errors.push({id: obj.id, where: 'response.validate', e: e})
                    send_log(errors, document, window)
                    throw e;
                } 
            },
            c2s: function(e, obj) {
                core.check_obj(obj,'response.c2s')

                try{
                    var wrapper = document.createElement('div');
                    wrapper.innerHTML = decodeURIComponent(e.data.async_creative_html.replace(/\+/g, ' '));
                    
                    obj.container.removeChild(obj.ads_block);
                    var all = wrapper.querySelectorAll('*');
                    for(var i=0; i<all.length; i++) {
                        if(all[i].nodeName == 'SCRIPT') {
                            if(all[i].src != '') {
                                var script = document.createElement('script');
                                script.setAttribute('src', all[i].src);
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

                                obj.container.appendChild(script);

                            } else {
                                obj.container.appendChild(all[i]);
                                var last_child = obj.container.childNodes[obj.container.childNodes.length-1];
                                try {
                                    eval(last_child.innerHTML);
                                } catch (e) {
                                    console.log(e);
                                }
                            }
                        } else {
                            obj.container.appendChild(all[i]);
                        }
                    }
                    shower.show_container(obj)
                } catch(e) {
                    errors.push({id: obj.id, where: 'response.c2s', e: e})
                    send_log(errors, document, window)
                    throw e;
                } 
            },
            basic: function(obj) {
                core.check_obj(obj,'response.basic')

                try{
                    shower.show_banner(obj)
                    if(obj.format == "floating" || obj.format == 'full' || obj.format == 'full_video') {
                        shower.show_container(obj)
                        creator.close_button(obj)
                    }
                } catch(e) {
                    errors.push({id: obj.id, where: 'response.basic', e: e})
                    send_log(errors, document, window)
                    throw e;
                } 
            }
        }

        validate.init(section)
        if(!section.is_mobile && (section.type == 'mobile' || section.format == 'full_video')) {
            return false;
        }
        if(positioner.init(section) !== true) return false;
        
        generate_url.init(section)

        var scroll = positioner.check_scroll(section);
        if(scroll === undefined) {
            section.in_visible = 0;
        }
        
        if(section.format != 'out-stream' && section.format != 'full_video') {
            creator.iframe(section)

            core.add_event(window, 'message', function(e) {
                response.validate(e, section)
            });
        }
        
        if(section.format == 'floating' || section.format == 'full' || section.format == 'full_video' || section.in_visible == 0 || section.in_visible_area == true) {
            creator.load(section)

            section.shown = true;
        } else {
            core.add_event(window, "scroll", function () {
                positioner.check_scroll(section)
                if(section.in_visible_area == true && section.shown == false) {
                    creator.load(section); 
                    section.shown = true;
                }
            });
        }

        if(errors.length > 0) {
            send_log(errors, document, window)
        }
    })(window, document);
}