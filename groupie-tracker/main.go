package main

import (
	"fmt"
	"groupie-tracker/data"
	"groupie-tracker/handlers"
	"log"
	"net/http"
)

func main() {
	// Run server, register the handler function for the root ("/")
	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("static"))))

	data.Populate_structs()
	http.HandleFunc("/", handlers.Main_page)
	http.HandleFunc("/artist/", handlers.Artists_handler)
	

	fmt.Println("Starting server: http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
