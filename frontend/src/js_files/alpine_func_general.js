/**
 * Global
 *
 */

'use strict';

window.general = () => {
    return {
        scoreList: [],
        currentLeaders: [],
        init() {
            let standings = [
            { player: "Martijn", wins: 5, losses: 1, image: "https://maptm.nl/wp-content/uploads/2021/03/2-1.png" }, 
            { player: "Wim", wins: 3, losses: 3, image: "https://maptm.nl/wp-content/uploads/2021/03/11.png" }, 
            { player: "Mark", wins: 1, losses: 0, image: "https://maptm.nl/wp-content/uploads/2021/03/18.png" },
            { player: "Leeroy", wins: 0, losses: 0 }, 
            { player: "Levi", wins: 0, losses: 0, image: "https://maptm.nl/wp-content/uploads/2021/09/Artboard-29-copy.png" }, 
            { player: "Marieke", wins: 0, losses: 0, image: "https://maptm.nl/wp-content/uploads/2021/03/7.png" }, 
            { player: "Dennis", wins: 0, losses: 0, image: "https://maptm.nl/wp-content/uploads/2021/03/Dennis-scaled-420x380.jpg" }, 
            { player: "Koen", wins: 0, losses: 0, image: "https://maptm.nl/wp-content/uploads/2021/03/Artboard-29-1.png" }, 
            { player: "Floris", wins: 0, losses: 0, image: "https://maptm.nl/wp-content/uploads/2021/07/floris-scaled-420x380.jpg" }, 
            { player: "Rick", wins: 0, losses: 0, image: "https://maptm.nl/wp-content/uploads/2021/03/rick-scaled-420x380.jpg" }, 
            { player: "Gregor", wins: 0, losses: 0, image: "https://maptm.nl/wp-content/uploads/2021/03/Gregor-scaled-420x380.jpg" }, 
            { player: "Angelo", wins: 0, losses: 0, image: "https://maptm.nl/wp-content/uploads/2021/03/16.png" }, , 
            { player: "Jaap", wins: 0, losses: 0, image: "https://maptm.nl/wp-content/uploads/2021/03/3-1.png" }, 
            { player: "Audrey", wins: 0, losses: 0, image: "https://maptm.nl/wp-content/uploads/2021/03/17.png" }, 
            { player: "Steven", wins: 0, losses: 0, image: "https://maptm.nl/wp-content/uploads/2021/03/14.png" }, 
            { player: "Anton", wins: 0, losses: 0, image: "https://maptm.nl/wp-content/uploads/2021/03/4-1.png" }, 
            { player: "Bart", wins: 0, losses: 0, image: "https://maptm.nl/wp-content/uploads/2021/03/15.png" }, 
            { player: "Bert", wins: 0, losses: 0, image: "https://maptm.nl/wp-content/uploads/2021/03/6.png" }, 
            { player: "Frank", wins: 0, losses: 0, image: "https://maptm.nl/wp-content/uploads/2021/09/Frank-scaled-420x380.jpg" }, 
            { player: "Giovanni", wins: 0, losses: 0, image: "https://maptm.nl/wp-content/uploads/2021/03/9.png" }, 
            { player: "Guido", wins: 0, losses: 0, image: "https://maptm.nl/wp-content/uploads/2021/03/8.png" }, 
            { player: "Tessel", wins: 0, losses: 0, image: "https://maptm.nl/wp-content/uploads/2021/03/12.png" }, 
            { player: "Nuno", wins: 0, losses: 0, image: "https://maptm.nl/wp-content/uploads/2021/03/1-1.png" }, 
            { player: "Susan", wins: 0, losses: 0, image: "https://maptm.nl/wp-content/uploads/2021/02/susan-scaled-420x380.jpg" }, 
            { player: "Luc", wins: 0, losses: 0, image: "https://maptm.nl/wp-content/uploads/2021/03/Luc-scaled-420x380.jpg" }]

            standings.sort(function (a, b) {
                return (b.wins - b.losses) - (a.wins - a.losses)
            })

            // appending data to scoreList
            this.scoreList = standings

        },

        sortList() {
            this.scoreList.sort(function (a, b) {
                return (b.wins - b.losses) - (a.wins - a.losses)
            })
        },

        addWin(index, currentScore) {
            this.scoreList[index].wins = currentScore + 1
            this.currentLeaders = this.scoreList[0]

        },

        addLoss(index, currentScore) {
            this.scoreList[index].losses = currentScore + 1
        },

        calc_win_loss_percentage(wins, losses) {
            const total_games = wins + losses;
            console.log(total_games);
            if(total_games > 0) {
                return parseFloat(wins / total_games * 100).toFixed(0)
            } else {
                return '-'
            }
        }
    } // End return
};
