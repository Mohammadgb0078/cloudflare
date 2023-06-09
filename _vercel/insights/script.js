"use strict";
!function() {
    let e = e=>e
      , t = document.currentScript
      , n = null != t && t.src.includes("/va/") ? "/va" : "/_vercel/insights";
    async function i({type: i, data: r, options: a}) {
        var o, l;
        let d = location.href
          , s = document.referrer
          , u = e({
            type: i,
            url: d
        });
        if (!1 === u || null === u)
            return;
        u && (d = u.url);
        let c = s.includes(location.host)
          , v = {
            o: d,
            sv: "0.1.1",
            sdkn: null != (o = null == t ? void 0 : t.getAttribute("data-sdkn")) ? o : void 0,
            sdkv: null != (l = null == t ? void 0 : t.getAttribute("data-sdkv")) ? l : void 0,
            ts: Date.now(),
            ...null != a && a.withReferrer && !c ? {
                r: s
            } : {},
            ..."event" === i && r && {
                en: r.name,
                ed: r.data
            }
        };
        try {
            await fetch(`${n}/${"pageview" === i ? "view" : "event"}`, {
                method: "POST",
                keepalive: !0,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(v)
            })
        } catch (f) {}
    }
    async function r(e={}) {
        return i({
            type: "pageview",
            options: {
                withReferrer: e.withReferrer
            }
        })
    }
    async function a(e, t) {
        return i({
            type: "event",
            data: {
                name: e,
                data: t
            },
            options: {
                withReferrer: !0
            }
        })
    }
    let o = ()=>{
        var t;
        window.va = function(t, n) {
            "beforeSend" === t ? e = n : "event" === t && n && a(n.name, n.data)
        }
        ,
        null == (t = window.vaq) || t.forEach(([e,t])=>{
            window.va(e, t)
        }
        )
    }
    ;
    (()=>{
        if (window.vai)
            return;
        window.vai = !0,
        o(),
        r({
            withReferrer: !0
        });
        let e = history.pushState.bind(history);
        history.pushState = function(...t) {
            let n = t[2]
              , i = "string" == typeof n ? location.pathname !== n.split("?")[0] : n && location.href !== n.href;
            e(...t),
            i && r()
        }
        ,
        window.addEventListener("popstate", function() {
            r()
        })
    }
    )()
}();
