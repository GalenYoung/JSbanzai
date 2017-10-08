var solveFooterLocation = function() {
    function SFL() {
        var clientHeight = document.documentElement.clientHeight;
        var footer = document.getElementById('footer');
        var footerOffsetHeight = footer.offsetHeight;
        var footerOffsetTop = footer.offsetTop;
        if (clientHeight - footerOffsetHeight >= footerOffsetTop) {
            footer.style.position = 'fixed';
            footer.style.bottom = '0';
            footer.style.width = '100%';
            footer.style.backgroundColor = '#fff';
        }
    }
    window.tool.Ready(SFL);
};

solveFooterLocation();