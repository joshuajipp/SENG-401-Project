import boto3
import json
from botocore.exceptions import ClientError

def get_dynamodb_table(table_name):
    """Initialize a DynamoDB resource and get the table."""
    dynamodb = boto3.resource('dynamodb', region_name='ca-central-1')
    table = dynamodb.Table(table_name)
    return table

def parse_event_body(event_body):
    """Parse the event body, converting from JSON string to dictionary if necessary."""
    if isinstance(event_body, str):
        return json.loads(event_body)
    return event_body

def send_email(sender, recipient, subject, body_type, body_content, aws_region="ca-central-1"):
    """
    Sends an email using AWS SES.

    Parameters:
    - sender: The email address of the sender.
    - recipient: The email address of the recipient.
    - subject: The subject of the email.
    - body_type: The type of the email body ('Text' or 'Html').
    - body_content: The content of the email body.
    - aws_region: The AWS region where SES is set up (default is 'ca-central-1').

    Returns:
    A dictionary containing information about the sent message, or an error message.
    """
    ses_client = boto3.client('ses', region_name=aws_region)
    
    # Prepare the message body
    body = {
        body_type: {
            'Data': body_content,
            'Charset': 'UTF-8'
        }
    }

    try:
        # Send the email
        response = ses_client.send_email(
            Source=sender,
            Destination={'ToAddresses': [recipient]},
            Message={
                'Subject': {
                    'Data': subject,
                    'Charset': 'UTF-8'
                },
                'Body': body
            }
        )
        return {'MessageId': response['MessageId']}
    except ClientError as e:
        return {'Error': e.response['Error']['Message']}


def format_json_to_html(json_data, contact_email):
    # Basic CSS styling for the HTML content
    css_style = """
    <style>
        body, html {
            width: 100%;
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .contact-info-container {
            font-family: Arial, sans-serif;
            margin-top: 20px;
            margin-bottom: 10px; /* Spacing between contact info and item container */
        }
        .contact-info {
            color: #333;
            font-size: 20px;
            text-align: center;
        }
        .item-container {
            font-family: Arial, sans-serif;
            border: 1px solid #ddd;
            padding: 10px;
            border-radius: 8px;
            background-color: #f9f9f9;
            width: 80%; /* Adjust width as needed */
            max-width: 600px; /* Adjust maximum width as needed */
            margin-bottom: 20px; /* Spacing at the bottom */
        }
        .item-header, .contact-info {
            color: #333;
            font-size: 24px;
            text-align: center;
            margin-bottom: 10px;
        }
        .item-detail {
            margin-bottom: 5px;
            text-align: center; /* Centering text */
        }
        .item-image {
            display: block;
            margin: 10px auto; /* Center image */
            max-width: 100%;
            height: auto;
        }
    </style>
    """

    # Extracting information from the JSON object
    category = json_data.get('category', 'N/A')
    condition = json_data.get('condition', 'N/A')
    description = json_data.get('description', 'N/A')
    images = json_data.get('images', [])
    item_name = json_data.get('itemName', 'N/A')
    location = json_data.get('location', 'N/A')

    # Initializing the HTML string
    html = f"""
    {css_style}
        <div class="contact-info-container">
            <div class="contact-info">Contact: <a href="mailto:{contact_email}">{contact_email}</a></div>
        </div>
        <div class="item-container">
            <div class="item-header">{json_data.get('itemName', 'N/A')}</div>
            <div class="item-detail"><strong>Category:</strong> {json_data.get('category', 'N/A')}</div>
            <div class="item-detail"><strong>Condition:</strong> {json_data.get('condition', 'N/A')}</div>
            <div class="item-detail"><strong>Description:</strong> {json_data.get('description', 'N/A')}</div>
            <div class="item-detail"><strong>Location:</strong> {json_data.get('location', 'N/A')}</div>
    """

    # Including the first image if the array is not empty
    if images:
        html += f'<img src="{images[0]}" alt="{item_name}" class="item-image">'

    # Closing the main container div
    html += "</div>"

    return html

def handler(event, context):
    try:
        event_body = parse_event_body(event['body'])
        table = get_dynamodb_table('items-30144999')
        item_id = event_body['itemID']
        item_res = table.get_item(Key={'itemID': item_id})
        item = item_res['Item']
        lenderID = item['lenderID']
        borrowerID = item['borrowerID']
        table = get_dynamodb_table('users-30144999')
        lender_res = table.get_item(Key={'userID': lenderID})
        lender = lender_res['Item']
        borrower_res = table.get_item(Key={'userID': borrowerID})
        borrower = borrower_res['Item']
        borrower_email = borrower['email']
        lender_email = lender['email']
        subject = "Borrowed Item Confirmation"
        body_type = "Html"
        body_content_for_borrower = format_json_to_html(item, lender_email)
        body_content_for_lender = format_json_to_html(item, borrower_email)
        sender = "toolshed.notifications@gmail.com"
        send_email(sender, borrower_email, subject, body_type, body_content_for_borrower)
        send_email(sender, lender_email, subject, body_type, body_content_for_lender)
        
        return {
            'statusCode': 200,
            'body': "Emails sent successfully!"
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps(str(e))
        }