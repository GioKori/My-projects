import { readdir } from "fs/promises";

try {
    const path = process.argv[2]??'.';
    console.log((await readdir(path)).length);
}
catch (e) {console.error(e);}