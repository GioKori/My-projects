package main

import (
	"bufio"
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"
	"text/template"
)

func main() {
	fs := http.FileServer(http.Dir("static"))
	http.Handle("/static/", http.StripPrefix("/static/", fs))
	http.HandleFunc("/", mainHandler)
	http.HandleFunc("/ascii-art", asciiHandler)
	http.HandleFunc("/export", exportHandler)
	fmt.Println("server started at: http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}

func exportHandler(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != "/export" {
		http.Error(w, "404 - not found", http.StatusNotFound)
		return
	}
	switch r.Method {
	case "POST":
		content := r.FormValue("outputText")
		w.Header().Set("Content-Type", "text/plain")
		w.Header().Set("Content-Disposition", "attachment; filename=export.txt")
		w.Write([]byte(content))
	}
}

type PageData struct {
	Result string
}

func asciiHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	if r.Method != http.MethodPost {
		http.Error(w, "400 Bad Request", http.StatusBadRequest)
		return
	}
	if err := r.ParseForm(); err != nil {
		// handle error (400)
		http.Error(w, fmt.Sprintf("ParseForm() err: %v", err), http.StatusBadRequest)
		return
	}
	// get the values from the form
	inputText := r.FormValue("inputText")
	font := r.FormValue("font")
	fontsDir := "templates/"
	fontFilePath := fontsDir + font
	if _, err := os.Stat(fontFilePath); os.IsNotExist(err) {
		// handle error (404)
		http.Error(w, "Font file not found", http.StatusNotFound)
		return
	}
	textToPrint := strings.Join(ascii(inputText, fontFilePath), "\n")
	data := PageData{
		Result: textToPrint,
	}
	tmpl, err := template.ParseFiles("static/asciipage.html")
	if err != nil {
		http.Error(w, "404 Not Found", http.StatusNotFound)
		return
	}
	if err := tmpl.Execute(w, data); err != nil {
		// handle error (500)
		http.Error(w, fmt.Sprintf("Template execution error: %v", err), http.StatusInternalServerError)
		return
	}
}

func mainHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	tmpl, err := template.ParseFiles("static/home.html")
	if err != nil {
		http.Error(w, "404 Not Found", http.StatusNotFound)
		return
	}
	data := struct{}{}
	if err := tmpl.Execute(w, data); err != nil {
		http.Error(w, "500 Internal Server Error", http.StatusInternalServerError)
		return
	}
}
func ascii(user_input string, font string) []string {
	const max_lines = 9
	file := get_file(font)
	text_lines := count_lines(user_input)
	lines := scan_lines(file)
	text_slice := make([]string, text_lines*max_lines)
	user_input = strings.ReplaceAll(user_input, "\r\n", "\n")
	result := process_input(user_input, text_slice, lines, max_lines)
	return result
}
func count_lines(text string) int {
	// Count how many lines were in the input text
	count := 1
	count += strings.Count(text, "\n")
	return count
}
func process_input(user_input string, text_slice []string, lines []string, max_lines int) []string {
	line_counter := 0
	for index, symbol := range user_input {
		if symbol == '\n' {
			line_counter++
		} else if symbol == '\\' && index+1 < len(user_input) && user_input[index+1] == 'n' {
			text_slice = add_to_text_slice(text_slice, lines, '\\', max_lines, line_counter)
		} else {
			text_slice = add_to_text_slice(text_slice, lines, symbol, max_lines, line_counter)
		}
	}
	return text_slice
}
func add_to_text_slice(text_slice []string, lines []string, symbol rune, max_lines int, line_counter int) []string {
	ascii_offset := 32
	letter_height := 9
	if symbol < ' ' || symbol > '~' {
		text_slice = []string{"400 bad request"}
		return text_slice
	}
	multiplier := int(symbol) - ascii_offset
	gap := letter_height * multiplier
	if gap < 0 || gap >= len(lines) {
		text_slice = []string{"400 bad request"}
		return text_slice
	}
	line_ignore := line_counter * max_lines
	for i := 0; i < max_lines; i++ {
		if line_ignore+i < len(text_slice) && gap+i < len(lines) {
			text_slice[line_ignore+i] += lines[gap+i]
		}
	}
	return text_slice
}
func get_file(font_file string) *os.File {
	file, err := os.Open(font_file)
	if err != nil {
		log.Fatal(err)
	}
	return file
}

// function reads text from file and returns it as a slice of strings
func scan_lines(file *os.File) []string {
	defer file.Close()
	scanner := bufio.NewScanner(file)
	var lines []string
	for scanner.Scan() {
		lines = append(lines, scanner.Text())
	}
	if err := scanner.Err(); err != nil {
		log.Fatal(err)
	}
	return lines
}
