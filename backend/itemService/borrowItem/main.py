import boto3
import json
from decimal import Decimal

def get_dynamodb_table(table_name):
    """Initialize a DynamoDB resource and get the table."""
    dynamodb = boto3.resource('dynamodb', region_name='ca-central-1')
    table = dynamodb.Table(table_name)
    return table

def decimal_default(obj):
    """Convert Decimal objects to float. Can be passed as the 'default' parameter to json.dumps()."""
    if isinstance(obj, Decimal):
        return float(obj)
    raise TypeError

def parse_event_body(event_body):
    """Parse the event body, converting from JSON string to dictionary if necessary."""
    if isinstance(event_body, str):
        return json.loads(event_body)
    return event_body

def update_item_in_table(table, itemID, borrowerID):
    """Update an item in the DynamoDB table."""
    response = table.update_item(
        Key={
            'itemID': itemID
        },
        UpdateExpression="set borrowerID = :b",
        ExpressionAttributeValues={
            ':b': borrowerID
        },
        ReturnValues="UPDATED_NEW"
    )
    return response

def remove_borrower_id_from_borrow_requests(table, itemID, borrowerID_index):
    """Remove a borrowerID from the borrowRequests array in the DynamoDB table."""
    response = table.update_item(
        Key={
            'itemID': itemID
        },
        UpdateExpression="REMOVE borrowRequests[{}]"
        .format(borrowerID_index),
        ReturnValues="UPDATED_NEW"
    )
    return response

def handler(event, context):
    # test 1212
    try:
        table_name = 'items-30144999'
        table = get_dynamodb_table(table_name)
        body = parse_event_body(event["body"])
        itemID = body["itemID"]
        borrowerID = body["borrowerID"]
        
        current_item = table.get_item(
            Key={'itemID': itemID}
        )

        borrow_requests = current_item['Item']['borrowRequests']

        try:
            borrowerID_index = borrow_requests.index(borrowerID)
            response = remove_borrower_id_from_borrow_requests(table, itemID, borrowerID_index)
        except ValueError:
            borrowerID_index = None 
            

        response = update_item_in_table(table, itemID, borrowerID)
        return {
            'statusCode': 200,
            'body': json.dumps(response, default=decimal_default)
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps(str(e))
        }
