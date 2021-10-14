# import psycopg2


# def connect_to_DB():
#     con = psycopg2.connect(
#         database="pool_ranking",
#         user="mapinsight",
#         password="intersect42")
#     return con


# def create_list_ranking():
#     standings_to_return = []
#     con = connect_to_DB()
#     cur = con.cursor()
#     cur.execute("SELECT id, player, wins, losses, image FROM scores;")
#     standings = cur.fetchall()

#     # creating list from tupels
#     for row in standings:
#         row = {
#             "id": row[0],
#             "player": row[1],
#             "wins": row[2],
#             "losses": row[3],
#             "image": row[4],
#         }
#         standings_to_return.append(row)

#     return standings_to_return
