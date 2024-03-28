import json
import pytest
from moto import mock_aws
import boto3
from cancel_request import handler

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
            {'AttributeName': 'itemID', 'AttributeType': 'S'}
        ],
        ProvisionedThroughput={
            'ReadCapacityUnits': 1,
            'WriteCapacityUnits': 1
        }
    )
    return table

def test_handler_with_invalid_borrowerID(items_table):
    borrowRequests = [{
        "borrowerID": "74544474-9cb7-4aa3-9f30-714b1cf2b317",
        "endDate": "1710482400",
        "startDate": "1700482400",
        "timestamp": 1710773998
    }]
    items_table.put_item(
        Item={
            'itemID': '1',
            'borrowRequests': borrowRequests
        }
    )
    event = {
        "body": '{"itemID": "1", "borrowerID": "invalid_borrowerID"}'
    }
    response = handler(event, None)
    assert response['statusCode'] == 404
    assert json.loads(response['body'])['message'] == 'BorrowerID not found in borrowRequests'

def test_handler_with_nonexistent_item(items_table):
    event = {
        "body": '{"itemID": "nonexistent_item", "borrowerID": "JX152"}'
    }
    response = handler(event, None)
    assert response['statusCode'] == 404
    assert json.loads(response['body'])['message'] == 'Item nonexistent_item not found'

def test_handler_with_unsuccessful_http_request(items_table, monkeypatch):
    def mock_get(*args, **kwargs):
        class MockResponse:
            def __init__(self, status_code):
                self.status_code = status_code

            def json(self):
                return {"message": "Invalid user"}

        return MockResponse(401)

    monkeypatch.setattr("requests.get", mock_get)

    event = {
        "headers": {
            "accesstoken": "invalid_access_token"
        },
        "body": '{"itemID": "1", "borrowerID": "JX152"}'
    }
    response = handler(event, None)
    assert response['statusCode'] == 401
