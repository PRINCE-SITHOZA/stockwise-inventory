# AWS Infrastructure Setup for PowerShell
param(
    [string]$StackName = "sa-warehouse-infrastructure",
    [string]$Region = "af-south-1",
    [string]$Environment = "production"
)

Write-Host "???  Setting up AWS infrastructure..." -ForegroundColor Green

# Check AWS CLI installation
try {
    $awsVersion = aws --version
    Write-Host "? AWS CLI installed: $awsVersion" -ForegroundColor Green
} catch {
    Write-Host "? AWS CLI not found. Please install AWS CLI first." -ForegroundColor Red
    Write-Host "Download from: https://aws.amazon.com/cli/" -ForegroundColor Yellow
    exit 1
}

# Check AWS credentials
try {
    $callerIdentity = aws sts get-caller-identity
    Write-Host "? AWS credentials configured" -ForegroundColor Green
} catch {
    Write-Host "? AWS credentials not configured or invalid." -ForegroundColor Red
    Write-Host "Run: aws configure" -ForegroundColor Yellow
    exit 1
}

# Create CloudFormation stack
Write-Host "?? Creating CloudFormation stack..." -ForegroundColor Yellow

$stackParams = @(
    "ParameterKey=ProjectName,ParameterValue=sa-warehouse",
    "ParameterKey=Environment,ParameterValue=$Environment"
) -join " "

$createStackCommand = "aws cloudformation create-stack --stack-name $StackName --template-body file://cloudformation.yml --parameters $stackParams --capabilities CAPABILITY_IAM --region $Region"

Write-Host "Executing: $createStackCommand" -ForegroundColor Gray
Invoke-Expression $createStackCommand

if ($LASTEXITCODE -ne 0) {
    Write-Host "? Stack creation failed!" -ForegroundColor Red
    exit 1
}

Write-Host "? Stack creation initiated successfully!" -ForegroundColor Green
Write-Host "? Waiting for stack creation to complete..." -ForegroundColor Yellow

# Wait for stack completion
do {
    Start-Sleep -Seconds 30
    $stackStatus = aws cloudformation describe-stacks --stack-name $StackName --region $Region --query "Stacks[0].StackStatus" --output text
    Write-Host "Current stack status: $stackStatus" -ForegroundColor Gray
} while ($stackStatus -eq "CREATE_IN_PROGRESS")

if ($stackStatus -eq "CREATE_COMPLETE") {
    Write-Host "? Stack creation completed successfully!" -ForegroundColor Green
    
    # Get stack outputs
    $outputs = aws cloudformation describe-stacks --stack-name $StackName --region $Region --query "Stacks[0].Outputs" --output json | ConvertFrom-Json
    
    Write-Host "`n?? Deployment Information:" -ForegroundColor Cyan
    foreach ($output in $outputs) {
        Write-Host "  $($output.Description): $($output.OutputValue)" -ForegroundColor White
    }
} else {
    Write-Host "? Stack creation failed with status: $stackStatus" -ForegroundColor Red
    Write-Host "Check AWS Console for details." -ForegroundColor Yellow
    exit 1
}
