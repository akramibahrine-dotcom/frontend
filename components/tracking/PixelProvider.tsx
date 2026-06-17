"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import { captureUtmAndClickIds } from "@/lib/events";
import { trackHeartbeat, trackPageView } from "@/lib/tracking";

const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const TIKTOK_PIXEL_ID = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID;
const SNAP_PIXEL_ID = process.env.NEXT_PUBLIC_SNAP_PIXEL_ID;
const CLARITY_PROJECT_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID || "x6jwsts6w0";

const REQUIRED_PIXELS = [
  META_PIXEL_ID ? "meta" : null,
  TIKTOK_PIXEL_ID ? "tiktok" : null,
  SNAP_PIXEL_ID ? "snap" : null,
].filter(Boolean) as string[];

export function PixelProvider() {
  const loadedRef = useRef<Set<string>>(new Set());
  const pageViewFiredRef = useRef(false);

  function firePageViewOnce() {
    if (pageViewFiredRef.current) return;
    pageViewFiredRef.current = true;
    trackPageView();
  }

  function onPixelReady(name: string) {
    loadedRef.current.add(name);
    if (REQUIRED_PIXELS.every((pixel) => loadedRef.current.has(pixel))) {
      firePageViewOnce();
    }
  }

  useEffect(() => {
    captureUtmAndClickIds();
    trackHeartbeat();
    const heartbeat = window.setInterval(trackHeartbeat, 60_000);

    if (REQUIRED_PIXELS.length === 0) {
      firePageViewOnce();
    } else {
      // Ad blockers may prevent scripts — still attempt analytics after a short wait.
      const fallback = window.setTimeout(firePageViewOnce, 4000);
      return () => {
        window.clearInterval(heartbeat);
        window.clearTimeout(fallback);
      };
    }

    return () => window.clearInterval(heartbeat);
  }, []);

  return (
    <>
      {META_PIXEL_ID && (
        <Script
          id="meta-pixel"
          strategy="lazyOnload"
          onLoad={() => onPixelReady("meta")}
          dangerouslySetInnerHTML={{
            __html: `
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');
`,
          }}
        />
      )}

      {TIKTOK_PIXEL_ID && (
        <Script
          id="tiktok-pixel"
          strategy="lazyOnload"
          onLoad={() => onPixelReady("tiktok")}
          dangerouslySetInnerHTML={{
            __html: `
!function(w,d,t){w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"];ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e};ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{};ttq._i[e]=[];ttq._i[e]._u=i;ttq._t=ttq._t||{};ttq._t[e]=+new Date;ttq._o=ttq._o||{};ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript";o.async=!0;o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};ttq.load('${TIKTOK_PIXEL_ID}');}(window,document,'ttq');
`,
          }}
        />
      )}

      {SNAP_PIXEL_ID && (
        <Script
          id="snap-pixel"
          strategy="lazyOnload"
          onLoad={() => onPixelReady("snap")}
          dangerouslySetInnerHTML={{
            __html: `
(function(e,t,n){if(e.snaptr)return;var a=e.snaptr=function(){a.handleRequest?a.handleRequest.apply(a,arguments):a.queue.push(arguments)};a.queue=[];var s='script';r=t.createElement(s);r.async=!0;r.src=n;var u=t.getElementsByTagName(s)[0];u.parentNode.insertBefore(r,u);})(window,document,'https://sc-static.net/scevent.min.js');
snaptr('init','${SNAP_PIXEL_ID}');
`,
          }}
        />
      )}

      {CLARITY_PROJECT_ID && (
        <Script
          id="clarity-script"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
(function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");
`,
          }}
        />
      )}
    </>
  );
}
