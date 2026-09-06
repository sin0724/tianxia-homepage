[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

# 시크릿은 환경변수에서 읽음 — 절대 이 파일에 하드코딩하지 마세요 (공개 리포)
# 사용법:  $env:UPLOAD_SECRET = "<Railway의 UPLOAD_SECRET 값>"; .\upload-videos.ps1
$secret = $env:UPLOAD_SECRET
if (-not $secret) {
    Write-Error "UPLOAD_SECRET 환경변수가 설정되지 않았습니다. `$env:UPLOAD_SECRET='...' 설정 후 다시 실행하세요."
    exit 1
}
$base = "https://tianxia-homepage-production.up.railway.app"

$videos = @(
    @{ file = "public\videos\hero_compressed.mp4"; name = "hero.mp4" },
    @{ file = "public\videos\about-fb_compressed.mp4"; name = "about-fb.mp4" },
    @{ file = "public\videos\about-beauty_compressed.mp4"; name = "about-beauty.mp4" },
    @{ file = "public\videos\about-hospital_compressed.mp4"; name = "about-hospital.mp4" },
    @{ file = "public\videos\shopee.mp4"; name = "shopee.mp4" },
    @{ file = "public\videos\0906.mp4"; name = "0906.mp4" }
)

foreach ($v in $videos) {
    Write-Host "Uploading $($v.name)..."
    & curl.exe -s -X POST "$base/api/upload-video" `
        -H "x-upload-secret: $secret" `
        -H "x-filename: $($v.name)" `
        -H "Content-Type: application/octet-stream" `
        --data-binary "@$($v.file)"
    Write-Host ""
    Write-Host "Done: $($v.name)"
}

Write-Host "All uploads complete!"
