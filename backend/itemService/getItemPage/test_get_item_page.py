import pytest
from moto import mock_aws
import boto3
import json
from main import *

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

def test_parse_event_body():
    assert parse_event_body('{"key": "value"}') == {"key": "value"}
    assert parse_event_body({"key": "value"}) == {"key": "value"}




def test_fetch_items_after_itemID(items_table):
    items_table.put_item(Item={
        'itemID': '1',
        'location': 'Vancouver',
        'timestamp': 1
    })
    items_table.put_item(Item={
        'itemID': '2',
        'location': 'Vancouver',
        'timestamp': 2
    })
    items_table.put_item(Item={
        'itemID': '3',
        'location': 'Vancouver',
        'timestamp': 3
    })
    items_table.put_item(Item={
        'itemID': '4',
        'location': 'Vancouver',
        'timestamp': 4
    })
    items_table.put_item(Item={
        'itemID': '5',
        'location': 'Vancouver',
        'timestamp': 5
    })
    items_table.put_item(Item={
        'itemID': '6',
        'location': 'Vancouver',
        'timestamp': 6
    })
    items_table.put_item(Item={
        'itemID': '7',
        'location': 'Vancouver',
        'timestamp': 7
    })
    items_table.put_item(Item={
        'itemID': '8',
        'location': 'Vancouver',
        'timestamp': 8
    })
    items_table.put_item(Item={
        'itemID': '9',
        'location': 'Vancouver',
        'timestamp': 9
    })
    items_table.put_item(Item={
        'itemID': '10',
        'location': 'Vancouver',
        'timestamp': 10
    })
    items_table.put_item(Item={
        'itemID': '11',
        'location': 'Vancouver',
        'timestamp': 11
    })
    items_table.put_item(Item={
        'itemID': '12',
        'location': 'Vancouver',
        'timestamp': 12
    })
    items_table.put_item(Item={
        'itemID': '13',
        'location': 'Vancouver',
        'timestamp': 13
    })
    items_table.put_item(Item={
        'itemID': '14',
        'location': 'Vancouver',
        'timestamp': 14
    })
    items_table.put_item(Item={
        'itemID': '15',
        'location': 'Vancouver',
        'timestamp': 15
    })

    response = fetch_items_after_itemID('items-30144999', 'Vancouver', '', 10)
    assert response['Items'] == [
        {
            'itemID': '15',
            'location': 'Vancouver',
            'timestamp': 15
        },
        {
            'itemID': '14',
            'location': 'Vancouver',
            'timestamp': 14
        },
        {
            'itemID': '13',
            'location': 'Vancouver',
            'timestamp': 13
        },
        {
            'itemID': '12',
            'location': 'Vancouver',
            'timestamp': 12
        },
        {
            'itemID': '11',
            'location': 'Vancouver',
            'timestamp': 11
        },
        {
            'itemID': '10',
            'location': 'Vancouver',
            'timestamp': 10
        },
        {
            'itemID': '9',
            'location': 'Vancouver',
            'timestamp': 9
        },
        {
            'itemID': '8',
            'location': 'Vancouver',
            'timestamp': 8
        },
        {
            'itemID': '7',
            'location': 'Vancouver',
            'timestamp': 7
        },
        {
            'itemID': '6',
            'location': 'Vancouver',
            'timestamp': 6
        }
    ]

    response = fetch_items_after_itemID('items-30144999', 'Vancouver', response['LastEvaluatedKey'], 10)

    assert response['Items'] == [
        {
            'itemID': '5',
            'location': 'Vancouver',
            'timestamp': 5
        },
        {
            'itemID': '4',
            'location': 'Vancouver',
            'timestamp': 4
        },
        {
            'itemID': '3',
            'location': 'Vancouver',
            'timestamp': 3
        },
        {
            'itemID': '2',
            'location': 'Vancouver',
            'timestamp': 2
        },
        {
            'itemID': '1',
            'location': 'Vancouver',
            'timestamp': 1
        }
    ]


def test_handler(items_table):
    items_table.put_item(Item={
        'itemID': '1',
        'location': 'Vancouver',
        'timestamp': 1
    })
    items_table.put_item(Item={
        'itemID': '2',
        'location': 'Vancouver',
        'timestamp': 2
    })
    items_table.put_item(Item={
        'itemID': '3',
        'location': 'Vancouver',
        'timestamp': 3
    })
    items_table.put_item(Item={
        'itemID': '4',
        'location': 'Vancouver',
        'timestamp': 4
    })
    items_table.put_item(Item={
        'itemID': '5',
        'location': 'Vancouver',
        'timestamp': 5
    })
    items_table.put_item(Item={
        'itemID': '6',
        'location': 'Vancouver',
        'timestamp': 6
    })
    items_table.put_item(Item={
        'itemID': '7',
        'location': 'Vancouver',
        'timestamp': 7
    })
    items_table.put_item(Item={
        'itemID': '8',
        'location': 'Vancouver',
        'timestamp': 8
    })
    items_table.put_item(Item={
        'itemID': '9',
        'location': 'Vancouver',
        'timestamp': 9
    })
    items_table.put_item(Item={
        'itemID': '10',
        'location': 'Vancouver',
        'timestamp': 10
    })
    items_table.put_item(Item={
        'itemID': '11',
        'location': 'Vancouver',
        'timestamp': 11
    })
    items_table.put_item(Item={
        'itemID': '12',
        'location': 'Vancouver',
        'timestamp': 12
    })
    items_table.put_item(Item={
        'itemID': '13',
        'location': 'Vancouver',
        'timestamp': 13
    })
    items_table.put_item(Item={
        'itemID': '14',
        'location': 'Vancouver',
        'timestamp': 14
    })
    items_table.put_item(Item={
        'itemID': '15',
        'location': 'Vancouver',
        'timestamp': 15
    })

    response = handler({
        "headers": {
            "location": "Vancouver",
            "pagecount": "10"
        }
    }, None)

    assert response['statusCode'] == 200
    items = response['body']
    assert len(json.loads(items)['Items']) == 10
    assert json.loads(items)['Items'][0]['itemID'] == '15'
    assert json.loads(items)['Items'][9]['itemID'] == '6'
    assert 'LastEvaluatedKey' in json.loads(items)
    assert json.loads(items)['LastEvaluatedKey']['itemID'] == '6'

    response = handler({
        "headers": {
            "location": "Vancouver",
            "pagecount": "10",
            "lastitem": json.loads(items)['LastEvaluatedKey']
        }
    }, None)


    assert response['statusCode'] == 200
    items = response['body']
    assert len(json.loads(items)['Items']) == 5
    assert json.loads(items)['Items'][0]['itemID'] == '5'
    assert json.loads(items)['Items'][4]['itemID'] == '1'
    assert 'LastEvaluatedKey' not in json.loads(items)
