import dotenv from "dotenv";
import {  S3Client } from "@aws-sdk/client-s3";
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

dotenv.config()

export const s3client = new S3Client({
    region: process.env.AWS_REGION || "",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ""
    }
});

export const generateUploadUrl = async (filename: string, contentType:string) => {
    const command = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `upload/user/${filename}`,
        ContentType: contentType
    })

    const url = await getSignedUrl(s3client,command,{expiresIn:3600})
    return url
}

export const getImageUrl = async (filename: string) => {
    const command = new GetObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `upload/user/${filename}`
    })

    const url = await getSignedUrl(s3client,command,{expiresIn:3600})
    return url
}
