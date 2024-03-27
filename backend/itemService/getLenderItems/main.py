import boto3
import json
from decimal import Decimal
import requests
import os

def get_dynamodb_table(table_name):
    """Initialize a DynamoDB resource and get the table."""
    dynamodb = boto3.resource('dynamodb', region_name='ca-central-1')
    table = dynamodb.Table(table_name)
    return table

def get_items_by_lender_id(table, lenderID, gsi_name):
    """Retrieve all items from the DynamoDB table for a given lenderID using a GSI."""
    response = table.query(
        IndexName=gsi_name,
        KeyConditionExpression='lenderID = :lenderID',
        ExpressionAttributeValues={
            ':lenderID': lenderID
        }
    )
    return response.get('Items', [])

def decimal_default(obj):
    """Convert Decimal objects to float. Can be passed as the 'default' parameter to json.dumps()."""
    if isinstance(obj, Decimal):
        return float(obj)
    raise TypeError

def add_borrower_obj_to_items(table, items):
    """Add borrower object to each item in the list."""
    for item in items:
        borrowerID = item.get('borrowerID', '')
        if borrowerID:
            response = table.get_item(
                Key={
                    'userID': borrowerID
                }
            )
            borrower = response.get('Item', {})
            item['borrower'] = borrower
    return items

def handler(event, context):
    try:
        header = event["headers"]
        if os.environ.get('ENV') != 'testing':
            req = requests.get(f'https://www.googleapis.com/oauth2/v1/userinfo?access_token={header["accesstoken"]}',
                        headers={
                            "Authorization": f"Bearer {header['accesstoken']}",
                            "Accept": "application/json"
                        })
        
            if req.status_code != 200:
                return {
                "statusCode": 401,
                "body": json.dumps({"message": "Invalid user"})
                }
        table_name = 'items-30144999'
        gsi_name = 'LenderIDIndex'
        table = get_dynamodb_table(table_name)
        headers = event.get("headers", {})
        lenderID = headers.get('lenderid', '')
        
        items = get_items_by_lender_id(table, lenderID, gsi_name)
        

        table = get_dynamodb_table('users-30144999')
        items_converted = add_borrower_obj_to_items(table, items)
        items_converted = json.loads(json.dumps(items, default=decimal_default))

        return {
            'statusCode': 200,
            'body': json.dumps({
                'items': items_converted
            })
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({
                'error': str(e)
            })
        }
