from chalice import Chalice, Response
import logging
import json

from chalicelib.functions_aws import get_secret

from chalicelib.functions_postgresql import (
    select_all,
    update,
)

# logging
logger = logging.getLogger()
logger.setLevel(logging.DEBUG)

# app
app = Chalice(app_name="poolranking-backend")
app.debug = True

DB_PARAMS = get_secret("pool_ranking")


@app.route("/", cors=True)
def index():
    message = "This is an API written for the MAPtm Pool Rankings. This code has been written by Levi Broeksma"

    return Response(body=json.dumps(message), status_code=200)


@app.route("/get-ranking", cors=True)
def get_ranking():
    sql = "SELECT id, player, wins, losses, image FROM scores;"

    db_response = select_all(DB_PARAMS, sql)

    if not db_response[1]:
        return Response(body=None, status_code=400)
    elif db_response[1] and db_response[1] == 500:
        return Response(body=json.dumps(db_response[0]), status_code=db_response[1])
    elif db_response[1] and db_response[1] != 200:
        return Response(body=None, status_code=db_response[1])
    else:
        pass

    # creating list from tupels
    standings_to_return = []

    for row in db_response[0]:
        row = {
            "id": row[0],
            "player": row[1],
            "wins": row[2],
            "losses": row[3],
            "image": row[4],
        }
        standings_to_return.append(row)

    return_list = sorted(
        standings_to_return, key=lambda k: (k["wins"] - k["losses"]), reverse=True
    )

    return Response(body=json.dumps(return_list), status_code=200)


@app.route("/update_score", methods=["PUT"], cors=True)
def update_score():
    body = app.current_request.json_body

    id = body["id"]
    wins = body["wins"]
    losses = body["losses"]

    sql = "SELECT id, player, wins, losses, image FROM scores;"

    db_response = select_all(DB_PARAMS, sql)

    if not db_response[1]:
        return Response(body=None, status_code=400)
    elif db_response[1] and db_response[1] == 500:
        return Response(body=json.dumps(db_response[0]), status_code=db_response[1])
    elif db_response[1] and db_response[1] != 200:
        return Response(body=None, status_code=db_response[1])
    else:
        pass

    # creating list from tupels
    standings_to_return = []

    for row in db_response[0]:
        row = {
            "id": row[0],
            "player": row[1],
            "wins": row[2],
            "losses": row[3],
            "image": row[4],
        }
        standings_to_return.append(row)

    for row in standings_to_return:
        if id == row["id"] and wins != row["wins"]:
            sql = """
                UPDATE
                    scores
                SET wins = data.wins
                FROM
                    (VALUES %s) AS data (wins, body_id)
                WHERE
                    "id" = data.body_id RETURNING "id";"""

            # update_values must be a list within a list
            update_values = [
                [wins, id]
            ]

            db_response = update(DB_PARAMS, sql, update_values)

        if id == row["id"] and losses != row["losses"]:
            sql = """
                UPDATE
                    scores
                SET losses = data.losses
                FROM
                    (VALUES %s) AS data (losses, body_id)
                WHERE
                    "id" = data.body_id RETURNING "id";"""

            # update_values must be a list within a list
            update_values = [
                [losses, id]
            ]

            db_response = update(DB_PARAMS, sql, update_values)

        if id == row["id"]:
            break

    return Response(body="update", status_code=200)
