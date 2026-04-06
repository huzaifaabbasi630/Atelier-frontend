const fs = require('fs');
const path = require('path');
const { Readable } = require('stream');
const { finished } = require('stream/promises');

/**
 * 📥 ZERO-DEPENDENCY DOWNLOADER
 * USES NATIVE FETCH (NODE 18+)
 */

const models = [
    { name: 'shirt.glb', url: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb' },
    { name: 'chair.glb', url: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/SheenChair/glTF-Binary/SheenChair.glb' },
    { name: 'shoe.glb', url: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/MaterialsVariantsShoe/glTF-Binary/MaterialsVariantsShoe.glb' }
];

const downloadDir = path.join(__dirname, '../public/models');
if (!fs.existsSync(downloadDir)) {
    fs.mkdirSync(downloadDir, { recursive: true });
}

async function downloadFile(url, fileName) {
    const filePath = path.join(downloadDir, fileName);
    if (fs.existsSync(filePath)) {
        console.log(`✅ ${fileName} already exists.`);
        return;
    }

    console.log(`📥 Downloading ${fileName}...`);
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const fileStream = fs.createWriteStream(filePath);
        await finished(Readable.fromWeb(response.body).pipe(fileStream));
        
        console.log(`✅ Saved ${fileName}`);
    } catch (err) {
        console.error(`❌ Failed ${fileName}:`, err.message);
    }
}

async function main() {
    process.stdout.write('📦 Starting Atelier Asset Sync (Zero-Dep Mode)...\n');
    for (const model of models) {
        await downloadFile(model.url, model.name);
    }
    console.log('\n✨ Asset sync complete!');
}

main();
