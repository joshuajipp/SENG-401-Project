import json
from decimal import Decimal
import pytest
from moto import mock_dynamodb2
from unittest.mock import patch

from cancel_request import *

@pytest.fixture
def event():
    # Sample event for testing
    return {
        "headers": {
            "accesstoken": "your_access_token"
        },
        "body": json.dumps({
            "itemID": "your_item_id",
            "borrowerID": "your_borrower_id"
        })
    }

@pytest.fixture
def context():
    # Mocked context
    return None

@mock_dynamodb2
@pytest.fixture
def dynamodb_table():
    # Create a mock DynamoDB table
    from boto3 import resource
    dynamodb = resource('dynamodb', region_name='ca-central-1')
    table = dynamodb.create_table(
        TableName='mock_table_name',
        KeySchema=[
            {
                'AttributeName': 'itemID',
                'KeyType': 'HASH'
            }
        ],
        AttributeDefinitions=[
            {
                'AttributeName': 'itemID',
                'AttributeType': 'S'
            }
        ],
        ProvisionedThroughput={
            'ReadCapacityUnits': 5,
            'WriteCapacityUnits': 5
        }
    )
    yield table

def test_parse_event_body():
    # Test parse_event_body function
    event_body = '{"key": "value"}'
    parsed_body = parse_event_body(event_body)
    assert parsed_body == {"key": "value"}

def test_decimal_default():
    # Test decimal_default function
    decimal_value = Decimal('10.5')
    assert decimal_default(decimal_value) == 10.5

def test_handler(event, context, dynamodb_table):
    # Call handler function
    with patch('your_module.requ.get') as mock_get:
        mock_get.return_value.status_code = 200

        # Injecting the mock DynamoDB table
        with patch('your_module.get_dynamodb_table', return_value=dynamodb_table):
            response = handler(event, context)

    # Assertions
    assert response['statusCode'] == 200
    assert response['body'] is not None  # You might want to add more detailed assertions here
