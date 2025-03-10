package main

import (
	"bomberman-dom/src/app"
	livechat "bomberman-dom/src/app/ws"
	"bomberman-dom/src/server"
)

func main() {
	app := app.NewApp()
	server := server.NewServer(app)
	hub := livechat.InitHub()

	hub.LaunchRoutines()
	server.Start(hub)

}
