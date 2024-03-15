import json
import boto3

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
    updatedRating = (ratingSum + newRating) / ratingCount
    
    # turn updateRating to float to avoid errors
    updatedRating = float(updatedRating)
    
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
        
        # return response
        return {
            'statusCode': 200,
            'body': json.dumps(response)
        }
            
    except Exception as e:
        print(f"exception: {e}")
        return {
            'statusCode': 500,
            'body': json.dumps(f'Error updating account: {str(e)}')
        }