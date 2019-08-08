window.onload = function(){
	var c = document.cookie
	var co = c.split("=");
	var tf = co[1];
	if(tf == "true"){
		document.getElementById("autoplay").setAttribute("checked","");
	}
}