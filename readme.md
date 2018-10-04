
/code
  /api            - API queries
  /utils          - Functions used to populate the result concept of each action
  SearchMovie.js
  SelectMovie.js
  SearchShowtimesByTheater.js

/models

**/actions
    SearchMovie               - Action to search information about a movie given it's title
                              - Input params: a movie title
    SelectMovie               - Action to select a movie in a list of results.
                              - Follow-up of the SearchMovie action.
                              - Input params: index of the selected movie
    SearchShowtimesByTheater  - Action to search for showtimes of a given movie in a given theater.
                              - Input params: a movie title and the name of a movie theater

**/concepts

--  /ActionParams
      SearchMovieResults               - Inputs and outputs of the SearchMovie action
      SelectMovieResults               - Inputs and outputs of the SelectMovie action
      SearchShowtimesByTheaterResults  - Inputs and outputs of the SearchShowtimesByTheater action
      SelectIndex                      - Index of the selected element in a list (for Select actions)
      ResultStatus                     - Output status of an action (used for all actions)

--  /Connections  - List concepts: movies, theaters, cast/credit members, user/press reviews
--  /Movie        - All concepts used in the Movie concept
--  /Theater      - All concepts used in the Theater concept
--  /Person       - All concepts used in the Person concept
--  /commons      - Common concepts used in many other ones
--  /enums        - Vocabulary concepts

/ressources
**/base
**/fr-FR
--  training

--  /view    - input-view files for users to input missing information during an action
             - result-view files determining how to render the results of each action

--  /layout  - Results rendering

--  /dialog
      /enums           - Dialog fragments of type Value associated with each enum concept (/models/enums)
      /actions         - Dialog events displaying the state of actions (Progress, NoResult)
      nlg_strings.bxb  - Bixby's responses to the user's requests (event dialogs)
      ui_strings.bxb   - Texts appearing in the user interface

--  /vocab   - Training vocabulary associated with each enum concept (see /models/enums)
