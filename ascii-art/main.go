package main

import (
	"fmt"
	"os"
	"strings"
)

func main() {
	//
	if len(os.Args) < 2 {
		fmt.Println("Usage: go run main.go \"Your Text\"")
		return
	}
	text := os.Args[1]
	symbolsFile := "standard.txt"

	if len(os.Args) >= 3 {
		symbolsFile = os.Args[2] + ".txt"
	}
	asciiSymbols, err := ASCIISymbols(symbolsFile)
	if err != nil {
		fmt.Println("Error loading symbols:", err)
		return
	}
	PrintASCII(text, asciiSymbols)
}

func ASCIISymbols(filename string) (map[rune]string, error) {
	symbols := make(map[rune]string)
	content, err := os.ReadFile(filename)
	if err != nil {
		return nil, err
	}

	ascArtSymbols := strings.Split(string(content), "\n\n")
	// Define a sequence of ASCII characters
	asciiCharachters := " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~"

	for i, asciiChar := range asciiCharachters {
		if i < len(ascArtSymbols) {
			symbols[rune(asciiChar)] = ascArtSymbols[i]
		}
	}

	symbols[' '] = strings.Join([]string{
		"  ",
		"  ",
		"  ",
		"  ",
		"  ",
		"  ",
		"  ",
		"  ",
	}, "\n")
	return symbols, nil
}

func PrintASCII(text string, asciiSymbols map[rune]string) {
	asciiLine := make([]string, 8)
	prevLine := false
	if text == "" {
		return
	}
	lines := strings.Split(text, "\\n")
	for _, line := range lines {
		if line == "" {

			if !prevLine {
				fmt.Println() // empty line for "\\n"
			}
			prevLine = true
		} else {
			prevLine = false

			for _, char := range line {
				if asciiArt, found := asciiSymbols[char]; found {
					artLines := strings.Split(asciiArt, "\n")
					for i, artLine := range artLines {
						// Add a space between characters
						asciiLine[i] += artLine + ""
					}
				} else {
					fmt.Println("Character not found.")
					return
				}
			}
			// Print the concatenated ascii art lines for the line
			for _, artLine := range asciiLine {
				fmt.Println(artLine)
			}
			// Reset for the next line
			asciiLine = make([]string, 8)
		}
	}
}
