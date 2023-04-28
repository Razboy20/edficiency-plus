import presetWebFonts from "@unocss/preset-web-fonts";
import presetWind from "@unocss/preset-wind";
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
    link: "relative text-cyan-500 transition-all after:pointer-events-none after:absolute after:inset-x-0.5 after:bottom-0 after:h-px after:translate-y-0.5 after:rounded-full after:bg-current after:opacity-0 after:transition-all after:duration-100 after:ease-in-out-expo hover:after:inset-x-0 hover:after:translate-y-0 hover:after:opacity-100",
  },
  theme: {
    transitionTimingFunction: {
      "in-out-expo": "cubic-bezier(.46, 0, .21, 1)",
      "out-expo": "cubic-bezier(0.19, 1, 0.22, 1)",
    },
  },
  presets: [
    presetWind(),
    presetWebFonts({
      provider: "google",
      fonts: {
        sans: "Montserrat",
      },
    }),
  ],
  transformers: [transformerVariantGroup(), transformerDirectives()],
});
