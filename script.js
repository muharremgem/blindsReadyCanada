// Belirtilen tarihten sonraki 4 saat 16 dakika 15 saniyenin bitiş tarihini hesaplayın
var endTime = new Date();
endTime.setHours(endTime.getHours() + 4);
endTime.setMinutes(endTime.getMinutes() + 16);
endTime.setSeconds(endTime.getSeconds() + 15);

// Geri sayımı başlatın
var countdown = setInterval(function () {
  // Şimdiki tarihi alın
  var now = new Date().getTime();

  // Kalan zamanı hesaplayın
  var distance = endTime - now;

  // Saat, dakika ve saniyeleri hesaplayın
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Kalan zamanı ekrana yazdırın
  document.getElementById("hours").innerHTML = hours;
  document.getElementById("minutes").innerHTML = minutes;
  document.getElementById("seconds").innerHTML = seconds;

  // Zamanın dolduğunu kontrol edin ve yeni bir geri sayım başlatın
  if (distance < 0) {
    // Yeni son tarihi hesaplayın
    endTime = new Date();
    endTime.setHours(endTime.getHours() + 4);
    endTime.setMinutes(endTime.getMinutes() + 16);
    endTime.setSeconds(endTime.getSeconds() + 15);

    // Geri sayımı yeniden başlatın
    console.log(
      "4 saat 16 dakika 15 saniye doldu. Yeni geri sayım başlatılıyor..."
    );
  }
}, 1000);


// sticky

window.onscroll = function () {
  myFunction();
};

// Get the header
var header = document.getElementById("myHeader");

// Get the offset position of the navbar
var sticky = header.offsetTop;

// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}
// sticky

// LazyLoad

(function () {
  "use strict";
  var r =
      "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
        ? function (e) {
            return typeof e;
          }
        : function (e) {
            return e &&
              "function" == typeof Symbol &&
              e.constructor === Symbol &&
              e !== Symbol.prototype
              ? "symbol"
              : typeof e;
          },
    e = (function () {
      function i(e, t) {
        for (var n = 0; n < t.length; n++) {
          var i = t[n];
          (i.enumerable = i.enumerable || !1),
            (i.configurable = !0),
            "value" in i && (i.writable = !0),
            Object.defineProperty(e, i.key, i);
        }
      }
      return function (e, t, n) {
        return t && i(e.prototype, t), n && i(e, n), e;
      };
    })();
  function i(e, t) {
    if (!(e instanceof t))
      throw new TypeError("Cannot call a class as a function");
  }
  var t = (function () {
    function n(e, t) {
      i(this, n),
        (this.browser = e),
        (this.config = t),
        (this.options = this.browser.options),
        (this.prefetched = new Set()),
        (this.eventTime = null),
        (this.threshold = 1111),
        (this.numOnHover = 0);
    }
    return (
      e(
        n,
        [
          {
            key: "init",
            value: function () {
              !this.browser.supportsLinkPrefetch() ||
                this.browser.isDataSaverModeOn() ||
                this.browser.isSlowConnection() ||
                ((this.regex = {
                  excludeUris: RegExp(this.config.excludeUris, "i"),
                  images: RegExp(".(" + this.config.imageExt + ")$", "i"),
                  fileExt: RegExp(".(" + this.config.fileExt + ")$", "i"),
                }),
                this._initListeners(this));
            },
          },
          {
            key: "_initListeners",
            value: function (e) {
              -1 < this.config.onHoverDelay &&
                document.addEventListener(
                  "mouseover",
                  e.listener.bind(e),
                  e.listenerOptions
                ),
                document.addEventListener(
                  "mousedown",
                  e.listener.bind(e),
                  e.listenerOptions
                ),
                document.addEventListener(
                  "touchstart",
                  e.listener.bind(e),
                  e.listenerOptions
                );
            },
          },
          {
            key: "listener",
            value: function (e) {
              var t = e.target.closest("a"),
                n = this._prepareUrl(t);
              if (null !== n)
                switch (e.type) {
                  case "mousedown":
                  case "touchstart":
                    this._addPrefetchLink(n);
                    break;
                  case "mouseover":
                    this._earlyPrefetch(t, n, "mouseout");
                }
            },
          },
          {
            key: "_earlyPrefetch",
            value: function (t, e, n) {
              var i = this,
                r = setTimeout(function () {
                  if (((r = null), 0 === i.numOnHover))
                    setTimeout(function () {
                      return (i.numOnHover = 0);
                    }, 1e3);
                  else if (i.numOnHover > i.config.rateThrottle) return;
                  i.numOnHover++, i._addPrefetchLink(e);
                }, this.config.onHoverDelay);
              t.addEventListener(
                n,
                function e() {
                  t.removeEventListener(n, e, { passive: !0 }),
                    null !== r && (clearTimeout(r), (r = null));
                },
                { passive: !0 }
              );
            },
          },
          {
            key: "_addPrefetchLink",
            value: function (i) {
              return (
                this.prefetched.add(i.href),
                new Promise(function (e, t) {
                  var n = document.createElement("link");
                  (n.rel = "prefetch"),
                    (n.href = i.href),
                    (n.onload = e),
                    (n.onerror = t),
                    document.head.appendChild(n);
                }).catch(function () {})
              );
            },
          },
          {
            key: "_prepareUrl",
            value: function (e) {
              if (
                null === e ||
                "object" !== (void 0 === e ? "undefined" : r(e)) ||
                !1 in e ||
                -1 === ["http:", "https:"].indexOf(e.protocol)
              )
                return null;
              var t = e.href.substring(0, this.config.siteUrl.length),
                n = this._getPathname(e.href, t),
                i = {
                  original: e.href,
                  protocol: e.protocol,
                  origin: t,
                  pathname: n,
                  href: t + n,
                };
              return this._isLinkOk(i) ? i : null;
            },
          },
          {
            key: "_getPathname",
            value: function (e, t) {
              var n = t ? e.substring(this.config.siteUrl.length) : e;
              return (
                n.startsWith("/") || (n = "/" + n),
                this._shouldAddTrailingSlash(n) ? n + "/" : n
              );
            },
          },
          {
            key: "_shouldAddTrailingSlash",
            value: function (e) {
              return (
                this.config.usesTrailingSlash &&
                !e.endsWith("/") &&
                !this.regex.fileExt.test(e)
              );
            },
          },
          {
            key: "_isLinkOk",
            value: function (e) {
              return (
                null !== e &&
                "object" === (void 0 === e ? "undefined" : r(e)) &&
                !this.prefetched.has(e.href) &&
                e.origin === this.config.siteUrl &&
                -1 === e.href.indexOf("?") &&
                -1 === e.href.indexOf("#") &&
                !this.regex.excludeUris.test(e.href) &&
                !this.regex.images.test(e.href)
              );
            },
          },
        ],
        [
          {
            key: "run",
            value: function () {
              "undefined" != typeof RocketPreloadLinksConfig &&
                new n(
                  new RocketBrowserCompatibilityChecker({
                    capture: !0,
                    passive: !0,
                  }),
                  RocketPreloadLinksConfig
                ).init();
            },
          },
        ]
      ),
      n
    );
  })();
  t.run();
})();

