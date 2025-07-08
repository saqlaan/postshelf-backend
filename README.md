# Postshelf Backend

A Node.js backend service that extracts information from letter content using OpenAI's GPT-4 API.

## Features

- Extract organization names and headlines from letter content
- RESTful API endpoint
- CORS enabled
- Environment variable configuration

## Setup

1. Clone the repository
```bash
git clone <your-repo-url>
cd postshelf-backend
```

2. Install dependencies
```bash
npm install
```

3. Create `.env` file with your OpenAI API key
```bash
OPENAI_API_KEY=your-api-key-here
```

4. Start the server
```bash
npm start
```

The server will start on port 5005 (or the port specified in your environment variables).

## API Endpoints

### POST /api/extract

Extracts information from letter content.

**Request Body:**
```json
{
  "letterContent": "Your letter content here"
}
```

**Response:**
```json
{
  "organization_name": "Extracted organization name or null",
  "headline": "Extracted headline or subject"
}
```

## Environment Variables

- `PORT`: Server port (default: 5005)
- `OPENAI_API_KEY`: Your OpenAI API key

## License

ISC 