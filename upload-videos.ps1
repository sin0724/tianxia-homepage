$secret = "upload-tianxia-2024"
$base = "https://tianxia-homepage-production.up.railway.app"

$videos = @(
    @{ file = ".\public\videos\hero_compressed.mp4"; name = "hero.mp4" },
    @{ file = ".\public\videos\about-fb_compressed.mp4"; name = "about-fb.mp4" },
    @{ file = ".\public\videos\about-beauty_compressed.mp4"; name = "about-beauty.mp4" },
    @{ file = ".\public\videos\about-hospital_compressed.mp4"; name = "about-hospital.mp4" }
)

foreach ($v in $videos) {
    Write-Host "Uploading $($v.name)..."
    $result = Invoke-RestMethod `
        -Uri "$base/api/upload-video" `
        -Method POST `
        -InFile $v.file `
        -ContentType "application/octet-stream" `
        -Headers @{ "x-upload-secret" = $secret; "x-filename" = $v.name }
    Write-Host "Done: $($result | ConvertTo-Json)"
}

Write-Host "All uploads complete!"
