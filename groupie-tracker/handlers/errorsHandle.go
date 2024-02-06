package handlers

import (
	"fmt"
	"net/http"
)

func Handle404(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusFound)
	fmt.Fprint(w, "404 Not Found")
}

func Handle500(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusNotFound)
	fmt.Print(w, "500 Not Found")
}

func Handle400(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusNotFound)
	fmt.Print(w, "400 Not Found")
}
