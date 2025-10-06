<#
.SYNOPSIS
    Deploys StockWise Inventory Management System to GitHub Pages
.DESCRIPTION
    This script creates the StockWise HTML file and pushes it to GitHub
.NOTES
    Author: Prince Sithoza
    Date: 2024
#>

function New-StockWiseHTML {
    # The full HTML content would go here, but for brevity, I'll show the creation step
    Write-Host "Creating StockWise HTML file..." -ForegroundColor Yellow
    
    # Let's first check if we're in the right directory
    $currentDir = Get-Location
    Write-Host "Current directory: $currentDir" -ForegroundColor Cyan
    
    # Create a simple version first to test
    $simpleHtml = @"
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>STOCKWISE - Professional Inventory Management</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background: #1a1d29;
            color: white;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
        }
        h1 {
            color: #4361ee;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>STOCKWISE INVENTORY MANAGEMENT</h1>
        <p>Professional Inventory System - Loading Full Version...</p>
        <p>If you see this, the basic deployment is working!</p>
    </div>
</body>
</html>
"@

    $simpleHtml | Out-File -FilePath "index.html" -Encoding UTF8
    Write-Host "✅ Basic HTML file created successfully!" -ForegroundColor Green
}

function Push-ToGitHub {
    param(
        [string]$CommitMessage = "Deploy StockWise Inventory System $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
    )
    
    try {
        Write-Host "📁 Adding files to git..." -ForegroundColor Yellow
        git add .

        Write-Host "💾 Committing changes..." -ForegroundColor Yellow
        git commit -m $CommitMessage

        Write-Host "🚀 Pushing to GitHub..." -ForegroundColor Yellow
        git push origin main

        Write-Host "✅ Successfully deployed to GitHub!" -ForegroundColor Green
        Write-Host "🌐 Your site should be available at: https://prince-sithoza.github.io/stockwise-inventory/" -ForegroundColor Cyan
        
    } catch {
        Write-Host "❌ Error: $($_.Exception.Message)" -ForegroundColor Red
    }
}

# Main execution
Write-Host "🎯 StockWise Deployment Script" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan

# Create the HTML file
New-StockWiseHTML

# Ask user if they want to push to GitHub
$pushChoice = Read-Host "Do you want to push to GitHub now? (Y/N)"
if ($pushChoice -eq 'Y' -or $pushChoice -eq 'y') {
    Push-ToGitHub
} else {
    Write-Host "📁 Files created locally. You can push to GitHub manually later." -ForegroundColor Yellow
}

Write-Host "🎉 Deployment process completed!" -ForegroundColor Green
