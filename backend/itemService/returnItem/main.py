import boto3
import json
from decimal import Decimal

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

def decimal_default(obj):
    """Convert Decimal objects to float. Can be passed as the 'default' parameter to json.dumps()."""
    if isinstance(obj, Decimal):
        return float(obj)
    raise TypeError

def remove_borrowerID_from_item(table, itemID):
    """Remove the borrowerID attribute from an item in the DynamoDB table."""
    response = table.update_item(
        Key={
            'itemID': itemID
        },
        UpdateExpression="REMOVE borrowerID",
        ReturnValues="UPDATED_NEW"
    )
    return response

def remove_start_end_dates_from_item(table, itemID):
    """Remove the startDate and endDate attributes from an item in the DynamoDB table."""
    response = table.update_item(
        Key={
            'itemID': itemID
        },
        UpdateExpression="REMOVE startDate, endDate",
        ReturnValues="UPDATED_NEW"
    )
    return response


def handler(event, context):
    try:
        table_name = 'items-30144999'
        table = get_dynamodb_table(table_name)
        body = parse_event_body(event["body"])
        itemID = body["itemID"]

        response = remove_start_end_dates_from_item(table, itemID)
        
        response = remove_borrowerID_from_item(table, itemID)
        
        
        return {
            'statusCode': 200,
            'body': json.dumps(response, default=decimal_default)
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps(str(e))
        }

