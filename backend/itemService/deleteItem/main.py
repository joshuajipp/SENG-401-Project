
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


def remove_item(table, itemID):
    """Remove an item from the DynamoDB table."""
    response = table.delete_item(
        Key={
            'itemID': itemID
        }
    )
    return response

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
        table = get_dynamodb_table(table_name)
        headers = event.get("headers", {})
        itemID = headers.get("itemid", "")
        
        response = remove_item(table, itemID)
        response = json.dumps(response, default=decimal_default)
        
        return {
            'statusCode': 200,
            'body': response
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps(str(e))
        }


