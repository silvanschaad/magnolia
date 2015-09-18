var tmitUtils = {

    // set target on links
    openExternalLinksInNewWindow: function() {
        $("a[href*='http://'],a[href*='https://']:not([href*='" + window.location.hostname + "'])").addClass("external-link").attr("target", "_blank");
    },

    // check if canvas is supported
    isCanvasSupported: function() {
        var elem = document.createElement('canvas');
        return !!(elem.getContext && elem.getContext('2d'));
    },

    // append js script to head
    appendScriptToHead: function(src) {
        var s = document.createElement("script");
        s.type = "text/javascript";
        s.src = src;
        $("head").append(s);
    },

    // get hash param
    urlGetHashParam: function() {
        var results = new RegExp('[\#]([^&#]*)').exec(window.location.hash);
        if (results == null) {
            return null;
        } else {
            return results[1] || 0;
        }
    },


    // get a certain part of a url
    urlGetSection: function(url, index) {
        var explodedUrl = url.split("/");
        var section = "";

        if (index == "last") {
            section = explodedUrl[explodedUrl.length - 1];
            if (section == "") {
                section = explodedUrl[explodedUrl.length - 2];
            }
            section = section.replace(".html", "");
        } else {
            section = explodedUrl[index];
        }
        return section;
    },

    // shuffle array
    shuffleArray: function(o) {
        for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    },


    // check if mobile based on screen
    checkIsMobileScreen: function() {
        return $(window).width() < 641;
    },

    checkIsEditMode: function() {
        return $('body').hasClass("editmode");
    },

    checkIsTouchDevice: function() {
        if (Modernizr && Modernizr.touch) {
            return true;
        }
        return false;
    },

    // set base settings vars/objects for other scripts to use
    baseSettings: {},

    baseSettingAdd: function(k, v) {
        tmitUtils.baseSettings[k] = v;
    },

    baseSettingGet: function(k, d) {
        if (tmitUtils.baseSettings[k]) {
            d = tmitUtils.baseSettings[k];
        }
        return d;
    }

};