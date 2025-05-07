// improved_sanitize.js - Enhanced workflow sanitization script
// This script identifies and sanitizes various types of sensitive information in n8n workflows

const fs = require('fs');
const path = require('path');

// Function to sanitize credentials and sensitive data
function sanitizeWorkflow(workflow) {
    // Deep clone the workflow to avoid modifying the original
    const sanitized = JSON.parse(JSON.stringify(workflow));

    // Function to recursively sanitize objects
    function sanitizeObject(obj) {
        if (!obj) return obj;
        
        // Handle arrays
        if (Array.isArray(obj)) {
            return obj.map(item => sanitizeObject(item));
        }

        // Handle objects
        if (typeof obj === 'object') {
            // Sanitize credentials object
            if (obj.credentials) {
                Object.keys(obj.credentials).forEach(credKey => {
                    obj.credentials[credKey] = {
                        id: 'CREDENTIAL_ID',
                        name: 'CREDENTIAL_NAME'
                    };
                });
            }
            
            // Process all object keys
            Object.keys(obj).forEach(key => {
                // Check for specific sensitive keys
                if (key === 'instanceId' || key === 'id' && typeof obj[key] === 'string' && obj[key].length > 8) {
                    obj[key] = `SANITIZED_${key.toUpperCase()}`;
                }
                
                // Sanitize authorization headers with Bearer tokens
                if (key === 'headerParameters' && obj[key]?.parameters) {
                    obj[key].parameters = obj[key].parameters.map(param => {
                        if (param.name === 'Authorization' && param.value && param.value.includes('Bearer ')) {
                            return {
                                ...param,
                                value: 'Bearer SANITIZED_API_KEY'
                            };
                        }
                        return param;
                    });
                }

                // Sanitize string values
                if (typeof obj[key] === 'string') {
                    // Sanitize API keys and tokens in URLs
                    if (obj[key].includes('token=') || obj[key].includes('api_key=')) {
                        obj[key] = obj[key].replace(/(?<=token=|api_key=)[^&]+/g, 'SANITIZED_API_KEY');
                    }
                    
                    // Sanitize Google Calendar IDs
                    if (obj[key].includes('@group.calendar.google.com')) {
                        obj[key] = 'SANITIZED_GOOGLE_CALENDAR_ID@group.calendar.google.com';
                    }
                    
                    // Sanitize phone numbers
                    if (/^\+\d[\d\s\(\)-]{8,}$/.test(obj[key])) {
                        obj[key] = '+X (XXX) XXX-XXXX';
                    }
                    
                    // Sanitize UUIDs and IDs
                    if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(obj[key])) {
                        obj[key] = 'SANITIZED_UUID';
                    }
                    
                    // Sanitize hex document IDs (32+ characters)
                    if (/^[0-9a-f]{32,}$/i.test(obj[key])) {
                        obj[key] = 'SANITIZED_DOC_ID';
                    }
                    
                    // Sanitize assistant IDs (asst_...)
                    if (/^asst_\w+$/.test(obj[key])) {
                        obj[key] = 'SANITIZED_ASSISTANT_ID';
                    }
                    
                    // Sanitize agent IDs (agent_...)
                    if (/^agent_\w+$/.test(obj[key])) {
                        obj[key] = 'SANITIZED_AGENT_ID';
                    }
                    
                    // Sanitize person IDs (short alphanumeric)
                    if (key === 'person' && /^[a-zA-Z0-9_]{8,12}$/.test(obj[key])) {
                        obj[key] = 'SANITIZED_PERSON_ID';
                    }
                    
                    // Sanitize Notion URLs
                    if (obj[key].includes('notion.so/')) {
                        obj[key] = obj[key].replace(/notion\.so\/[a-zA-Z0-9-]+/g, 'notion.so/SANITIZED_PAGE_ID');
                    }
                    
                    // Sanitize email addresses
                    if (/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(obj[key])) {
                        obj[key] = obj[key].replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, 'email@example.com');
                    }
                }

                // Recursively sanitize nested objects
                if (typeof obj[key] === 'object') {
                    obj[key] = sanitizeObject(obj[key]);
                }
            });
        }

        return obj;
    }

    // Sanitize the workflow
    const result = sanitizeObject(sanitized);
    
    // Ensure workflow ID is sanitized at the top level
    if (result.id && typeof result.id === 'string' && result.id.length > 8) {
        result.id = 'SANITIZED_WORKFLOW_ID';
    }
    
    // Ensure instance ID is sanitized at the top level
    if (result.meta?.instanceId) {
        result.meta.instanceId = 'SANITIZED_INSTANCE_ID';
    }
    
    return result;
}

// Process a single workflow file
function processSingleWorkflow(filePath) {
    console.log(`Processing ${filePath}...`);
    
    try {
        // Read the workflow file
        const workflow = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        
        // Sanitize the workflow
        const sanitized = sanitizeWorkflow(workflow);
        
        // Create sanitized directory if it doesn't exist
        const sanitizedDir = path.join(path.dirname(filePath), 'sanitized');
        if (!fs.existsSync(sanitizedDir)) {
            fs.mkdirSync(sanitizedDir);
        }
        
        // Write the sanitized workflow
        const outputPath = path.join(
            sanitizedDir, 
            path.basename(filePath)
        );
        
        fs.writeFileSync(
            outputPath,
            JSON.stringify(sanitized, null, 2)
        );
        
        console.log(`✓ Created sanitized version of ${path.basename(filePath)}`);
        return true;
    } catch (error) {
        console.error(`Error processing ${filePath}: ${error.message}`);
        return false;
    }
}

// Main function - process a specific file if provided, otherwise process all JSON files
function main() {
    const args = process.argv.slice(2);
    
    if (args.length > 0) {
        // Process specific file
        const filePath = args[0];
        if (!fs.existsSync(filePath)) {
            console.error(`Error: File not found: ${filePath}`);
            process.exit(1);
        }
        
        processSingleWorkflow(filePath);
    } else {
        // Process all JSON files in the current directory
        let processedCount = 0;
        fs.readdirSync('.').forEach(file => {
            if (file.endsWith('.json')) {
                const success = processSingleWorkflow(file);
                if (success) processedCount++;
            }
        });
        
        console.log(`\nDone! Sanitized ${processedCount} workflows into the "sanitized" directory.`);
    }
}

// Run the script
main();
