function blockChain(data, prev = { index: 0, hash: '0' }) {
    let obj = {
        data,
        prev,
    };
    
    // Increment the index for the new block
    obj.index = obj.prev.index + 1;

    // Calculate the hash for the new block using hashCode function
    obj.hash = hashCode(obj.index + prev.hash + JSON.stringify(data));

    // Define the chain function for creating the next block
    obj.chain = (data) => blockChain(data, obj);

    return obj;
}
