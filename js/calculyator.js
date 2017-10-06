(function(){
    onLoad(init);

    function init(){
        var images_dir = "../kalk/";

        var price_array = [
            ["Классическая", 80, "curt_classic.jpg"],
			["Современная", 60, "curt_sovremen.jpg"],
            ["Римская", 40, "curt_rim.jpg"],
            ["Австрийская", 40, "curt_avstr.jpeg"],
            ["Японская", 80, "curt_japan.jpeg"],
            ["Французская", 80, "curt_france.jpg"],
            ["Тюль", 20, "curt_tule.jpg"],
            ["Портьера", 80, "curt_port.jpg"],
			["Органза", 20, "curt_organza.jpg"],
            ["Рулонная", 780, "curt_rulon.jpg"]
        ];


        function getPrice(){
            var name = "";
            var width = 0;
            var height = 1000;
            name = document.getElementById("c_type").options[document.getElementById("c_type").selectedIndex].text;
            width = document.getElementById("c_width").value;
            height = document.getElementById("c_height").value;
            var i = document.getElementById("c_type").selectedIndex;
            document.getElementById("c_res").innerHTML = (Math.round(price_array[i][1] * width * height * 100 / 1000000)) / 100 + " рублей";

        }

        function ChangePic(){
           var i = document.getElementById("c_type").selectedIndex;
            if(price_array[i].length > 2) {
                document.getElementById("c_div_pic").innerHTML = "<img width=250 src=\""+ images_dir  + price_array[i][2] + "\">";
            }
        }

        document.getElementById('c_type').onchange = ChangePic;
        document.getElementById('btnOk').onclick = getPrice;
    }


    function onLoad(handler){

        var called = false;

        function ready(){
            if(called) return;
            called = true;
            handler();
        }

        if(document.addEventListener) {
            document.addEventListener("DOMContentLoaded", function(){
                ready()
            }, false)
        }
        else if(document.attachEvent) {


            if(document.documentElement.doScroll && window == window.top) {
                function tryScroll(){
                    if(called) return
                    if(!document.body) return
                    try {
                        document.documentElement.doScroll("left")
                        ready()
                    } catch(e) {
                        setTimeout(tryScroll, 0)
                    }
                }

                tryScroll()
            }


            document.attachEvent("onreadystatechange", function(){

                if(document.readyState === "complete") {
                    ready()
                }
            })
        }


        if(window.addEventListener)
            window.addEventListener('load', ready, false)
        else if(window.attachEvent)
            window.attachEvent('onload', ready)
        else
            window.onload = ready

    }

})();