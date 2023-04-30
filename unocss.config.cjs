import presetUno from "@unocss/preset-uno";
import presetWebFonts from "@unocss/preset-web-fonts";
import transformerDirectives from "@unocss/transformer-directives";
import transformerVariantGroup from "@unocss/transformer-variant-group";
import { defineConfig } from "unocss";

export default defineConfig({
  rules: [
    [
      "btn-transition",
      { transition: "color 180ms, border-color 150ms, background-color 150ms, box-shadow 150ms, transform 50ms" },
    ],
  ],
  shortcuts: {
    btn: `
      btn-transition inline-flex h-10 items-center justify-center gap-1 rounded-lg border-2 border-transparent px-3 font-medium disabled:cursor-not-allowed disabled:opacity-70
      outline-none ring-blue-500/50 ring-offset-2 focus-visible:ring-4
      active:scale-[0.96] disabled:active:scale-100
      `,
    focusable: "outline-none ring-blue-500/50 ring-offset-2 focus-visible:ring-4",
    link: "relative text-cyan-500 transition-all after:(content-empty pointer-events-none absolute inset-x-0.5 bottom-0 h-px translate-y-0.5 rounded-full bg-current opacity-0 transition-all duration-100 ease-in-out-expo) hover:after:inset-x-0 hover:after:translate-y-0 hover:after:opacity-100",
  },
  theme: {
    easing: {
      "in-out-expo": "cubic-bezier(.46, 0, .21, 1)",
      "out-expo": "cubic-bezier(0.19, 1, 0.22, 1)",
    },
  },
  presets: [
    presetUno(),
    presetWebFonts({
      provider: "google",
      fonts: {
        sans: {
          name: "Montserrat",
          weights: ["300", "400", "600", "700"],
          italic: true,
        },
      },
    }),
  ],
  transformers: [transformerVariantGroup(), transformerDirectives()],
});
