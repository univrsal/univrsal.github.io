var $_GET = {};

function get_vars()
{

    if(document.location.toString().indexOf('?') !== -1) {
        var query = document.location
                       .toString()
                       // get the query string
                       .replace(/^.*?\?/, '')
                       // and remove any existing hash string (thanks, @vrijdenker)
                       .replace(/#.*$/, '')
                       .split('&');
    
        for(var i=0, l=query.length; i<l; i++) {
           var aux = decodeURIComponent(query[i]).split('=');
           $_GET[aux[0]] = aux[1];
        }
    }
    //get the 'index' query parameter
    //alert($_GET['index']);
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function postWithoutAjax( url, params ){
    
    params = params || {};

    // function to remove the iframe
    var removeIframe = function( iframe ){
        iframe.parentElement.removeChild(iframe);
    };
    
    // make a iframe...
    var iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    
    iframe.onload = function(){
        document = this.contentWindow.document;
        
        // Make a invisible form
        var form = document.createElement('form');
        form.method = 'get';
        form.action = url;
        document.body.appendChild(form);
        
        // pass the parameters
        for( var name in params ){
            var input = document.createElement('input');
            input.type = 'hidden';
            input.name = name;
            input.value = params[name];
            form.appendChild(input);
        }
        
        form.submit();
        // remove the iframe
        removeIframe(iframe);
    };
    
    document.body.appendChild(iframe);
}
get_vars();