$projectRoot = "E:\ence.dev\ADK CATHODIC"
$standaloneDir = "$projectRoot\.next\standalone"
$outputZip = "$projectRoot\deploy-cathodic.zip"

Write-Host "Membuat Deployment ZIP (Standalone Mode)..." -ForegroundColor Cyan

if (Test-Path $outputZip) { Remove-Item $outputZip -Force }

$tempDir = "$env:TEMP\cathodic-deploy"
if (Test-Path $tempDir) { Remove-Item $tempDir -Recurse -Force }
New-Item -ItemType Directory -Path $tempDir | Out-Null

Write-Host "Menyalin standalone..." -ForegroundColor Yellow
Copy-Item -Path "$standaloneDir\*" -Destination $tempDir -Recurse -Force

Write-Host "Menyalin .next/static..." -ForegroundColor Yellow
$staticDst = "$tempDir\.next\static"
if (-not (Test-Path $staticDst)) { New-Item -ItemType Directory -Path $staticDst | Out-Null }
Copy-Item -Path "$projectRoot\.next\static\*" -Destination $staticDst -Recurse -Force

Write-Host "Menyalin public..." -ForegroundColor Yellow
$publicDst = "$tempDir\public"
if (-not (Test-Path $publicDst)) { New-Item -ItemType Directory -Path $publicDst | Out-Null }
Copy-Item -Path "$projectRoot\public\*" -Destination $publicDst -Recurse -Force

Write-Host "Menyalin .env..." -ForegroundColor Yellow
Copy-Item -Path "$projectRoot\.env.production" -Destination "$tempDir\.env" -Force

Write-Host "Membuat ZIP (NoCompression untuk kecepatan)..." -ForegroundColor Yellow
Compress-Archive -Path "$tempDir\*" -DestinationPath $outputZip -CompressionLevel NoCompression -Force

Remove-Item -Path $tempDir -Recurse -Force

$zipSizeMB = [math]::Round((Get-Item $outputZip).Length / 1MB, 1)
Write-Host ""
Write-Host "SELESAI! deploy-cathodic.zip ($zipSizeMB MB)" -ForegroundColor Green
Write-Host "Lokasi: $outputZip" -ForegroundColor White
Write-Host ""
Write-Host "Upload ZIP ke cPanel -> /cathodic.akbardharmakarya.com/ -> Extract" -ForegroundColor Cyan
Write-Host "Lalu setup Node.js App: startup file = server.js" -ForegroundColor Cyan
