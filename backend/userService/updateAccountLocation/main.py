import boto3
import json

def get_dynamodb_table(table_name):
    """Initialize a DynamoDB resource and get the table."""
    dynamodb = boto3.resource('dynamodb', region_name='ca-central-1')
    table = dynamodb.Table(table_name)
    return table

def parse_event_body(event_body):
    """Parse the event body, converting from JSON string to dictionary if necessary."""
    if isinstance(event_body, str):
        return json.loads(event_body)
    return event_body

def update_user_location(table, userID, location):
    """Update a user's location in the DynamoDB table."""
    response = table.update_item(
        Key={
            'userID': userID
        },
        UpdateExpression="set location = :l",
        ExpressionAttributeValues={
            ':l': location
        },
        ReturnValues="UPDATED_NEW"
    )
    return response


def handler(event, context):
    try:
        table_name = 'users-30144999'
        table = get_dynamodb_table(table_name)
        body = parse_event_body(event["body"])
        userID = body["userID"]
        location = body["location"]

        response = update_user_location(table, userID, location)

        return {
            'statusCode': 200,
            'body': json.dumps(response)
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps(str(e))
        }
