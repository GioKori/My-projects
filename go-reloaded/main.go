package main

import (
	"os"
	"strconv"
	"strings"
	"unicode/utf8"
)

var arr []string

// convert letter from capital to lower
func capToLow(index int, fn func(string) string) {
	if len(arr)-1 == index {
		arr[index-1] = fn(arr[index-1])
		temparr := append(arr[:index], arr[index+1:]...)
		arr = temparr
		return
	}
	num, err := strconv.Atoi(string(arr[index+1][:len(arr[index+1])-1]))
	if err == nil {
		for i := index - 1; i >= index-int(num); i-- {
			arr[i] = fn(arr[i])
		}
		temparr := append(arr[:index], arr[index+2:]...)
		arr = temparr
	} else {
		arr[index-1] = fn(arr[index-1])
		temparr := append(arr[:index], arr[index+1:]...)
		arr = temparr
	}
}

func RemoveIndex(index, count int) {
	temparr := append(arr[:index], arr[index+count:]...)
	arr = temparr
}

// converts from hex and binary to decimal
func hexToBin(index, base int) {
	var temparr []string
	decimal, err := strconv.ParseInt(arr[index-1], base, 64)
	if err == nil {
		arr[index-1] = strconv.Itoa(int(decimal))
		if len(arr)-1 == index {
			temparr = append(arr[:0], arr[:index]...)
		} else {
			temparr = append(arr[:index], arr[index+1:]...)
		}
		arr = temparr
	}
}
func main() {
	var check bool
	content, err := os.ReadFile(os.Args[1])
	if err != nil {
		return
	}
	arr = strings.Fields(string(content))
	for i := 0; i < len(arr); i++ {
		if len(arr[i]) > 3 {
			switch arr[i][:4] {
			case "(bin":
				hexToBin(i, 2)
				i--
			case "(hex":
				hexToBin(i, 16)
				i--
			case "(cap":
				capToLow(i, strings.Title)
				i--
			case "(up,":
				capToLow(i, strings.ToUpper)
				i--
			case "(up)":
				capToLow(i, strings.ToUpper)
				i--
			case "(low":
				capToLow(i, strings.ToLower)
				i--
			}
		}
		if len(arr[i]) == 0 {
			temparr := append(arr[:i], arr[i+1:]...)
			arr = temparr
			i--
			continue
		}
		switch arr[i][0] {
		case '.', ',', '!', '?', ':', ';':
			arr[i-1] = arr[i-1] + string(arr[i][0])
			arr[i] = arr[i][1:]
			i--
			continue
		}
		switch arr[i] {
		case "a", "A":
			if strings.ContainsAny(string(arr[i+1][0]), "aeiouh") {
				arr[i] += "n"
			}
		case "an", "An":
			if !strings.ContainsAny(string(arr[i+1][0]), "aeiouh") {
				arr[i] = string(arr[i][0])
			}
		}
		lastrune, size1 := utf8.DecodeLastRune([]byte(arr[i]))
		firstrune, size2 := utf8.DecodeRuneInString(arr[i])
		if size1 < 1 && size2 < 1 {
			continue
		}
		if check && (string(firstrune) == "'" || firstrune == 8216) {
			check = false
			arr[i-1] = arr[i-1] + string(firstrune)
			arr[i] = arr[i][size2:]
			if len(arr[i]) == 0 {
				temparr := append(arr[:i], arr[i+1:]...)
				arr = temparr
				i--
			}
		} else if string(lastrune) == "'" || lastrune == 8216 {
			check = true
			if string(lastrune) == "'" {
				arr[i+1] = string(lastrune) + arr[i+1]
				arr[i] = arr[i][:len(arr[i])-1]
			} else {
				arr[i+1] = arr[i] + arr[i+1]
				arr[i] = ""
			}
			if len(arr[i]) == 0 {
				temparr := append(arr[:i], arr[i+1:]...)
				arr = temparr
			}
		} else if string(firstrune) == "'" || firstrune == 8216 {
			check = true
		} else if string(lastrune) == "'" || lastrune == 8216 {
			check = false
		}
	}
	os.WriteFile("result.txt", []byte(strings.Join(arr, " ")), 0644)
}
