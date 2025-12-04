// Custom Mermaid Theme File
mermaid.initialize({
    theme: 'dark', // Use dark theme for automatic white text
    themeVariables: {
        // General theme variables
        primaryColor: '#1a237e',
        primaryBorderColor: '#7986cb',
        secondaryColor: '#0d47a1',
        secondaryBorderColor: '#64b5f6',
        
        // Remove yellow background (tertiary) - make transparent
        tertiaryColor: 'rgba(38, 50, 56, 0.08)',
        tertiaryBorderColor: '#7986cb',
        
        // Link label background
        labelBackground: 'rgba(38, 50, 56, 0.1)',
    },
    flowchart: {
        // Default styles for flowcharts
        nodeSpacing: 30,
        rankSpacing: 40,
        curve: 'basis',
    },
});