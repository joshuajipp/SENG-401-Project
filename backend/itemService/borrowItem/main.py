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

def update_start_end_dates_in_table(table, itemID, startDate, endDate):
    """Update the start and end dates in the DynamoDB table."""
    response = table.update_item(
        Key={
            'itemID': itemID
        },
        UpdateExpression="set startDate = :s, endDate = :e",
        ExpressionAttributeValues={
            ':s': startDate,
            ':e': endDate
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

def move_borrow_request_to_past_requests(table, itemID, data):
    """Move a borrow request to the pastRequests array in the DynamoDB table."""
    item = table.get_item(Key={'itemID': itemID})
    past_requests = item.get('Item', {}).get('pastRequests', [])

    past_requests.append(data)

    response = table.update_item(
        Key={
            'itemID': itemID
        },
        UpdateExpression="SET pastRequests = :br",
        ExpressionAttributeValues={
            ':br': past_requests
        },
        ReturnValues="UPDATED_NEW"
    )
    return response

def delete_borrow_request_array(table, itemID):
    """Delete a borrowerID from the borrowRequests array in the DynamoDB table."""
    response = table.update_item(
        Key={
            'itemID': itemID
        },
        UpdateExpression="REMOVE borrowRequests",
        ReturnValues="UPDATED_NEW"
    )
    return response

def handler(event, context):
    try:
        table_name = 'items-30144999'
        table = get_dynamodb_table(table_name)
        body = parse_event_body(event["body"])
        itemID = body["itemID"]
        borrowerID = body["borrowerID"]
        
        current_item = table.get_item(
            Key={'itemID': itemID}
        )

        if 'Item' not in current_item:
            raise ValueError(f"Item {itemID} found in table")

        borrow_requests = current_item['Item']['borrowRequests']

        borrowerID_index = next((i for i, d in enumerate(borrow_requests) if d["borrowerID"] == borrowerID), None)
        if borrowerID_index is None:
            raise ValueError("Borrower ID not found in borrow requests")
        
        borrowerID_item = borrow_requests[borrowerID_index]
        startDate = Decimal(borrowerID_item['startDate'])
        endDate = Decimal(borrowerID_item['endDate'])

        data = {
            'borrowerID': borrowerID,
            'startDate': startDate,
            'endDate': endDate,
            'status': "active"
        }

        responses = []
        responses.append(remove_borrower_id_from_borrow_requests(table, itemID, borrowerID_index))
        responses.append(update_start_end_dates_in_table(table, itemID, startDate, endDate))
        responses.append(update_item_in_table(table, itemID, borrowerID))
        responses.append(move_borrow_request_to_past_requests(table, itemID, data))
        
        if table.get_item(Key={'itemID': itemID})['Item'].get('borrowRequests', []) == []:
            responses.append(delete_borrow_request_array(table, itemID))

        return {
            'statusCode': 200,
            'body': json.dumps(responses, default=decimal_default)
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps(str(e))
        }
