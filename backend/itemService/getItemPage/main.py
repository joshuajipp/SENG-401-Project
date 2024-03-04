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

def fetch_items_after_itemID(table_name, location, exclusiveStartKey, pageCount):
    table = get_dynamodb_table(table_name)
    query_kwargs = {
        'IndexName': 'LocationTimestampIndex',
        'KeyConditionExpression': 'location = :value',
        'ExpressionAttributeValues': {
            ':value': location
        },
        'Limit': pageCount,
        'ScanIndexForward': False
    }
    if exclusiveStartKey != '':
        query_kwargs['ExclusiveStartKey'] = exclusiveStartKey
    
    response = table.query(**query_kwargs)
    return response



def handler(event, context):
    try:
        headers = event.get("headers", {})
        
        exclusiveStartKey = headers.get('lastitem', '')
        location = headers.get('location', '')
        pageCount = headers.get('pagecount', '10')
        pageCount = int(pageCount) 
        table_name = 'items-30144999'
        if exclusiveStartKey != '':
            exclusiveStartKey = parse_event_body(exclusiveStartKey)
            exclusiveStartKey['timestamp'] = Decimal(str(exclusiveStartKey['timestamp']))
        
        items = fetch_items_after_itemID(table_name, location, exclusiveStartKey, pageCount)
        
        return {
            'statusCode': 200,
            'body': json.dumps(items, default=decimal_default)
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)}, default=decimal_default)
        }