window.lazyLoadOptions = [
  {
    elements_selector:
      "img[data-lazy-src],.rocket-lazyload,iframe[data-lazy-src]",
    data_src: "lazy-src",
    data_srcset: "lazy-srcset",
    data_sizes: "lazy-sizes",
    class_loading: "lazyloading",
    class_loaded: "lazyloaded",
    threshold: 300,
    callback_loaded: function (element) {
      if (
        element.tagName === "IFRAME" &&
        element.dataset.rocketLazyload == "fitvidscompatible"
      ) {
        if (element.classList.contains("lazyloaded")) {
          if (typeof window.jQuery != "undefined") {
            if (jQuery.fn.fitVids) {
              jQuery(element).parent().fitVids();
            }
          }
        }
      }
    },
  },
  {
    elements_selector: ".rocket-lazyload",
    data_src: "lazy-src",
    data_srcset: "lazy-srcset",
    data_sizes: "lazy-sizes",
    class_loading: "lazyloading",
    class_loaded: "lazyloaded",
    threshold: 300,
  },
];
window.addEventListener(
  "LazyLoad::Initialized",
  function (e) {
    var lazyLoadInstance = e.detail.instance;
    if (window.MutationObserver) {
      var observer = new MutationObserver(function (mutations) {
        var image_count = 0;
        var iframe_count = 0;
        var rocketlazy_count = 0;
        mutations.forEach(function (mutation) {
          for (var i = 0; i < mutation.addedNodes.length; i++) {
            if (
              typeof mutation.addedNodes[i].getElementsByTagName !== "function"
            ) {
              continue;
            }
            if (
              typeof mutation.addedNodes[i].getElementsByClassName !==
              "function"
            ) {
              continue;
            }
            images = mutation.addedNodes[i].getElementsByTagName("img");
            is_image = mutation.addedNodes[i].tagName == "IMG";
            iframes = mutation.addedNodes[i].getElementsByTagName("iframe");
            is_iframe = mutation.addedNodes[i].tagName == "IFRAME";
            rocket_lazy =
              mutation.addedNodes[i].getElementsByClassName("rocket-lazyload");
            image_count += images.length;
            iframe_count += iframes.length;
            rocketlazy_count += rocket_lazy.length;
            if (is_image) {
              image_count += 1;
            }
            if (is_iframe) {
              iframe_count += 1;
            }
          }
        });
        if (image_count > 0 || iframe_count > 0 || rocketlazy_count > 0) {
          lazyLoadInstance.update();
        }
      });
      var b = document.getElementsByTagName("body")[0];
      var config = { childList: !0, subtree: !0 };
      observer.observe(b, config);
    }
  },
  !1
);
