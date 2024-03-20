import json
import boto3
import uuid
import traceback


def handler(event, context, table=None):
    # pass in table for testing
    if table is None:
        dynamodb_resource = boto3.resource("dynamodb", region_name='ca-central-1')
        table = dynamodb_resource.Table("users-30144999")  

    data = json.loads(event["body"])

    try:
        # check if email already exists
        response = table.query(
            IndexName='EmailIndex',  
            KeyConditionExpression=boto3.dynamodb.conditions.Key("email").eq(data["email"])
        )
        if response["Count"] > 0:
            return {
                "statusCode": 400,
                "body": json.dumps({
                    "message": "Email already exists"
                })
            }

        if data['profilePicture'] != "" and data['profilePicture'] is not None:
            pfp = data['profilePicture']

        else:
            pfp = "https://media.discordapp.net/attachments/1202289104428224542/1219726258964004946/Pastamania.jpg?ex=660c5999&is=65f9e499&hm=a7e0a40bf13fb54656820c9bb294d6716db4b7db5bdd1e9a8d703948fc82f25c&=&format=png"

        # if email doesn't exist, create new user
        item={
            "userID": str(uuid.uuid4()),
            "name": data["name"],
            "email": data["email"],
            "rating": data["rating"],
            "ratingCount": 0,
            "bio": data["bio"],
            "location": data["location"],
            "profilePicture": pfp
            }
        table.put_item(Item=item)
        return {
            "statusCode": 200,
                "body": json.dumps(item)
        }
    except KeyError as ke:
        return {
            "statusCode": 400,
            "body": json.dumps({
                "message": f"Missing required field: {str(ke)}"
            })
        }
    except Exception as e:
        print(f"Exception: {e}")
        traceback.print_exc()
        return {
            "statusCode": 500,
                "body": json.dumps({
                    "message": str(e),
                    "stack_trace": traceback.format_exc()
                })}



