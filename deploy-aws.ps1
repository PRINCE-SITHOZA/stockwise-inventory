# AWS Deployment Script for PowerShell
param(
    [string]$Environment = "production",
    [string]$Region = "af-south-1"
)

Write-Host "?? Starting AWS deployment..." -ForegroundColor Green

# Load environment variables
$envFile = ".env.aws"
if (Test-Path $envFile) {
    Get-Content $envFile | ForEach-Object {
        if ($_ -match "^(?!\s*#)(.+?)=(.+)$") {
            $key = $matches[1].Trim()
            $value = $matches[2].Trim()
            [Environment]::SetEnvironmentVariable($key, $value)
        }
    }
}

# Check AWS credentials
if (-not $env:AWS_ACCESS_KEY_ID -or -not $env:AWS_SECRET_ACCESS_KEY) {
    Write-Host "? AWS credentials not found. Please set AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY environment variables." -ForegroundColor Red
    exit 1
}

# Build the application
Write-Host "?? Building application..." -ForegroundColor Yellow
npm run build:production

if ($LASTEXITCODE -ne 0) {
    Write-Host "? Build failed!" -ForegroundColor Red
    exit 1
}

# Deploy to AWS
Write-Host "??  Deploying to AWS S3..." -ForegroundColor Yellow
node scripts/aws-deploy.js

if ($LASTEXITCODE -ne 0) {
    Write-Host "? Deployment failed!" -ForegroundColor Red
    exit 1
}

Write-Host "? Deployment completed successfully!" -ForegroundColor Green
Write-Host "?? Your application is now live on AWS!" -ForegroundColor Cyan
