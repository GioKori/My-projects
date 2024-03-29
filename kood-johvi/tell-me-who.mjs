import { readdir } from "fs/promises";
try {
    const path = process.argv[2] ?? '.';
    const filenames = await readdir(path);
    let guests =filenames.map((filename) => filename.split('.')[0].split('_').reverse().join(' '));
        
        // filenames.map((filename, i) => {
        //     const guest =filename.split('.json')[0].split('_');
        //     return `${guest[1]} ${guest[0]}`
        // })
    guests = guests.sort((a, b) =>a<b?-1:(a>b?1:0))
    guests = guests.map((guest,i)=>`${i + 1}. ${guest}`).join('\n')
        console.log(guests);
}

catch (e) { console.error(e); }