# API Setup Guide

This guide explains how to set up all required APIs for the N8N workflows.

## Required APIs

1. [Apollo (via Apify)](#apollo-via-apify)
2. [Tavily](#tavily)
3. [Google Custom Search](#google-custom-search)
4. [Twitter API](#twitter-api)
5. [Google Programmable Search](#google-programmable-search)
6. [RSS.app](#rssapp)

## Apollo (via Apify)

Apollo.io is used as an alternative to LinkedIn Sales Navigator (more cost-effective option).

1. **Apollo Setup**:
   - Create account at [Apollo.io](https://app.apollo.io/#/)
   - Navigate to Prospect & Enrich section
   - Set up your filters for people/companies
   - Create your target list
   - Copy the final URL

2. **Apify Integration**:
   - Create account at [Apify](https://apify.com/)
   - Navigate to [Apollo Scraper](https://console.apify.com/actors/dx0856bVYoGUkmXAo/input)
   - Paste your Apollo URL in the search URL input
   - Save configuration

## Tavily

1. Sign up at [Tavily](https://tavily.com)
2. Free tier includes 1000 credits
3. Copy your API key from the dashboard

## Google Custom Search API

1. **Setup Process**:
   - Visit [Google Cloud Platform](https://console.cloud.google.com)
   - Navigate to Console → APIs and Services → Library
   - Search for "Custom Search API"
   - Enable the API
   - Go to Credentials
   - Create new API credential
   - Copy your API key

## Twitter API

1. Visit [TwitterAPI Documentation](https://docs.twitterapi.io/introduction)
2. Click "Start Now"
3. Follow the registration process
4. Copy your API credentials

## Google Programmable Search

1. **Get API Key**:
   - Visit [Google Custom Search Documentation](https://developers.google.com/custom-search/v1/introduction)
   - Click "Get a Key"
   - Select your project
   - Copy the generated API key

2. **Create Search Engine**:
   - Go to [Programmable Search Engine Control Panel](https://programmablesearchengine.google.com/controlpanel/all)
   - Click "ADD"
   - Enter Search Engine Name
   - Select "Search the entire web"
   - Create and copy your Search Engine ID

## RSS.app

Used for LinkedIn data extraction:

1. Visit [RSS.app](https://rss.app/)
2. Create an account
3. Set up your LinkedIn feed
4. Copy your RSS feed URL

## Security Notes

1. Never commit API keys to version control
2. Use n8n's credential storage for all API keys
3. Regularly rotate API keys
4. Monitor API usage to stay within limits

## Usage Limits

- **Apollo/Apify**: Check Apify pricing
- **Tavily**: 1000 free credits
- **Google Custom Search**: Check current quota limits
- **Twitter API**: Review rate limits
- **RSS.app**: Check subscription limits 