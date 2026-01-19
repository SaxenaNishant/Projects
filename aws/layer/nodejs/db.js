const { DynamoDBDocumentClient, PutCommand, GetCommand } = require("@aws-sdk/lib-dynamodb");
const { DynamoDBClient } =  require("@aws-sdk/client-dynamodb");

const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
    
const client = new DynamoDBClient({})

const docClient = DynamoDBDocumentClient.from(client);

const TABLE_NAME = "user";
const BUCKET_NAME = 'm-jaj-dhfj';

const s3 = new S3Client({region:'eu-north-1'})


exports.addUser = async (item) => {
    await docClient.send(new PutCommand({
        TableName: TABLE_NAME,
        Item:item
    }));

}

exports.getUser = async (userId) => {
    console.log("USERID", userId)
    const result = await docClient.send(new GetCommand({
        TableName: TABLE_NAME,
        Key: { userId: String(userId), createdAt: "2026-01-11T12:49:57.426Z" }
    }));
    return result.Item
}

exports.uploadFile = async ({objectKey, fileType}) => {
    try {
        const command = new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: objectKey,
        ContentType: fileType
    });
    const signedUrl = await getSignedUrl(s3, command, {
        expiresIn: 60
    });
    return {
        statusCode: 200,
        body: JSON.stringify({
            uploadUrl: signedUrl,
            fileUrl:`http://${BUCKET_NAME}.s3.amazonaws.com/${objectKey}`
        })
    }
    } catch (error) {
         console.error("Error generating presigned URL", error);
        return {
          statusCode: 500,
          body: JSON.stringify({ message: "Internal server error" })
        };
    }
  
}