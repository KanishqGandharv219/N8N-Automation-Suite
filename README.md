# N8N Workflows Collection

This repository contains a collection of n8n workflows for various automation tasks. These workflows demonstrate different integration patterns and automation scenarios using n8n.

## Workflows Included

1. **Automated Appointment Follow-up Call**
   - Automatically schedules follow-up calls for appointments
   - Integrates with Google Calendar and Retell.ai for automated calling

2. **Twitter Scraper**
   - Scrapes tweets based on search criteria
   - Stores results in Google Sheets
   - Uses Twitter API for data collection

3. **LinkedIn Automation**
   - Automates LinkedIn post scheduling
   - Integrates with Notion for content management
   - Uses OpenAI for content enhancement

4. **LinkedIn Lead Generation + Follow-up**
   - Automated lead generation from LinkedIn
   - Competitor analysis using various APIs
   - Automated follow-up system

5. **LinkedIn Profile Scraper**
   - Searches and collects LinkedIn profile data
   - Uses Google Custom Search for discovery
   - Stores results in Google Sheets

6. **Job Application Automation**
   - Automates job application process
   - RSS feed integration for job listings
   - Email automation for applications

7. **Form Follow-up Automation**
   - Handles form submissions
   - Automated response system
   - Lead qualification using AI

8. **Competitor Analysis**
   - Comprehensive competitor research automation
   - Multiple API integrations for data gathering
   - Notion integration for storing results

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the sanitization script to create clean versions of the workflows:
   ```bash
   node sanitize.js
   ```

3. Import the sanitized workflows into your n8n instance.

4. Configure the required credentials:
   - Google OAuth (Sheets, Gmail, Calendar)
   - LinkedIn OAuth
   - OpenAI API
   - Notion API
   - Twitter API
   - Other service-specific credentials

5. Update the workflow configurations with your specific:
   - API keys
   - Webhook URLs
   - Document IDs
   - Other credentials

## Required Credentials

The following credentials need to be configured in your n8n instance:

- Google OAuth2 (for Sheets, Gmail, Calendar)
- LinkedIn OAuth2
- OpenAI API
- Notion API
- Twitter API
- SerpAPI
- Retell.ai API
- Tavily API
- Firecrawl API
- Exa.ai API

## Security Note

The workflows in this repository have been sanitized to remove all sensitive information. Before using these workflows, you'll need to:

1. Set up your own credentials in n8n
2. Replace all placeholder values (e.g., 'CREDENTIAL_ID', 'YOUR_API_KEY')
3. Update webhook URLs and document IDs
4. Configure any environment-specific settings

## Contributing

Feel free to contribute to this collection by:

1. Creating new workflows
2. Improving existing workflows
3. Adding documentation
4. Reporting issues

Please ensure all sensitive information is removed before submitting pull requests.

## License

MIT License - feel free to use and modify these workflows for your own purposes. 