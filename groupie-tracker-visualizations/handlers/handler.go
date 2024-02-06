package handlers

import (
	"encoding/json"
	"groupie-tracker-visualizations/data"
	"log"
	"net/http"
	"strconv"
	"strings"
	"text/template"
)

// Define a handler function to respond to incoming HTTP requests.
func Main_page(w http.ResponseWriter, r *http.Request) {
	tmpl, err := template.ParseFiles("templates/index.html")
	if err != nil {
		http.Error(w, "404 not found", http.StatusNotFound)
	}
	if r.URL.Path != "/"{
		http.Error(w, "404 not found", http.StatusBadRequest)
		return
    }

	tmpl.Execute(w, data.Main_structure)
}

func Artists_handler(w http.ResponseWriter, r *http.Request) {
	var relations data.Relation_struct
	parts := strings.Split(r.URL.Path, "/")
	if len(parts) < 3 {
		http.Error(w, "Invalid request", http.StatusBadRequest)
		return
	}
	band_id := parts[2]
	artist_id, err := strconv.Atoi(band_id)
	if err != nil {
		log.Fatal("Error:", err)
	}

	tmpl, err := template.ParseFiles("templates/artist.html")
	if err != nil {
		http.Error(w, "404 not found", http.StatusNotFound)
	}

	artist_data := data.Main_structure[artist_id-1]
	relation_url := artist_data.RelationsURL

	rel, err := http.Get(relation_url)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
	defer rel.Body.Close()

	if err := json.NewDecoder(rel.Body).Decode(&relations); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	final_data := struct {
		Artist    data.Artists_struct
		Relations data.Relation_struct
	}{
		Artist:    artist_data,
		Relations: relations,
	}
	tmpl.Execute(w, final_data)
}
