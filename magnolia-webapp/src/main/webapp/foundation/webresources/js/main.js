
// SVG logo replacer
if (!Modernizr.svg) {
    $(".site-title img.svg").attr("src", tmitUtils.baseSettingGet('resourcePath', '') + 'img/kimikrippen-logo@2x.png');
}

$(window).on('load resize', function() {
    // Footer
    var stickyFooter = $('#footer-wrapper');
    $('#wrapper').css('padding-bottom', stickyFooter.outerHeight());
    stickyFooter.css('margin-top', -stickyFooter.outerHeight());

    // Kimi skater
    function repeat() {
        var si = $('#kimi-skater');
        var sw = si.width();
        var ww = $(window).width();
        var swww = ww + sw;
        si.delay(500).css({
            "left": -sw
        }).fadeIn("fast");
        si.animate({
            left: '+=' + swww
        }, 7500);
        si.fadeOut("fast", repeat).delay(300000);
    }
    repeat();
});

$(document).ready(function() {

    // Sticky header
    stickyHeader();

    // Mobile Navigation
    $("#menu-burger").click(function(e) {
        e.preventDefault();
        $("#navigation-area").toggleClass("open");
        $("#navigation").slideToggle(300);
        $("#dailyRoutineNavigation").fadeToggle(300);
    });

    // Touch navigation (drop-dopdown)
    if (Modernizr.touch) {
        $('#navigation').on('click', '> li', function(e) {
            if ($(this).has(".has-dropdown").length) {
                if (!$(this).data('open')) {
                    e.preventDefault();
                }
                $(this).data('open', true);
            }
        });
    }

    // Loads fitVids.js
    $(".html-component").fitVids();

    // Kimi's daily routine
    dailyRoutine();

    // Logo animation
    setInterval('cycleLogo()', 7000);

    // Check links and append corresponding "_blank" or "_self"
    tmitUtils.openExternalLinksInNewWindow();

    // Fancybox
    $(".lightbox").fancybox({
        padding: 0,
        type: "image",
        maxWidth: 1000,
        helpers: {
            title: {
                type: "inside"
            },
            overlay: {
                showEarly: false,
                locked: false
            }
        },
        afterLoad: addLinks,
        beforeClose: removeLinks
    });

    // Fancybox (vide)
    $(".videobox").fancybox({
        padding: 0,
        type: "iframe",
        width: 1000,
        height: 563,
        aspectRatio: true,
        scrolling: "no",
        helpers: {
            overlay: {
                showEarly: false,
                locked: false
            }
        }
    });

    // Fancybox add on for dot navigation
    function addLinks() {
        var list = $("#lightboxLinks");
        if (!list.length) {
            list = $('<ul id="lightboxLinks">');
            for (var i = 0; i < this.group.length; i++) {
                $('<li data-index="' + i + '"><label></label></li>').click(function() {
                    $.fancybox.jumpto($(this).data('index'));
                }).appendTo(list);
            }
            list.appendTo("body");
        }
        list.find('li').removeClass('active').eq(this.index).addClass('active');
    }

    function removeLinks() {
        $("#lightboxLinks").remove();
    }

    // Cache killer for link element
    $(".kclink").each(function() {
        var $l = $(this).attr("href");
        if ($l != undefined) {
            if ($l.indexOf("?") == -1) {
                $l += "?";
            } else {
                $l += "&";
            }
            $l += "kc=" + new Date().getTime();
            $(this).attr("href", $l)
        }
    });

    // Cache killer for src (img, script ...) element
    $(".kcsrc").each(function() {
        var $l = $(this).attr("src");
        if ($l != undefined) {
            if ($l.indexOf("?") == -1) {
                $l += "?";
            } else {
                $l += "&";
            }
            $l += "kc=" + new Date().getTime();
            $(this).attr("src", $l)
        }
    });

});

// Custom animation (easeOutCubic)
$.easing.myEasing = function(x, t, b, c, d) {
    return c * ((t = t / d - 1) * t * t + 1) + b;
};

// Smooth anchor scrolling
$(function() {
    setTimeout(function() {
        if (location.hash) {
            window.scrollTo(0, 0);
            var target = location.hash.split('#');
            smoothScrollTo($('#' + target[1]));
        }
    }, 1);
    $('a[href*=#]:not([href=#]):not([href^=#panel])').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            smoothScrollTo($(this.hash));
            return false;
        }
    });

    function smoothScrollTo(target) {
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
            setTimeout(function() {
                $('html,body').animate({
                    scrollTop: target.offset().top - ($("#header").outerHeight())
                }, 1500, 'myEasing');
            }, 250);
        }
    }
});

