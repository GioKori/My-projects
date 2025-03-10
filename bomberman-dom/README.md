# 💣 Bomberman-dom

## Introduction

Here is a simple implementation of a multiplayer version of the well-known game bomberman, released in 1983. Upon registering with a username, player is taken to a waiting room until 1 - 3 other players join the game. Then, use your arrow keys to navigate the map and space bar to detonate bombs. Collect power-ups along the way. First play to clear the board without getting caught in another player's bomb wins.

**Note for autitors**: *You may test the game by creating a user, then opening the URL in another browser window and create another user. Otherwise you will be stuck in waiting room.*

## Instructions

1. Clone the repository: `git clone <repo name>`
2. Navigate into project directory: `cd bomberman-dom`
3. From project root, execute `go run .`
4. From client-dom folder, open index.html and launch your live server to begin playing!

## Folder Logic
root/
└── **client-dom/**
    ├── **fw/**: folder for framework-related assets
    │   └── **blocks/**: interactive UI framework where reusable elements (forms, inputs, and dynamic components) manage real-time updates, interactions, and communication with backend
    │   └── **components/**: class creates an interactive form that collects a username, 
    │   └── **routinglogic/**: maps URL paths to specific components or callbacks, dynamically updating the view without reloading (Single Page Application)
    │   └── **runner/**
    │   └── **ws**
    ├── **static/**
    │   **└── img/**
    ├── **index.html**: main entry point of application
    └── **main.js**: handles client-side logic 
    └── **src/**:
       └── **app/**
       └── **server/**
       └── **store/**
   └── **main.go**: initialize app, set up server, launch live chat 


## Features
- **Vanilla Javascript**
- **Gorilla Websocket** for real-time communication
- No frame drops, and proper use of requestAnimationFrame which is maintained at 60fps
- No use of Canvas or any other framework which is not self-made


## Authors
- [Kawtar Bennani (kbennani)](https://01.kood.tech/git/kbennani)
