/**
 * Recolours the supplied lime logo artwork into the site's indigo palette.
 *
 * The source PNGs (LogoUCNFreelance.png, LogoUCNFreelanceMini.png) are lime
 * (#d2ff00) with darker olive side-faces that give the isometric mark its
 * depth, and — on the wordmark — the word "Freelance" set in white, which is
 * invisible against a light page.
 *
 * Rather than redraw the mark (and risk getting the brand shape wrong), this
 * maps colours while preserving every pixel's relative lightness, so the
 * isometric shading survives intact:
 *
 *   chromatic pixels (the lime mark + "UCN")  -> indigo ramp, dark faces to
 *                                                deep indigo, lit faces to the
 *                                                brand accent #6366f1
 *   light achromatic pixels (the white text)  -> --ink #1e293b, so it reads
 *
 * Run with: node scripts/recolor-logo.mjs   (needs sharp; `npm i --no-save sharp`)
 * Output is committed, so this only needs re-running if the source art changes.
 */
import sharp from 'sharp'

// The lit face of the source art sits at L≈0.55; normalising against that
// puts the brightest lime exactly on the accent and lets everything darker
// fall away proportionally.
const SOURCE_PEAK_L = 0.55

// Endpoints of the indigo ramp, as HSL. The light end is #6366f1 — the same
// --accent the rest of the site uses — so the mark matches the buttons.
const RAMP = {
  hue: 239,
  darkL: 0.14,
  lightL: 0.67,
  darkS: 0.45,
  lightS: 0.84,
}

// Where the white "Freelance" lettering lands: --ink from main.css.
const INK = [30, 41, 59]

function rgbToHsl(r, g, b) {
  r /= 255
  g /= 255
  b /= 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const l = (max + min) / 2
  const d = max - min

  if (!d) return [0, 0, l]

  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
  let h

  if (max === r) h = (g - b) / d + (g < b ? 6 : 0)
  else if (max === g) h = (b - r) / d + 2
  else h = (r - g) / d + 4

  return [h * 60, s, l]
}

function hslToRgb(h, s, l) {
  h = ((h % 360) + 360) % 360

  const c = (1 - Math.abs(2 * l - 1)) * s
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = l - c / 2

  let rgb
  if (h < 60) rgb = [c, x, 0]
  else if (h < 120) rgb = [x, c, 0]
  else if (h < 180) rgb = [0, c, x]
  else if (h < 240) rgb = [0, x, c]
  else if (h < 300) rgb = [x, 0, c]
  else rgb = [c, 0, x]

  return rgb.map((v) => Math.round((v + m) * 255))
}

const lerp = (a, b, t) => a + (b - a) * t

async function recolour(source, destination) {
  const { data, info } = await sharp(source)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  for (let i = 0; i < data.length; i += 4) {
    // Fully transparent pixels carry junk colour; touching them would
    // fringe the edges when the image is scaled.
    if (data[i + 3] === 0) continue

    const [, s, l] = rgbToHsl(data[i], data[i + 1], data[i + 2])

    if (s < 0.15) {
      // Achromatic. The light end is the white "Freelance" wordmark, which
      // has to become readable; genuinely dark pixels are already shadow and
      // are left to the ramp below.
      if (l > 0.6) {
        data[i] = INK[0]
        data[i + 1] = INK[1]
        data[i + 2] = INK[2]
        continue
      }
    }

    const t = Math.min(1, l / SOURCE_PEAK_L)
    const [r, g, b] = hslToRgb(
      RAMP.hue,
      lerp(RAMP.darkS, RAMP.lightS, t),
      lerp(RAMP.darkL, RAMP.lightL, t),
    )

    data[i] = r
    data[i + 1] = g
    data[i + 2] = b
  }

  await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
    .png({ compressionLevel: 9 })
    .toFile(destination)

  console.log(`${destination}  (${info.width}x${info.height})`)
}

await recolour('public/LogoUCNFreelance.png', 'public/LogoNextStep.png')
await recolour('public/LogoUCNFreelanceMini.png', 'public/LogoNextStepMini.png')
