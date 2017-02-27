var solveFooterLocation = function(){
    function ready(fn) {
        if (document.readyState != 'loading'){
            fn();
        } else {
            document.addEventListener('DOMContentLoaded', fn);
        }
    };

    function SFL(){
        var clientHeight = document.documentElement.clientHeight;
        var footer = document.getElementById("footer");
        var footer_offset_height = footer.offsetHeight;
        var footer_offset_top = footer.offsetTop;
        if( clientHeight - footer_offset_height >= footer_offset_top ){
            footer.style.position = "fixed";
            footer.style.bottom = "0";
            footer.style.width = "100%" ;
            footer.style.backgroundColor = "#fff";
        };    
    };
    ready(SFL);
};

solveFooterLocation();