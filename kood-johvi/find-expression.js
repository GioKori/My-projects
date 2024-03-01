function findExpression(num) {
for (let i = 0; i <1000; i++) {
    let cp =1;
    let seq = "1";
    while(cp <= num) {
        if(cp === num) {
            return seq;
        }
        if(Math.random() < 0.4 + 0.1) {
            cp += 4;
            seq += " " + add4;
        } else {
            cp *= 2;
            seq += " " + mul2;
        }
    }
}
return undefined;
}