import boto3
import json
from botocore.exceptions import ClientError
import requests
import os


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
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps(str(e))
        }
    ses_client = boto3.client('ses', region_name='ca-central-1') 
    body = parse_event_body(event['body'])
    email_to_verify = body['email']
    
    try:
        response = ses_client.verify_email_identity(EmailAddress=email_to_verify)
        print(f"Verification email sent to {email_to_verify}.")
        return {
            'statusCode': 200,
            'body': f"Verification email sent to {email_to_verify}. Response: {response}"
        }
    except ClientError as e:
        print(e.response['Error']['Message'])
        return {
            'statusCode': 500,
            'body': e.response['Error']['Message']
        }
