
 
 /**
 * Global
 *
 */

'use strict';

window.general = () => {
    return {
        scoreList: [],
        currentLeaders: [],
        top_3: [],
        init() {
            const url_full = new URL('http://localhost:8000/get-ranking')

            fetch(url_full).then(response => {
                if(response.status === 200) return response.json();
            }).then(json_data => {
                this.scoreList = json_data;
                return this.scoreList;
            })

        },

        get_top_3() {
            const top_3 = this.scoreList;

            top_3 = top_3.filter((player, index)  => index <= 2)

            console.log(top_3);
        },

        sortList() {
            this.scoreList.sort(function (a, b) {
                return (b.wins - b.losses) - (a.wins - a.losses);
            })
        },

        addWin(index, currentScore) {
            this.scoreList[index].wins = currentScore + 1;
            this.currentLeaders = this.scoreList[0];
        },

        addLoss(index, currentScore) {
            this.scoreList[index].losses = currentScore + 1;
        },

        calc_win_loss_percentage(wins, losses) {
            const total_games = wins + losses;
            if(total_games > 0) {
                return parseFloat(wins / total_games * 100).toFixed(0);
            } else {
                return '-';
            }
        }
    } // End return
};
