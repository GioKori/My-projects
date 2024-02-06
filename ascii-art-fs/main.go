package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func main() {
	if len(os.Args) <=1 || len(os.Args) > 3 {
		fmt.Println("USAGE:go run . [STRING] [BANNER]")
		os.Exit(0)
	}

	n := os.Args[1]
	n = strings.ReplaceAll(n, "\\n", "\n")

	asciiArt := AsciiGenerator(n)

	fmt.Println(asciiArt)

}

func asciiS() map[rune][]string {
	var filetoOpen string
	if len(os.Args) == 3 {
		filetoOpen = os.Args[2]
	} else  {
		filetoOpen = "standard"
	}

	file, err := os.Open(filetoOpen + ".txt")
	if err != nil {
		fmt.Println(err)
	}

	defer file.Close()

	scanner := bufio.NewScanner(file)
	scanner.Scan()
	ascMap := make(map[rune][]string)
	for i := 32; i <= 126; i++ {
		var line []string

		for k := 0; k < 8; k++ {
			if scanner.Scan() {
				line = append(line, scanner.Text())
			}
		}
		ascMap[rune(i)] = line
		scanner.Scan()
	}
	return ascMap
}

func AsciiGenerator(text string) string {
	ascii := asciiS()
	var input []string
	for _, i := range text {
		input = append(input, string(i))
	}

	var lines [8]string
	var result strings.Builder

	for a := 0; a < len(input); a++ {
		if a > 0 && input[a] == "\n" && input[a-1] == "\n" {
			result.WriteString("\n")
		} else if input[a] == "\n" {
			for _, layer := range lines {
				result.WriteString(layer + "\n")
			}
			lines = [8]string{}
			continue
		}
		if art, exists := ascii[rune(input[a][0])]; exists {
			for j, line := range art {
				lines[j] += line
			}
		}
	}
	for _, layer := range lines {
		result.WriteString(layer + "\n")
	}
	return strings.TrimSuffix(result.String(), "\n")
}
