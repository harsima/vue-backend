// 计算根节点1rem的值
(function(doc, win) {
    var docEl = doc.documentElement,
        // recalF,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function() {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            // 按照效果图尺寸及方便计算的规则，确认1rem基本字号大小。此处为1rem=20px
            docEl.style.fontSize = parseInt(20 * (clientWidth / 1024)) + 'px';
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);