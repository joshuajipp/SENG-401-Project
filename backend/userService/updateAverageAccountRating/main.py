import json
import boto3
import os
import requests
from decimal import Decimal

# Initialize DynamoDB resource and get table
def get_dynamodb_table(table_name):
  dynamodb = boto3.resource('dynamodb')
  table = dynamodb.Table(table_name)
  return table

#  Parse the event body, convert to dictionary if needed
def parse_event_body(event_body):
  if isinstance(event_body, str):
    return json.loads(event_body)
  else:
    return event_body

def update_account_ratings(table, user, newRating):
    # Retrieving old values
    oldRating = user['rating']
    ratingCount = user['ratingCount']
    
    # New Rating Calculations
    ratingSum = (oldRating * ratingCount)
    ratingCount += 1
    updatedRating = Decimal((ratingSum + newRating) / ratingCount)

    # Update table query
    update_expression = "SET #rating = :rating, #ratingCount = :ratingCount"
    expression_attribute_values = {
        ":rating": updatedRating,
        ":ratingCount": ratingCount
    }
    expression_attribute_names = {
        "#rating": "rating",
        "#ratingCount": "ratingCount"
    }
    
    response = table.update_item(
       Key = {
           'userID': user['userID']
       },
        UpdateExpression=update_expression,
        ExpressionAttributeValues=expression_attribute_values,
        ExpressionAttributeNames=expression_attribute_names,
        ReturnValues="UPDATED_NEW"
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
        # setup connection to dynamodb table
        # and parse event body
        table = get_dynamodb_table(table_name="users-30144999")
        body = parse_event_body(event_body=event['body'])

        # Retrieve userID and newRating
        userID = body['userID']
        newRating = body['newRating'] 
        
        # Get old entry if it exists otherwise return 404
        user = table.get_item(Key={'userID': userID})["Item"]
        if user is None:
            # User not found
            return {
                'statusCode': 404,
                'body': 'User not found'
            }
        
        # Update the new rating
        response = update_account_ratings(table, user, newRating)
        
        # Create a new response body
        response_body = {
            'rating': str(response['Attributes']['rating']),
            'ratingCount': str(response['Attributes']['ratingCount'])
        }
        
        # return response
        return {
            'statusCode': 200,
            'body': json.dumps(response_body)
        }
            
    except Exception as e:
        print(f"exception: {e}")
        return {
            'statusCode': 500,
            'body': json.dumps(f'Error updating account: {str(e)}')
        }