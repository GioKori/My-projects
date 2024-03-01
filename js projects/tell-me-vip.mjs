import { readdir, readFile, writeFile } from "fs/promises";

try {
    const path = process.argv[2] ?? '.';
    const filenames = (await readdir(path)).filter(filename => filename.endsWith('.json'));
    const filesReadingPromise = filenames.map(file => readFile(`${path}/${file}`));
    let vips = [];
    for (let i = 0; i < filesReadingPromise.length; i++) {
        let yes = await filesReadingPromise[i].then(content => JSON.parse(content).answer === 'yes');
        if (yes) vips.push(filenames[i].split('.')[0].split('_').reverse().join(' '))
    }

    vips = vips.sort((a, b) => a < b ? -1 : (a > b ? 1 : 0))
    vips = vips.map((guest, i) => `${i + 1}. ${guest}`).join('\n')
    await writeFile(`vip.txt`, vips)
} catch (e) { console.error(e); }