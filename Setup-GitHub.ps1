<#
.SYNOPSIS
    Sets up GitHub repository for StockWise deployment
.DESCRIPTION
    Initializes git repository and sets up remote for GitHub Pages
#>

function Initialize-GitRepository {
    param(
        [string]$RepoUrl = "https://github.com/prince-sithoza/stockwise-inventory.git"
    )
    
    Write-Host "🔧 Setting up Git repository..." -ForegroundColor Cyan
    
    # Check if git is installed
    try {
        $gitVersion = git --version
        Write-Host "✅ Git found: $gitVersion" -ForegroundColor Green
    } catch {
        Write-Host "❌ Git is not installed. Please install Git first." -ForegroundColor Red
        return $false
    }
    
    # Initialize git if not already initialized
    if (-not (Test-Path ".git")) {
        Write-Host "📁 Initializing new git repository..." -ForegroundColor Yellow
        git init
        git branch -M main
    } else {
        Write-Host "✅ Git repository already initialized" -ForegroundColor Green
    }
    
    # Set up remote origin
    Write-Host "🔗 Setting up remote origin..." -ForegroundColor Yellow
    $currentRemote = git remote get-url origin 2>$null
    if ($LASTEXITCODE -ne 0) {
        git remote add origin $RepoUrl
        Write-Host "✅ Added remote origin: $RepoUrl" -ForegroundColor Green
    } else {
        Write-Host "✅ Remote origin already exists: $currentRemote" -ForegroundColor Green
    }
    
    Write-Host "✅ Git repository setup completed!" -ForegroundColor Green
    return $true
}

function Show-DeploymentInstructions {
    Write-Host "`n📋 MANUAL DEPLOYMENT INSTRUCTIONS:" -ForegroundColor Cyan
    Write-Host "=====================================" -ForegroundColor Cyan
    Write-Host "1. First, make sure you have a GitHub repository named 'stockwise-inventory'" -ForegroundColor Yellow
    Write-Host "2. Run this script to set up the git repository" -ForegroundColor Yellow
    Write-Host "3. Run the deployment script to create the HTML file and push to GitHub" -ForegroundColor Yellow
    Write-Host "4. Enable GitHub Pages in your repository settings:" -ForegroundColor Yellow
    Write-Host "   - Go to Settings > Pages" -ForegroundColor White
    Write-Host "   - Select 'Deploy from a branch'" -ForegroundColor White
    Write-Host "   - Select 'main' branch and '/ (root)' folder" -ForegroundColor White
    Write-Host "   - Click Save" -ForegroundColor White
    Write-Host "`n🌐 Your site will be available at: https://prince-sithoza.github.io/stockwise-inventory/" -ForegroundColor Green
}

# Main execution
Write-Host "🎯 StockWise GitHub Setup" -ForegroundColor Cyan
Write-Host "===============================" -ForegroundColor Cyan

$repoUrl = Read-Host "Enter your GitHub repository URL (or press Enter for default)"
if (-not $repoUrl) {
    $repoUrl = "https://github.com/prince-sithoza/stockwise-inventory.git"
}

$proceed = Read-Host "This will initialize git repository. Continue? (Y/N)"
if ($proceed -eq 'Y' -or $proceed -eq 'y') {
    $success = Initialize-GitRepository -RepoUrl $repoUrl
    if ($success) {
        Show-DeploymentInstructions
    }
} else {
    Write-Host "Setup cancelled." -ForegroundColor Yellow
}
