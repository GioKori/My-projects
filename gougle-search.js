// Create a function named queryServers that takes 2 arguments:

// serverName: a string of the name of the server.
// q: a string of the query given by the user.
// You need to construct 2 urls which should work like this:

// queryServers('pouet', 'hello+world')
// // return the fastest of those 2 calls:
// // -> getJSON('/pouet?q=hello+world')
// // -> getJSON('/pouet_backup?q=hello+world')
// Create a function named: gougleSearch that takes a single query argument (q). It must invoke queryServers concurrently on 3 servers:

// "web"
// "image"
// "video"
// You must return the value from each server in an object using the server name as key.

// A timeout of 80milliseconds must be set for the whole operation, if it is not complete within 80 milliseconds, then you must return Error('timeout').

// Code provided
// The provided code will be added to your solution, and does not need to be submitted.

// // fake `getJSON` function
// let getJSON = async (url) => url



async function queryServers(serverName, q) {
    var url = '/' + serverName + '?q=' + q;
    var backupUrl = '/' + serverName + '_backup?q=' + q;
    const req1 = getJSON(url);
    const req2 = getJSON(backupUrl);
    const res = await Promise.race([req1, req2]);
    return res;
}

async function gougleSearch(q) {
    var timeout = new Promise((resolve) =>
        setTimeout(resolve, 80, Error('timeout'))
    );
    var web = queryServers('web', q),
        image = queryServers('image', q),
        video = queryServers('video', q);

    const res = await Promise.race([timeout, Promise.all([web, image, video])]);
    if (res instanceof Error) {
        throw res;
    }
    return { image: res[1], video: res[2], web: res[0] };
}