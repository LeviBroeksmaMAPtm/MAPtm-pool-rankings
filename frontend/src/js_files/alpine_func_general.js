/**
 * Global
 *
 */

 'use strict';

 window.general = () => {
     return {
         scoreList: [],
         init() {

            this.get_data()

         },

         get_data() {
            const url_full = new URL('https://pb647b1zrf.execute-api.eu-central-1.amazonaws.com/api/get-ranking')

            fetch(url_full).then(response => {
                if(response.status === 200) return response.json();
            }).then(json_data => {
                this.scoreList = json_data;
                return this.scoreList;
            })
         },

         sortList() {
             this.scoreList.sort(function (a, b) {
                 return (b.wins - b.losses) - (a.wins - a.losses)
             })
         },

         add_result(id, wins, losses) {
            const url_full = new URL('https://pb647b1zrf.execute-api.eu-central-1.amazonaws.com/api/update_score')

            fetch(url_full,{
                method: 'PUT',
                headers:{
                'Content-Type':'application/json'
                },
                body: JSON.stringify(
                    {
                        "id": id,
                        "wins": wins,
                        "losses": losses
                    }
                )
            })

            this.get_data()
         },

     } // End return
 };
