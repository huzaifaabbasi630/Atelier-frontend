const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * 🎨 ATELIER 3D RUNNER (ZERO-DEP)
 * FOR MAXIMUM RELIABILITY + PERFORMANCE
 */

const inputDir = path.join(__dirname, '../public/models');
const outputDir = path.join(__dirname, '../public/models/compressed');

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

async function compressModels() {
    console.log('\n🚀 Starting Atelier 3D Runner (NPX Engine)...\n');

    try {
        if (!fs.existsSync(inputDir)) {
            console.warn('⚠️  /public/models directory missing. Please run downloadModels.cjs first.');
            return;
        }

        const files = fs.readdirSync(inputDir).filter(file => file.endsWith('.glb'));

        if (files.length === 0) {
            console.warn('⚠️  No .glb models found in /public/models.');
            return;
        }

        for (const file of files) {
            const inputPath = path.join(inputDir, file);
            const outputPath = path.join(outputDir, file);

            const stats = fs.statSync(inputPath);
            const originalSizeMB = (stats.size / (1024 * 1024)).toFixed(2);

            process.stdout.write(`📦 Compressing ${file} (${originalSizeMB} MB)...`);

            try {
                // Using npx for gltf-pipeline - zero local installation needed
                const command = `npx -y gltf-pipeline -i "${inputPath}" -o "${outputPath}" -d --draco.compressionLevel 10`;
                execSync(command, { stdio: 'pipe' });

                const outStats = fs.statSync(outputPath);
                const compressedSizeMB = (outStats.size / (1024 * 1024)).toFixed(2);
                const reduction = (((stats.size - outStats.size) / stats.size) * 100).toFixed(1);

                process.stdout.write(` ✅ Done: ${compressedSizeMB} MB (${reduction}% reduction)\n`);
            } catch (cmdErr) {
                process.stdout.write(` ❌ Failed (npx issue): ${cmdErr.message.slice(0, 50)}...\n`);
            }
        }

        console.log('\n✨ All models processed successfully!\n');
    } catch (err) {
        console.error('❌ Runner Error:', err.message);
    }
}

compressModels();
