(() => {
  const systemPrefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  const defaultTheme = systemPrefersDark ? "github-dark" : "github-light";

  const currentUrl = new URL(location.href);
  const sessionParam = currentUrl.searchParams.get("utterances");
  if (sessionParam) {
    localStorage.setItem("utterances-session", sessionParam);
    currentUrl.searchParams.delete("utterances");
    history.replaceState(undefined, document.title, currentUrl.href);
  }

  let scriptEl = document.currentScript;
  if (!scriptEl) {
    scriptEl = document.querySelector(
      'script[src^="https://utteranc.es/client.js"], script[src^="http://localhost:4000/client.js"]'
    );
  }

  const config = {};
  for (const attr of scriptEl.attributes) {
    const name = attr.name.replace(/^data-/, "");
    config[name] = attr.value;
  }

  if (config.theme === "preferred-color-scheme") {
    config.theme = defaultTheme;
  }

  const canonicalLink = document.querySelector("link[rel='canonical']");
  config.url = canonicalLink
    ? canonicalLink.href
    : currentUrl.origin + currentUrl.pathname + currentUrl.search;
  config.origin = currentUrl.origin;
  config.pathname =
    currentUrl.pathname.length < 2
      ? "index"
      : currentUrl.pathname.slice(1).replace(/\.\w+$/, "");
  config.title = document.title;

  const descMeta = document.querySelector("meta[name='description']");
  config.description = descMeta ? descMeta.content : "";
  const encodedLength = encodeURIComponent(config.description).length;
  if (encodedLength > 1000) {
    const ratio = (1000 * config.description.length) / encodedLength;
    config.description = config.description.slice(0, Math.floor(ratio));
  }

  const ogTitleMeta = document.querySelector(
    "meta[property='og:title'], meta[name='og:title']"
  );
  config["og:title"] = ogTitleMeta ? ogTitleMeta.content : "";

  config.session =
    sessionParam || localStorage.getItem("utterances-session") || "";

  document.head.insertAdjacentHTML(
    "afterbegin",
    `<style>
      .utterances { position: relative; box-sizing: border-box; width: 100%; max-width: 760px; margin: 0 auto; }
      .utterances-frame { color-scheme: light; position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0; }
    </style>`
  );

  const scriptSrcMatch = scriptEl.src.match(
    /^https:\/\/utteranc\.es|http:\/\/localhost:\d+/
  )[0];
  const iframeSrc = `${scriptSrcMatch}/utterances.html?${new URLSearchParams(config)}`;

  scriptEl.insertAdjacentHTML(
    "afterend",
    `<div class="utterances">
       <iframe
         class="utterances-frame"
         title="Comments"
         scrolling="no"
         src="${iframeSrc}"
         loading="lazy"
       ></iframe>
     </div>`
  );

  const iframeContainer = scriptEl.nextElementSibling;
  scriptEl.remove();

  window.addEventListener("message", (event) => {
    if (event.origin !== scriptSrcMatch) return;
    const message = event.data;
    if (message?.type === "resize" && message.height) {
      iframeContainer.style.height = `${message.height}px`;
    }
  });
})();
