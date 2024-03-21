import pytest
from main import *
from moto import mock_aws
import boto3

def test_parse_event_body_with_dict():
    event_body = {"key": "value"}
    assert parse_event_body(event_body) == event_body, "Should return the original dictionary without changes."

def test_parse_event_body_with_json_string():
    event_body = '{"key": "value"}'
    expected_result = {"key": "value"}
    assert parse_event_body(event_body) == expected_result, "Should convert JSON string to dictionary."

@pytest.fixture
def aws_credentials():
    """Mocked AWS Credentials for moto."""
    import os
    os.environ["AWS_ACCESS_KEY_ID"] = "testing"
    os.environ["AWS_SECRET_ACCESS_KEY"] = "testing"
    os.environ["AWS_SECURITY_TOKEN"] = "testing"
    os.environ["AWS_SESSION_TOKEN"] = "testing"

@pytest.fixture
def dynamodb_mock(aws_credentials):
    with mock_aws():
        yield boto3.resource('dynamodb', region_name='ca-central-1')

@pytest.fixture
def items_table(dynamodb_mock):
    """Create a mock DynamoDB table."""
    table = dynamodb_mock.create_table(
        TableName='items-30144999',
        KeySchema=[
            {'AttributeName': 'itemID', 'KeyType': 'HASH'},
        ],
        AttributeDefinitions=[
            {'AttributeName': 'location', 'AttributeType': 'S'},
            {'AttributeName': 'timestamp', 'AttributeType': 'N'},
            {'AttributeName': 'itemID', 'AttributeType': 'S'}
        ],
        ProvisionedThroughput={
            'ReadCapacityUnits': 1,
            'WriteCapacityUnits': 1
        },
        GlobalSecondaryIndexes=[
            {
                'IndexName': 'LocationTimestampIndex',
                'KeySchema': [
                    {'AttributeName': 'location', 'KeyType': 'HASH'},
                    {'AttributeName': 'timestamp', 'KeyType': 'RANGE'} 
                ],
                'Projection': {
                    'ProjectionType': 'ALL'
                },
                'ProvisionedThroughput': {
                    'ReadCapacityUnits': 1,
                    'WriteCapacityUnits': 1
                }
            }
        ]
    )
    return table

def test_update_borrow_requests(items_table):
    items_table.put_item(
        Item={
            'itemID': '1',
            'borrowRequests': [{
                'borrowerID': 'AGJKL',
                'timestamp': 123,
                'startDate': '1700482400',
                'endDate': '1710482400'
            }],
            'timestamp': 123,
            'location': 'Toronto'
        }
    )
    
    new_data = {
        'borrowerID': 'AGJKL',
        'timestamp': 124,
        'startDate': '1700482401',
        'endDate': '1710482401'
    }
    update_borrow_requests(items_table, '1', new_data)
    response = items_table.get_item(Key={'itemID': '1'})
    updated_data = response['Item']['borrowRequests'][0]
    
    assert updated_data['timestamp'] == new_data['timestamp'], "Should update the existing borrowerID with new data."

def test_handler_success(items_table):
    items_table.put_item(
        Item={
            'itemID': '1',
            'borrowRequests': [],
            'timestamp': 123,
            'location': 'Toronto'
        }
    )
    event = {
        "body": '{"itemID": "1", "borrowerID": "AGJKL", "startDate": "1700382400", "endDate": "1710482400"}'
    }
    context = None
    response = handler(event, context)
    assert response['statusCode'] == 200, "Should return a success status code."
        
    updated_data = json.loads(response['body'])["updatedAttributes"]["borrowRequests"]

    assert len(updated_data) == 1 and updated_data[0]["borrowerID"] == "AGJKL", "Should update the borrowRequests array with the new data."