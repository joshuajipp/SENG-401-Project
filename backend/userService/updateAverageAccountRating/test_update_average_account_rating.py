import pytest
from main import *
from moto import mock_aws
import boto3

# Mock AWS credentials
@pytest.fixture
def aws_credentials():
    import os
    os.environ["AWS_ACCESS_KEY_ID"] = "testing"
    os.environ["AWS_SECRET_ACCESS_KEY"] = "testing"
    os.environ["AWS_SECURITY_TOKEN"] = "testing"
    os.environ["AWS_SESSION_TOKEN"] = "testing"

# Mock DynamoDB
@pytest.fixture
def dynamodb_mock(aws_credentials):
    with mock_aws():
        yield boto3.resource('dynamodb', region_name='ca-central-1')

def test_update_average_account_rating(dynamodb_mock):
    # Create a dummy table
    table_name = 'users-30144999'
    dynamodb_mock.create_table(
        TableName=table_name,
        KeySchema=[{'AttributeName': 'userID', 'KeyType': 'HASH'}],
        AttributeDefinitions=[{'AttributeName': 'userID', 'AttributeType': 'S'}],
        ProvisionedThroughput={'ReadCapacityUnits': 1, 'WriteCapacityUnits': 1}
    )

    # Insert dummy user
    table = dynamodb_mock.Table(table_name)

    mock_user = {
        'userID': '123456',
        'name': 'John Doe',
        'rating': 0,
        'email': 'johndoe@testmail.com', 
        'bio': 'John Doe is a guy whose name is John Doe',
        'location': 'Calgary',
        'profilePicture': 'test.com',
        'ratingCount': 0
    }
    
    table.put_item(Item=mock_user)
    
    # assert dummy was successfully added
    assert_user = table.get_item(Key={'userID': '123456'})
    assert assert_user['Item']['name'] == 'John Doe'

    # Update account rating for mock user
    response = update_account_ratings(table, mock_user, 5)

    # assert update was successful
    assert response['ResponseMetadata']['HTTPStatusCode'] == 200

    assert_user = table.get_item(Key={'userID': '123456'})
    assert assert_user['Item']['rating'] == 5
    assert assert_user['Item']['ratingCount'] == 1

    # Update account rating for mock user
    mock_user = assert_user['Item']
    response = update_account_ratings(table, mock_user, 2)

    # assert update was successful
    assert response['ResponseMetadata']['HTTPStatusCode'] == 200

    assert_user = table.get_item(Key={'userID': '123456'})
    assert assert_user['Item']['rating'] == 3.5
    assert assert_user['Item']['ratingCount'] == 2