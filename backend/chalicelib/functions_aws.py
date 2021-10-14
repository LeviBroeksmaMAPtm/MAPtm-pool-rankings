import os
import boto3
from botocore.exceptions import ClientError
import logging
import json


def get_secret(db):
    secret_name = os.environ["SECRET_NAME"]
    region_name = os.environ["REGION"]

    session = boto3.session.Session()

    client = session.client(service_name="secretsmanager", region_name=region_name)

    get_secret_value_response = client.get_secret_value(SecretId=secret_name)

    secret = get_secret_value_response["SecretString"]

    db_params = {"drivername": "postgresql", "database": db}

    db_params.update(json.loads(secret))

    db_params["user"] = db_params['username']

    del db_params['dbInstanceIdentifier']
    del db_params['drivername']
    del db_params['engine']
    del db_params['username']

    return db_params


def move_to_s3(file_in, file_path_out):
    s3_client = boto3.client("s3")

    try:
        s3_client.upload_file(
            "/tmp/" + file_in,
            "mapinsight-export",
            f"{file_path_out}",
            ExtraArgs={
                "ContentType": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                "CacheControl": "no-cache, no-store",
            },
        )
    except ClientError as e:
        logging.error(e)
        return None

    os.remove("/tmp/" + file_in)


# Create a presigned URL for the S3 object
def create_presigned_url(bucket_name, object_name, expiration_time=3600):
    response = None

    try:
        response = boto3.client("s3").generate_presigned_url(
            "get_object",
            Params={"Bucket": bucket_name, "Key": object_name},
            ExpiresIn=expiration_time,
        )
    except ClientError as e:
        logging.error(e)
        return None

    # The response contains the presigned URL
    return response