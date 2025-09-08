# Temporary npm fix script
function npm {
    param(
        [Parameter(ValueFromRemainingArguments = $true)]
        [string[]]$Arguments
    )
    
    $npmPath = Join-Path $PSScriptRoot "package\bin\npm-cli.js"
    if (Test-Path $npmPath) {
        & node $npmPath @Arguments
    } else {
        Write-Error "npm-cli.js not found at $npmPath"
    }
}

Write-Host "npm function loaded. You can now use 'npm' commands." -ForegroundColor Green
Write-Host "To make this permanent, add the following to your PowerShell profile:" -ForegroundColor Yellow
Write-Host "`$env:PATH += ';$PSScriptRoot'" -ForegroundColor Cyan
