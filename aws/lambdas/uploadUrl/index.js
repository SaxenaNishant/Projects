import { uploadFile } from "/opt/nodejs/db.js"


const BUCKET_NAME = 'm-jaj-dhfj';

exports.handler = async(event) => {
    const data = typeof event.body === "string" ? JSON.parse(event.body) : event.body;
    if(!data.fileType || !data.fileName) {
        return {
            statusCode: 400,
            body: JSON.stringify({message: 'Missing fileName or fileType'})
        }
    }

    const objectKey = `uploads/${Date.now()}-${data.fileName}`

    const presignedUrl = await uploadFile({objectKey, fileType: data.fileType});
    return {
        statusCode: 200,
        body: JSON.stringify({
            uploadUrl: presignedUrl,
            fileUrl:`http://${BUCKET_NAME}.s3.amazonaws.com/${objectKey}`
        })
    }

}