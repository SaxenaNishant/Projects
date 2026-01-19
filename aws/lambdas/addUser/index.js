import { randomUUID } from "crypto";
import { addUser } from "/opt/nodejs/db.js"

export const handler = async (event) => {
    try {
        const body = typeof event.body === "string"
      ? JSON.parse(event.body)
      : event.body;

      const { firstName, lastName, email, age, gender } = body;

        const params = {
            firstName, lastName, email, age, gender,
            createdAt: new Date().toISOString(),
            userId: randomUUID()
        }

        await addUser(params);

        return {
            statusCode: 201,
            headers:{
                "Access-Control-Allow-Origin":"*",
                "Access-Control-Allow-Origin":"*",
                "Access-Control-Allow-Methods":"OPTIONS, POST"
            },
            body:JSON.stringify({message:"Record added successfully"})
        }

    } catch (error) {
        console.error("DynamoDB Error:", error);
            
    return {
          statusCode: 500,
          headers: {
            "Access-Control-Allow-Origin": "*"
          },
          body: JSON.stringify({
            message: "Failed to add record",
            error: error.message
          })
        };
    }
}