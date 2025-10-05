# Complete AWS Deployment Workflow for PowerShell
param(
    [string]$Environment = "production",
    [switch]$SkipInfrastructure = $false,
    [switch]$SkipTests = $false
)

Write-Host "?? SA Warehouse Enterprise - AWS Deployment" -ForegroundColor Magenta
Write-Host "==============================================" -ForegroundColor Gray

# Step 1: Check prerequisites
Write-Host "`n1. Checking prerequisites..." -ForegroundColor Cyan
powershell -File check-aws-prerequisites.ps1

if ($LASTEXITCODE -ne 0) {
    exit 1
}

# Step 2: Run tests (unless skipped)
if (-not $SkipTests) {
    Write-Host "`n2. Running tests..." -ForegroundColor Cyan
    npm test
    if ($LASTEXITCODE -ne 0) {
        Write-Host "? Tests failed! Deployment aborted." -ForegroundColor Red
        exit 1
    }
    Write-Host "? All tests passed!" -ForegroundColor Green
}

# Step 3: Set up infrastructure (unless skipped)
if (-not $SkipInfrastructure) {
    Write-Host "`n3. Setting up AWS infrastructure..." -ForegroundColor Cyan
    powershell -File setup-aws-infrastructure.ps1 -Environment $Environment
    if ($LASTEXITCODE -ne 0) {
        Write-Host "? Infrastructure setup failed!" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "`n3. Skipping infrastructure setup (using existing)" -ForegroundColor Yellow
}

# Step 4: Deploy application
Write-Host "`n4. Deploying application..." -ForegroundColor Cyan
powershell -File deploy-aws.ps1 -Environment $Environment

if ($LASTEXITCODE -ne 0) {
    Write-Host "? Application deployment failed!" -ForegroundColor Red
    exit 1
}

Write-Host "`n?? DEPLOYMENT COMPLETED SUCCESSFULLY!" -ForegroundColor Green
Write-Host "==============================================" -ForegroundColor Gray
Write-Host "Your SA Warehouse Enterprise is now live on AWS!" -ForegroundColor Cyan
Write-Host "?? Check your CloudFront URL in AWS Console" -ForegroundColor White
Write-Host "?? Monitor deployment in AWS CloudWatch" -ForegroundColor White
Write-Host "?? Next: Set up monitoring and alerts" -ForegroundColor Yellow
