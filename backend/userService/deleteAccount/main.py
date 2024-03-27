import json
import boto3
import requests
import os

#  Parse the event body, convert to dictionary if needed
def parse_event_body(event_body):
  if isinstance(event_body, str):
    return json.loads(event_body)
  else:
    return event_body

# Initialize a DynamoDB resource and get the table.
def get_dynamodb_table(table_name):
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table(table_name)
    return table

# Remove an item from the DynamoDB table.
def delete_account(table, userID):
    response = table.delete_item(
        Key={
            'userID': userID
        }
    )
    return response

def handler(event, context):
  try:
        header = event.get("headers", {})
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
      # Retrieve table
      table_name = 'users-30144999'
      table = get_dynamodb_table(table_name)
      
      # Retrieve userID
      headers = event.get("headers", {})
      userID = headers.get("userid", "")
      
      # Check if user exists
      response = table.get_item(Key={'userID': userID})
      if 'Item' not in response:
        return {
          'statusCode': 404,
          'body': json.dumps({'error': 'Item not found'})
        }

      # If user exists then proceed to delete
      response = delete_account(table, userID)
      return {
          'statusCode': 200,
          'body': json.dumps(response)
      }
      
  # Something went wrong with the delete  
  except Exception as e:
    print(f"exception: {e}")
    return {
      'statusCode': 500,
      'body': json.dumps(f'Error deleting account: {str(e)}')
    }
