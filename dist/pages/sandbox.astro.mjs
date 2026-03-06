import { c as createComponent, m as maybeRenderHead, d as renderTemplate } from '../chunks/astro/server_DtEHTjCW.mjs';
import 'piccolore';
import 'html-escaper';
import 'clsx';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Sandbox = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<!-- Testing Webseite --><html> ${maybeRenderHead()}<body>
Sandbox goes brrrr
</body></html>`;
}, "/run/media/artibex/AI/GitHub/MidiToys/src/pages/sandbox.astro", void 0);

const $$file = "/run/media/artibex/AI/GitHub/MidiToys/src/pages/sandbox.astro";
const $$url = "/sandbox";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Sandbox,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
