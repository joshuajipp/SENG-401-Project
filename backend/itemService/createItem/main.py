import requests
import json

def handler(event, context):
    response = requests.get('https://httpbin.org/get')
    print("hi")
    return {
        'statusCode': 200,
        'body': json.dumps(response.json())
    }

def add(a, b):
    return a + b
