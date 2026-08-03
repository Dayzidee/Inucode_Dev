const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const PROJECTS = [
  { id: 'indigent_scholars', url: 'https://indigent-scholars.vercel.app/' },
  { id: 'sam_b_tech', url: 'https://sam-b-tech.vercel.app/' },
  { id: 'vessel_eight', url: 'https://vessel-eight.vercel.app/' },
  { id: 'devbot_dialogue', url: 'https://devbot-dialogue.vercel.app/' },
  { id: 'styled_by_otis', url: 'https://styledbyotis.netlify.app/' }
];

async function capture() {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 }
  });

  const outDir = path.join(__dirname, '../public/projects');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  for (const proj of PROJECTS) {
    console.log(`Capturing ${proj.id}...`);
    try {
      await page.goto(proj.url, { waitUntil: 'domcontentloaded', timeout: 30000 });
      // wait a bit for animations
      await page.waitForTimeout(3000);
      
      // Shot 1 (Hero)
      await page.screenshot({ path: path.join(outDir, `${proj.id}_1.jpg`), type: 'jpeg', quality: 80 });
      
      // Scroll down
      await page.evaluate(() => window.scrollBy(0, 900));
      await page.waitForTimeout(1000);
      
      // Shot 2
      await page.screenshot({ path: path.join(outDir, `${proj.id}_2.jpg`), type: 'jpeg', quality: 80 });

      // Scroll down again
      await page.evaluate(() => window.scrollBy(0, 900));
      await page.waitForTimeout(1000);
      
      // Shot 3
      await page.screenshot({ path: path.join(outDir, `${proj.id}_3.jpg`), type: 'jpeg', quality: 80 });
      console.log(`Successfully captured ${proj.id}`);
    } catch (e) {
      console.error(`Failed to capture ${proj.id}:`, e);
    }
  }

  await browser.close();
}

capture();
