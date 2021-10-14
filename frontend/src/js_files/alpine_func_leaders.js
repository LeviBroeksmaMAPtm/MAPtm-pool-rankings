/**
 * Global
 *
 */

'use strict';

window.leaders = () => {
  return {

    full_player_aray: [],

    currentLeaders: [],

    init() {
      this.get_every_hour()
    },

    calc_win_loss_percentage(wins, losses) {
      const total_games = wins + losses;
      if (total_games > 0) {
        return parseFloat(wins / total_games * 100).toFixed(0)
      } else {
        return '-'
      }
    },

    get_data() {
      const url_full = new URL('https://pb647b1zrf.execute-api.eu-central-1.amazonaws.com/api/get-ranking')

      fetch(url_full).then(response => {
        if (response.status === 200) return response.json();
      }).then(json_data => {
        const temp = json_data;
        temp[0].position = "/positions/first.svg"
        temp[1].position = "/positions/second.svg"
        temp[2].position = "/positions/third.svg"
        this.currentLeaders = temp.slice(0, 3)
        return this.currentLeaders;
      })
    },

    get_every_hour() {
      setInterval(this.get_data(), 1000 * 60 * 60)
    }

  } // End return
};
