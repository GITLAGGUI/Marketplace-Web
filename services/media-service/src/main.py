from fastapi import FastAPI
from pydantic import BaseModel
import os
import boto3
from botocore.client import Config

app = FastAPI(title="Media Service", version="0.1.0")


@app.get("/")
async def root():
    return {"service": "media-service", "status": "ok"}


class PresignRequest(BaseModel):
    filename: str
    content_type: str


@app.post("/api/v1/uploads/presign")
async def presign_upload(body: PresignRequest):
    bucket = os.getenv("AWS_S3_BUCKET")
    region = os.getenv("AWS_REGION", "us-east-1")
    if not bucket:
        return {"url": "", "fields": {}, "error": "Missing AWS_S3_BUCKET"}

    s3 = boto3.client(
        "s3",
        region_name=region,
        config=Config(s3={'addressing_style': 'virtual'}),
        aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
        aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
    )

    key = f"uploads/{body.filename}"
    presigned = s3.generate_presigned_post(
        Bucket=bucket,
        Key=key,
        Fields={"Content-Type": body.content_type},
        Conditions=[["content-length-range", 0, 10485760], {"Content-Type": body.content_type}],
        ExpiresIn=3600,
    )
    return presigned