// Sticky Header
function stickyHeader() {
    if (tmitUtils.checkIsEditMode() != true) {
        var kimiHeader = $("#header");
        var stickyTopSpacing = kimiHeader.outerHeight() / 10;
        $(window).scroll(function() {
            if ($(window).scrollTop() > stickyTopSpacing) {
                $('#branding-area').slideUp("fast");
                kimiHeader.addClass("box-shaddow");
            } else {
                kimiHeader.removeClass("box-shaddow");
                $('#branding-area').slideDown("fast");
            }
        });
        kimiHeader.sticky({
            topSpacing: 0,
            getWidthFrom: "#wrapper",
            responsiveWidth: true
        });
    }
}

// Logo cycle animation
function cycleLogo() {
    var $active = $('.site-title .active');
    var $next = ($active.next().length > 0) ? $active.next() : $('.site-title img:first');
    $next.css('z-index', 2);
    $active.fadeOut(1500, function() {
        $active.css('z-index', 1).show().removeClass('active');
        $next.css('z-index', 3).addClass('active');
    });
}

// Kimi's daily routine
function dailyRoutine() {
    if ($(".dailyRoutineWrapper").length) {
        var kimiImage = $(".dailyRoutineImage");
        var kimiText = $('.dailyRoutineText');

        setInterval(function() {
            datetoday = new Date();
            var thisDay = datetoday.getDay();
            var thehours = (datetoday.getHours() < 10 ? '0' : '') + datetoday.getHours();
            var theminutes = (datetoday.getMinutes() < 10 ? '0' : '') + datetoday.getMinutes();
            var thetime = thehours + ":" + theminutes;
            var isWeekend = (thisDay == 6) || (thisDay == 0);
            // logo replacer
            $(".site-title .placeholder").attr("src", kimiImage.attr('src'));
            if (isWeekend) {
                if (kimiText.length) {
                    kimiText.html(kimiTimeTextBefore + thetime + kimiTimeTextAfter + kimiTimeText00);
                }
                kimiImage.attr("src", kimiTimePict12);
            } else {
                if (thetime < kimiTimeTime02) {
                    if (kimiText.length) {
                        kimiText.html(kimiTimeTextBefore + thetime + kimiTimeTextAfter + kimiTimeText01);
                    }
                    kimiImage.attr("src", kimiTimePict01);
                }
                if (thetime > kimiTimeTime02 && thetime < kimiTimeTime03) {
                    if (kimiText.length) {
                        kimiText.html(kimiTimeTextBefore + thetime + kimiTimeTextAfter + kimiTimeText02);
                    }
                    kimiImage.attr("src", kimiTimePict02);
                }
                if (thetime > kimiTimeTime03 && thetime < kimiTimeTime04) {
                    if (kimiText.length) {
                        kimiText.html(kimiTimeTextBefore + thetime + kimiTimeTextAfter + kimiTimeText03);
                    }
                    kimiImage.attr("src", kimiTimePict03);
                }
                if (thetime > kimiTimeTime04 && thetime < kimiTimeTime05) {
                    if (kimiText.length) {
                        kimiText.html(kimiTimeTextBefore + thetime + kimiTimeTextAfter + kimiTimeText04);
                    }
                    kimiImage.attr("src", kimiTimePict04);
                }
                if (thetime > kimiTimeTime05 && thetime < kimiTimeTime06) {
                    if (kimiText.length) {
                        kimiText.html(kimiTimeTextBefore + thetime + kimiTimeTextAfter + kimiTimeText05);
                    }
                    kimiImage.attr("src", kimiTimePict05);
                }
                if (thetime > kimiTimeTime06 && thetime < kimiTimeTime07) {
                    if (kimiText.length) {
                        kimiText.html(kimiTimeTextBefore + thetime + kimiTimeTextAfter + kimiTimeText06);
                    }
                    kimiImage.attr("src", kimiTimePict06);
                }
                if (thetime > kimiTimeTime07 && thetime < kimiTimeTime08) {
                    if (kimiText.length) {
                        kimiText.html(kimiTimeTextBefore + thetime + kimiTimeTextAfter + kimiTimeText07);
                    }
                    kimiImage.attr("src", kimiTimePict07);
                }
                if (thetime > kimiTimeTime08 && thetime < kimiTimeTime09) {
                    if (kimiText.length) {
                        kimiText.html(kimiTimeTextBefore + thetime + kimiTimeTextAfter + kimiTimeText08);
                    }
                    kimiImage.attr("src", kimiTimePict08);
                }
                if (thetime > kimiTimeTime09 && thetime < kimiTimeTime10) {
                    if (kimiText.length) {
                        kimiText.html(kimiTimeTextBefore + thetime + kimiTimeTextAfter + kimiTimeText09);
                    }
                    kimiImage.attr("src", kimiTimePict09);
                }
                if (thetime > kimiTimeTime10 && thetime < kimiTimeTime11) {
                    if (kimiText.length) {
                        kimiText.html(kimiTimeTextBefore + thetime + kimiTimeTextAfter + kimiTimeText10);
                    }
                    kimiImage.attr("src", kimiTimePict10);
                }
                if (thetime > kimiTimeTime11 && thetime < kimiTimeTime12) {
                    if (kimiText.length) {
                        kimiText.html(kimiTimeTextBefore + thetime + kimiTimeTextAfter + kimiTimeText11);
                    }
                    kimiImage.attr("src", kimiTimePict11);
                }
                if (thetime > kimiTimeTime12) {
                    if (kimiText.length) {
                        kimiText.html(kimiTimeTextBefore + thetime + kimiTimeTextAfter + kimiTimeText12);
                    }
                    kimiImage.attr("src", kimiTimePict12);
                }
            }
        }, 1000);
        if ($(".row").hasClass("equalize")) {
            setTimeout(function() {
                equalizeHeights(".row.equalize", ".panel");
            }, 1000);
        }
    }
}

