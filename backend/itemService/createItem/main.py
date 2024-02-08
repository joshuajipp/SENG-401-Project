import requests
import json

def handler(event, context):
    response = requests.get('https://httpbin.org/get')

    return {
        'statusCode': 200,
        'body': json.dumps(response.json())
    }

# new test for credentials 2
def add(a, b):
    return a + b
