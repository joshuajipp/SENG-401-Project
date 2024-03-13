import boto3
import json
from decimal import Decimal

def get_dynamodb_table(table_name):
    """Initialize a DynamoDB resource and get the table."""
    dynamodb = boto3.resource('dynamodb', region_name='ca-central-1')
    table = dynamodb.Table(table_name)
    return table

def get_item_from_id(table, itemID):
    """Retrieve an item from the DynamoDB table for a given itemID."""
    if itemID == '':
        return {}
    response = table.get_item(
        Key={
            'itemID': itemID
        }
    )
    return response.get('Item', {})

def decimal_default(obj):
    """Convert Decimal objects to float. Can be passed as the 'default' parameter to json.dumps()."""
    if isinstance(obj, Decimal):
        return float(obj)
    raise TypeError

def handler(event, context):
    try:
        table_name = 'items-30144999'
        table = get_dynamodb_table(table_name)
        headers = event.get("headers", {})
        itemID = headers.get('itemid', '')
        if itemID == '':
            return {
                'statusCode': 400,
                'body': json.dumps({
                    'error': 'No itemID provided'
                })
            }
        
        item = get_item_from_id(table, itemID)
        item_converted = json.loads(json.dumps(item, default=decimal_default))

        return {
            'statusCode': 200,
            'body': json.dumps({
                'items': item_converted
            })
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({
                'error': str(e)
            })
        }