// Equalize columns
function equalizeHeights(selector, subselector) {
    if (tmitUtils.checkIsMobileScreen() != true || tmitUtils.checkIsEditMode() != true) {
        $(selector).each(function() {
            var current = $(this);
            var heights = [];
            current.find(subselector).each(function() {
                $(this).css('min-height', '0');
                $(this).css('max-height', 'none');
                $(this).css('height', 'auto');
                heights.push($(this).outerHeight());
            });
            var max = Math.max.apply(Math, heights);
            current.find(subselector).css('height', max + 'px');
        });
    }
    if (tmitUtils.checkIsMobileScreen() != false || tmitUtils.checkIsEditMode() != false) {
        $(selector).find(subselector).each(function() {
            $(this).css('height', 'auto');
        });
    }
}

$(function() {
    if ($(".row").hasClass("equalize")) {
        $(window).load(function() {
            equalizeHeights(".row.equalize", ".panel");
            $(window).resize(function() {
                setTimeout(function() {
                    equalizeHeights(".row.equalize", ".panel");
                }, 100);
            });
        });
    }
});


/**
 * String manuipulation Utils
 * Code ported from Real's Java HowTo: http://www.rgagnon.com/javadetails/java-0456.html
 * Author: Luis Tama Wong
 */

var PLAIN_ASCII =
        "AaEeIiOoUu" // grave
        + "AaEeIiOoUuYy" // acute
        + "AaEeIiOoUuYy" // circumflex
        + "AaOoNn" // tilde
        + "AaEeIiOoUuYy" // umlaut
        + "Aa" // ring
        + "Cc" // cedilla
        + "OoUu" // double acute
    ;

var UNICODE =
    "\u00C0\u00E0\u00C8\u00E8\u00CC\u00EC\u00D2\u00F2\u00D9\u00F9" + "\u00C1\u00E1\u00C9\u00E9\u00CD\u00ED\u00D3\u00F3\u00DA\u00FA\u00DD\u00FD" + "\u00C2\u00E2\u00CA\u00EA\u00CE\u00EE\u00D4\u00F4\u00DB\u00FB\u0176\u0177" + "\u00C3\u00E3\u00D5\u00F5\u00D1\u00F1" + "\u00C4\u00E4\u00CB\u00EB\u00CF\u00EF\u00D6\u00F6\u00DC\u00FC\u0178\u00FF" + "\u00C5\u00E5" + "\u00C7\u00E7" + "\u0150\u0151\u0170\u0171";

// remove accentued from a string and replace with ascii equivalent
function convertNonAscii(s) {
    if (s == null)
        return null;
    var sb = '';
    var n = s.length;
    for (var i = 0; i < n; i++) {
        var c = s.charAt(i);
        var pos = UNICODE.indexOf(c);
        if (pos > -1) {
            sb += PLAIN_ASCII.charAt(pos);
        } else {
            sb += c;
        }
    }
    return sb;
};

function dcmadr(nnnn) {
    var a = "";
    for (i = 0, m = nnnn.length; i < m; i++) {
        if (i % 3 == 0) {
            a += String.fromCharCode(nnnn.substr(i, 3));
        }
    }
    location.href = (a);
}