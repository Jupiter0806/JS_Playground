var script = document.createElement("script")
script.type = "text/javascript"

// Firefox, Opera, Chrome, Safari 3+
script.onload = function (){
    alert("Script loaded!");
};

// Internet Explorer (not test yet)
script.onreadystatechange = function () {
    if (script.readyState == "loaded" || script.readyState == "complete") {
        script.onreadystatechange = null
        alert("Script loaded.")
    }
}

script.src = "file1.js"
document.getElementsByTagName("head")[0].appendChild(script)