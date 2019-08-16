window.onload = function () {
    var cookies = document.cookie
    var cookiesarray = cookies.split(";");
    for (cook in cookiesarray) {
        var cookie = cookiesarray[cook]
        var cookiearray = cookie.split("=")
        for (c in cookiearray) {
            var cookiename = cookiearray[0]
            if (cookiename == "ap") {
                var cookievalue = cookiearray[1]
                if (cookievalue == "true") {
                    document.getElementById("autoplay").setAttribute("checked", "");
                };
            };
        };
    };

};
