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
            Object.keys(obj).forEach(key => {
                // Sanitize credential IDs and names
                if (key === 'credentials') {
                    Object.keys(obj[key]).forEach(credKey => {
                        obj[key][credKey] = {
                            id: 'CREDENTIAL_ID',
                            name: 'CREDENTIAL_NAME'
                        };
                    });
                }
                
                // Sanitize API keys and tokens in URLs
                if (typeof obj[key] === 'string') {
                    // Sanitize API keys and tokens in URLs
                    if (obj[key].includes('token=') || obj[key].includes('api_key=')) {
                        obj[key] = obj[key].replace(/(?<=token=|api_key=)[^&]+/g, 'YOUR_API_KEY');
                    }
                    
                    // Sanitize document IDs
                    if (key === 'value' && obj[key].match(/^[0-9a-f]{32}$/)) {
                        obj[key] = 'DOCUMENT_ID';
                    }
                    
                    // Sanitize webhook IDs
                    if (key === 'webhookId') {
                        obj[key] = 'WEBHOOK_ID';
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

    return sanitizeObject(sanitized);
}

// Process all JSON files in the directory
fs.readdirSync('.').forEach(file => {
    if (file.endsWith('.json')) {
        console.log(`Processing ${file}...`);
        
        // Read the workflow file
        const workflow = JSON.parse(fs.readFileSync(file, 'utf8'));
        
        // Sanitize the workflow
        const sanitized = sanitizeWorkflow(workflow);
        
        // Create sanitized directory if it doesn't exist
        if (!fs.existsSync('sanitized')) {
            fs.mkdirSync('sanitized');
        }
        
        // Write the sanitized workflow
        fs.writeFileSync(
            path.join('sanitized', file),
            JSON.stringify(sanitized, null, 2)
        );
        
        console.log(`✓ Created sanitized version of ${file}`);
    }
});

console.log('\nDone! Sanitized workflows are in the "sanitized" directory.'); 