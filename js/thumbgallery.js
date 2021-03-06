/* ------------------------------------------------------------------------
	Class: prettyGallery
	Use: Gallery plugin for jQuery
	Author: Stephane Caron (http://www.no-margin-for-errors.com)
	Version: 1.1
------------------------------------------------------------------------- */

jQuery.fn.prettyGallery = function(a) {
    a = jQuery.extend({
        itemsPerPage: 2,
        animationSpeed: "normal",
        navigation: "top",
        of_label: " of ",
        previous_title_label: "Previous page",
        next_title_label: "Next page",
        previous_label: "Previous",
        next_label: "Next",
        start_slide: 0
    },
    a);
    return this.each(function() {
        var g = 1;
        var i = 0;
        var d = 0;
        var h = 0;
        var c = 0;
        var e = false;
        var j = $(this);
        var f = function(n) {
            if (e || $(n).hasClass("disabled")) {
                return;
            }
            e = true;
            j.find("li:lt(" + (g * a.itemsPerPage) + ")").each(function(o) {
                $(this).animate({
                    left: parseFloat($(this).css("left")) + (h + itemMargin)
                },
                a.animationSpeed,
                function() {
                    e = false;
                });
            });
            j.find("li:gt(" + ((g * a.itemsPerPage) - 1) + ")").each(function(o) {
                $(this).animate({
                    left: parseFloat($(this).css("left")) + (h + itemMargin)
                },
                a.animationSpeed);
            });
            g--;
            k();
        };
        var b = function(n) {
            if (e || $(n).hasClass("disabled")) {
                return;
            }
            e = true;
            j.find("li:lt(" + (g * a.itemsPerPage) + ")").each(function(o) {
                $(this).animate({
                    left: parseFloat($(this).css("left")) - (h + itemMargin)
                },
                a.animationSpeed,
                function() {
                    e = false;
                });
            });
            j.find("li:gt(" + ((g * a.itemsPerPage) - 1) + ")").each(function(o) {
                $(this).animate({
                    left: parseFloat($(this).css("left")) - (h + itemMargin)
                },
                a.animationSpeed);
            });
            g++;
            k();
        };
        var bfast = function(n) {
            if (e || $(n).hasClass("disabled")) {
                return;
            }
            e = true;
            j.find("li:lt(" + (g * a.itemsPerPage) + ")").each(function(o) {
                $(this).animate({
                    left: parseFloat($(this).css("left")) - (h + itemMargin)
                },
                0,
                function() {
                    e = false;
                });
            });
            j.find("li:gt(" + ((g * a.itemsPerPage) - 1) + ")").each(function(o) {
                $(this).animate({
                    left: parseFloat($(this).css("left")) - (h + itemMargin)
                },
                0);
            });
            g++;
            k();
        };
        var l = function() {
            i = j.find("li:first").css("position", "absolute").width();
            itemMargin = parseFloat(j.find("li:first").css("margin-right")) + parseFloat(j.find("li:first").css("margin-left")) + parseFloat(j.find("li:first").css("padding-left")) + parseFloat(j.find("li:first").css("padding-right")) + parseFloat(j.find("li:first").css("border-left-width")) + parseFloat(j.find("li:first").css("border-right-width"));
            d = j.find("li:first").height() + parseFloat(j.find("li:first").css("margin-top")) + parseFloat(j.find("li:first").css("margin-bottom")) + parseFloat(j.find("li:first").css("padding-top")) + parseFloat(j.find("li:first").css("padding-bottom"));
            h = (i + itemMargin) * a.itemsPerPage - parseFloat(j.find("li:first").css("margin-right"));
            j.css({
                width: h,
                height: d,
                overflow: "hidden",
                position: "relative",
                clear: "left"
            });
           
            
            	j.find("li").each(function(n) {
                	$(this).css({
                    	position: "absolute",
                    	top: 0,
                    	left: n * (i + itemMargin)
                	});
            	});
            
        	
            j.wrap('<div class="prettyGalleryContainer"></div>').addClass("prettyGalleryContainer");
        };
        var k = function() {
            $cg = j.parents("div.prettyGalleryContainer:first");
            $cg.find("ul.pg_paging span.current").text(g);
            $cg.find("ul.pg_paging span.total").text(c);
            $cg.find("ul.pg_paging li ").removeClass("disabled");
            if (g == 1) {
                $cg.find("ul.pg_paging li.pg_prev ").addClass("disabled");
            } else {
                if (g == c) {
                    $cg.find("ul.pg_paging li.pg_next ").addClass("disabled");
                }
            }
        };
        var m = function() {
            var n = "";
            n += '<ul class="pg_paging">';
            n += '<li class="pg_prev"><a href="#" title="' + a.previous_title_label + '">' + a.previous_label + "</a></li>";
            n += '<li><span class="current">1</span>' + a.of_label + '<span class="total">1</span></li>';
            n += '<li class="pg_next"><a href="#" title="' + a.next_title_label + '">' + a.next_label + "</a></li>";
            n += "</ul>";
            switch (a.navigation) {
            case "top":
                j.before(n);
                break;
            case "bottom":
                j.after(n);
                break;
            case "both":
                j.before(n);
                j.after(n);
                break;
            }
            $theNav = j.parent("div.prettyGalleryContainer:first").find("ul.pg_paging");
            galleryBorderWidth = parseFloat($theNav.css("border-left-width")) + parseFloat($theNav.css("border-right-width"));
            $theNav.width(h - galleryBorderWidth);
            $theNav.each(function() {
                $(this).find("li:eq(1)").width(h - galleryBorderWidth - parseFloat($(this).parent().find("ul.prettyNavigation li:first").width()) - parseFloat($(this).parent().find("ul.prettyNavigation li:last").width()));
            });
            $theNav.find("li.pg_prev a").bind("click",
            function() {
                f(this);
                return false;
            });
            $theNav.find("li.pg_next a").bind("click",
            function() {
                b(this);
                return false;
            });
        };
        if ($(this).find("li").size() > a.itemsPerPage) {
            c = Math.ceil($(this).find("li").size() / a.itemsPerPage);
            l();
            m();
            k(this);
            g = 1;
        }
		$(document)
		     .bind('nextPane', function() {
			b($theNav.find("li.pg_next a"));
			
		}).bind('prevPane', function() {
			f($theNav.find("li.pg_prev a"))
		});
		//console.log("thumb_position: "+thumb_position);
		if (thumb_position > 5){
			var x311 = bfast($theNav.find("li.pg_next a"));	
		}	
		if (thumb_position > 10){
			var x311 = bfast($theNav.find("li.pg_next a"));	
		}
		if (thumb_position > 15){
			var x311 = bfast($theNav.find("li.pg_next a"));	
		}
    });
};
