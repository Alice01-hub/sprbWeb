# Summer Pockets Pilgrimage Website - Service Startup Script
# Simplified version - Focus on core functionality

Write-Host "Starting Summer Pockets Pilgrimage Website Services..." -ForegroundColor Green

# Check conda environment
$envName = "sprb-web"
Write-Host "Checking conda environment: $envName" -ForegroundColor Yellow

try {
    $envExists = conda env list | Select-String $envName
    if ($envExists) {
        Write-Host "Found conda environment: $envName" -ForegroundColor Green
    } else {
        Write-Host "Conda environment not found: $envName" -ForegroundColor Red
        Write-Host "Please run: conda create -n $envName python=3.11" -ForegroundColor Yellow
        exit 1
    }
} catch {
    Write-Host "Failed to check conda environment, please ensure conda is installed" -ForegroundColor Red
    exit 1
}

# Start backend service
Write-Host "Starting backend service..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; conda activate $envName; python run.py" -WindowStyle Normal

# Wait for backend to start
Write-Host "Waiting for backend service to start..." -ForegroundColor Yellow
Start-Sleep -Seconds 3

# Start frontend service
Write-Host "Starting frontend service..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm run dev" -WindowStyle Normal

# Wait for frontend to start
Write-Host "Waiting for frontend service to start..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

Write-Host "Services started successfully!" -ForegroundColor Green
Write-Host "Frontend: http://localhost:3000" -ForegroundColor Cyan
Write-Host "Backend: http://localhost:8000" -ForegroundColor Cyan
Write-Host "API Docs: http://localhost:8000/docs" -ForegroundColor Cyan
Write-Host "Press Ctrl+C to stop services" -ForegroundColor Yellow

# Keep script running
try {
    while ($true) {
        Start-Sleep -Seconds 10
    }
} catch {
    Write-Host "Services stopped" -ForegroundColor Red
}
