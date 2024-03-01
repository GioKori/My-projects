const DNAtoRNA = {
  G: "C",
  C: "G",
  T: "A",
  A: "U",
};

const RNAtoDNA = {
  C: "G",
  G: "C",
  A: "T",
  U: "A",
};

function DNA(rna) {
    return rna
    .split("")
    .map((ncleotide) => RNAtoDNA[ncleotide])
    .join("");
}

function RNA(dna) {
    return dna
    .split("")
    .map((ncleotide) => DNAtoRNA[ncleotide])
    .join("");
}