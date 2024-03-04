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

def fetch_items_without_borrowerID_with_pagination(table_name, location, exclusiveStartKey, pageCount):
    table = get_dynamodb_table(table_name)
    fetched_items = []
    last_evaluated_key = exclusiveStartKey or None

    while len(fetched_items) < pageCount:
        query_kwargs = {
            'IndexName': 'LocationTimestampIndex',
            'KeyConditionExpression': 'location = :value',
            'ExpressionAttributeValues': {
                ':value': location
            },
            'FilterExpression': 'attribute_not_exists(borrowerID)',
            'Limit': pageCount, 
            'ScanIndexForward': False
        }

        if last_evaluated_key:
            query_kwargs['ExclusiveStartKey'] = last_evaluated_key

        response = table.query(**query_kwargs)
        fetched_items.extend(response.get('Items', []))

        last_evaluated_key = response.get('LastEvaluatedKey')
        if not last_evaluated_key:
            break  # No more items to fetch
    
    if len(fetched_items) > pageCount:
        last_evaluated_key = fetched_items[pageCount - 1]
    # If we fetched more items than needed due to the final query call, trim the list
    return fetched_items[:pageCount], last_evaluated_key




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
        
        items, last_evaluated_key = fetch_items_without_borrowerID_with_pagination(
            table_name, location, exclusiveStartKey, pageCount
        )
        
        return {
            'statusCode': 200,
            'body': json.dumps({
                'items': items,
                'last_evaluated_key': last_evaluated_key
            }, default=decimal_default)
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)}, default=decimal_default)
        }
