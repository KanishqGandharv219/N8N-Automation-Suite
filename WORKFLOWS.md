# N8N Workflows Documentation

## Table of Contents
- [Lead Generation and Follow-up Workflow](#lead-generation-and-follow-up-workflow)
- [Lead Qualification Workflow](#lead-qualification-workflow)
- [Form Submission Follow-up Workflow](#form-submission-follow-up-workflow)
- [Job Application Automation](#job-application-automation)
- [LinkedIn Profile Search](#linkedin-profile-search)
- [Automated Appointment Follow-up Call](#automated-appointment-follow-up-call)
- [Twitter Scraper](#twitter-scraper)

## Lead Generation and Follow-up Workflow

### 1. Trigger
- **Node**: When clicking 'Test workflow'
- **Type**: Manual Trigger
- **Purpose**: Starts the workflow manually for testing or debugging

### 2. Scrape Leads
- **Node**: HTTP Request4
- **Type**: HTTP Request
- **Purpose**: Fetches CEO leads from Apollo.io using an Apify Actor
- **Configuration**:
  - URL: Apollo actor endpoint
  - Query: Filters by location and title (CEO)

### 3. Store Lead Data
- **Node**: Google Sheets
- **Type**: Google Sheets
- **Purpose**: Appends or updates Apollo lead data
- **Configuration**: 
  - Operation: Append/Update
  - Sheet Name: Linkedin candidate

[... continued documentation for each workflow component ...]

## Lead Qualification Workflow

### 1. Trigger
- **Node**: When Executed by Another Workflow
- **Type**: Execute Workflow Trigger
- **Inputs**:
  - Lead Name
  - Email
  - Message
  - Company Information
  - Qualified (boolean)

[... continued documentation for each workflow ...]

## Google Sheets Structure

### Lead Management Sheet
- **Purpose**: Raw Apollo lead data
- **Columns**:
  - Company Name
  - Contact Details
  - Lead Status
  - Follow-up Notes

### Analysis Sheet
- **Purpose**: AI Emails and Company Analysis
- **Columns**:
  - Company
  - Analysis Results
  - Generated Email Content

### Research Sheet
- **Purpose**: Competitor Data
- **Columns**:
  - Company
  - Competitor Information
  - Market Analysis

### Social Data Sheet
- **Purpose**: Twitter content tracking
- **Columns**:
  - Company
  - Tweet Content
  - Engagement Metrics

## Node Configurations

### OpenAI Nodes
- **Model**: gpt-4o-mini
- **Temperature**: 0 (for consistent outputs)
- **Purpose**: Business analysis and email generation

### HTTP Request Nodes
- **Rate Limiting**: Implemented via Wait nodes
- **Error Handling**: Includes retry logic
- **Authentication**: Uses credential storage

### Google Sheets Nodes
- **Operation Types**: 
  - Append
  - Update
  - Lookup
- **Error Handling**: Includes duplicate checking 