# AWS Configuration Check for PowerShell
Write-Host "?? Checking AWS Configuration..." -ForegroundColor Cyan

# Check Node.js
try {
    $nodeVersion = node --version
    Write-Host "? Node.js: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "? Node.js not installed" -ForegroundColor Red
    exit 1
}

# Check npm
try {
    $npmVersion = npm --version
    Write-Host "? npm: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "? npm not available" -ForegroundColor Red
    exit 1
}

# Check AWS CLI
try {
    $awsVersion = aws --version
    Write-Host "? AWS CLI: $awsVersion" -ForegroundColor Green
} catch {
    Write-Host "? AWS CLI not installed" -ForegroundColor Red
    Write-Host "?? Download from: https://aws.amazon.com/cli/" -ForegroundColor Yellow
    exit 1
}

# Check AWS credentials
try {
    $callerIdentity = aws sts get-caller-identity
    $accountId = ($callerIdentity | ConvertFrom-Json).Account
    $userId = ($callerIdentity | ConvertFrom-Json).UserId
    Write-Host "? AWS Credentials: Valid (Account: $accountId, User: $userId)" -ForegroundColor Green
} catch {
    Write-Host "? AWS credentials invalid or not configured" -ForegroundColor Red
    Write-Host "?? Run: aws configure" -ForegroundColor Yellow
    exit 1
}

# Check required environment variables
$requiredVars = @("AWS_ACCESS_KEY_ID", "AWS_SECRET_ACCESS_KEY")
$missingVars = @()

foreach ($var in $requiredVars) {
    if (-not [Environment]::GetEnvironmentVariable($var)) {
        $missingVars += $var
    }
}

if ($missingVars.Count -gt 0) {
    Write-Host "? Missing environment variables: $($missingVars -join ', ')" -ForegroundColor Red
    Write-Host "?? Set them in .env.aws file or system environment variables" -ForegroundColor Yellow
    exit 1
}

Write-Host "`n?? All prerequisites are satisfied!" -ForegroundColor Green
Write-Host "You're ready to deploy to AWS!" -ForegroundColor Cyan
