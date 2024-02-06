package data

import (
	"encoding/json"
	"log"
	"net/http"
)

type Link struct {
	Artists string `json:"artists"`
}

type Artists_struct struct {
	Id              int      `json:"id"`
	Image           string   `json:"image"`
	Name            string   `json:"name"`
	Members         []string `json:"members"`
	CreationDate    int      `json:"creationDate"`
	FirstAlbum      string   `json:"firstAlbum"`
	LocationsJson   string   `json:"locations"`
	ConcertDatesURL string   `json:"concertDates"`
	RelationsURL    string   `json:"relations"`
}

type Relation_struct struct {
	Id             int
	DatesLocations map[string][]string
}

var Main_structure []Artists_struct
var Artists_structure Artists_struct

func Populate_structs() {
	url := "https://groupietrackers.herokuapp.com/api"
	Main_structure = get_data(url)
}

func get_data(url string) []Artists_struct {
	var items Link
	var artist_items []Artists_struct

	response, err := http.Get(url)
	if err != nil {
		log.Fatal(err)
	}

	err = json.NewDecoder(response.Body).Decode(&items)
	if err != nil {
		log.Fatal(err)
	}

	data_response, err := http.Get(items.Artists)
	if err != nil {
		log.Fatal(err)
	}
	defer response.Body.Close()

	err = json.NewDecoder(data_response.Body).Decode(&artist_items)
	if err != nil {
		log.Fatal(err)
	}

	return artist_items
}
