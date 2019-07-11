# MLB-server
[![NodeJS](https://img.shields.io/badge/Node-v10.15.3-green.svg)](https://nodejs.org/en/)
[![Maintenance](https://img.shields.io/badge/Maintained-Yes-green.svg)](https://nodejs.org/en/)
[![GitHub issues](https://img.shields.io/github/issues/pawptart/trivia-hero.svg)](https://GitHub.com/pawptart/MLB-server/issues/)

Server for MLB API scraped up by [MLB-scraper](https://github.com/pawptart/MLB-scraper).

You can see data for a given day's baseball games and retrieve scores, stats, pitching data, and location as well as other information usefull to recreate box scores. MLB-server returns data as a convenient JSON object.

MLB-server is built to provide an API for the [MiniTron](https://github.com/pawptart/MiniTron) project, an attempt at making a miniature JumboTron just like you'd find at a real MLB game!

#### Some Limitations
MLB-server gets its data from Baseball-Reference.com, and as such, it does not have the current day's scores. The scraper runs nightly and was started in late June 2019, so no data exists before that. 

## Calling the API

MLB-server uses a publicly available interface and does not require user authentication. Anyone can request game data at any time.

You can find the base URL at: ```https://mlb-api-server.herokuapp.com/api/games```.

### API calls for day's games

See below for an example of a game entry in the database: 

```https://mlb-api-server.herokuapp.com/api/games/7/2/2019```

```
{
    "_id": "5d1c7ccb3b787f001e45258f",
    "date": {
        "year": 2019,
        "month": 7,
        "day": 2
    },
    "games_played": true,
    "games": [
        {
            "game": {
                "winning_team": {
                    "name": "Milwaukee Brewers",
                    "runs": 8,
                    "winning_pitcher": {
                        "name": "Alex Claudio",
                        "record": {
                            "wins": 2,
                            "losses": 2
                        }
                    },
                    "save_pitcher": {
                        "name": "Jeremy Jeffress",
                        "saves": 1
                    }
                },
                "losing_team": {
                    "name": "Cincinnati Reds",
                    "runs": 6,
                    "losing_pitcher": {
                        "name": "David Hernandez",
                        "record": {
                            "wins": 2,
                            "losses": 4
                        }
                    }
                },
                "played_at": {
                    "home_team": "Cincinnati Reds",
                    "away_team": "Milwaukee Brewers",
                    "location": "Great American Ballpark"
                },
                "total_innings": 9
            }
        },
        . . .
    ]
}
```

#### Retrieve a day's games ```GET: /api/games/{month}/{day}/{year}``` 

*Retrieves a day's entry based on the date provided.* 

**Required Parameters** | **Description**
---|---
month | 1 or 2 digit month (i.e. September is represented as 9, not 09). *Integer*
day | 1 or 2 digit day (i.e. the 7th is represented as 7, not 07). *Integer*
year | 4 digit year. *Integer*

If a game was not played on a given day, then the `games` array will be returned as an empty array and the `games_played` key will be returned as `false`.
