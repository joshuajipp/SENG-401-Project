import boto3
import json
from botocore.exceptions import ClientError


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
    ses_client = boto3.client('ses', region_name='us-east-1') 
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
