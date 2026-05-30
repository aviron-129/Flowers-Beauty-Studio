$folder = "c:\flowers-салон\public\flower-photos-2"
New-Item -ItemType Directory -Force -Path $folder | Out-Null

$headers = @{ "User-Agent" = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" }

$hashes = @{}
Get-ChildItem "c:\flowers-салон\public\flower-photos" -Filter "*.jpg" -ErrorAction SilentlyContinue | ForEach-Object {
  $hashes[(Get-FileHash $_.FullName).Hash] = $true
}

$pexelsIds = @(
  4504755,4504756,4504757,4504758,4504759,4504760,4504761,4504762,4504763,4504764,
  4502965,4502966,4502967,4502968,4502969,4502970,4502971,4502972,4502973,4502974,
  4473087,4473088,4473089,4449451,4449452,4449453,4452287,4452288,4466705,4466706,
  4484576,4484577,4490117,4490118,4494642,4510024,4520100,4531204,4545186,4557626,
  4567885,4582490,4593310,4601115,4610218,4622085,4630240,4643107,4653450,4660475,
  4670265,4682140,4690448,4700291,4711733,4722388,4732510,4743595,4750382,4762065,
  4773190,4782256,4793604,4807542,4817167,4827000,4836467,4846189,4856669,4866546,
  4876660,4885948,4895404,4904541,4914108,4924436,4933905,4943833,
  289208,289645,613097,1695371,302810,157886,185656,244414,
  931163,931164,931165,931166,2879823,2879825,1457810,1457813,
  1529850,1529854,1181515,1181517,1061145,1129650,2079975,2079978,
  3771635,3771638,4197435,4197437,5677988,5677994,5686880,5686882,
  3689785,3689787,1158675,1158677,931150,931152,931156,
  1029630,1029632,6284870,6284872,6284874,3641055,1071880,931045,
  404123,404125,404127,404129,404131,404133,404135,404137,404140,
  265857,265859,266797,267416,268419,269258,270348,271290,272444,273664,
  274574,275255,276267,277454,278507,279573,280573,281573,282573,283573,
  284573,285573,286573,287573,288573,290573,291573,292573,293573,294573,
  295573,296573,297573,298573,299573,300573,301573,303573,304573,305573,
  306573,307573,308573,309573,310573,311573,312573,313573,314573,315573,
  316573,317573,318573,319573,320573,321573,322573,323573,324573,325573,
  326573,327573,328573,329573,330573,331573,332573,333573,334573,335573,
  336573,337573,338573,339573,340573,341573,342573,343573,344573,345573,
  25430799,25430800,25430801,27419952,27419953,27419954
)

$unsplash = @(
  "photo-1572454591674-2739f30d8c40","photo-1523693916022-7d144a2b7d","photo-1458920309815-954b584cf600",
  "photo-1519378058454-844a65949470","photo-1582793988959-11ea64727d92","photo-1561181286-d4624fac8f85",
  "photo-1518895949257-762f3673e6a4","photo-1487075108327-dcb0614a0b9e","photo-1562690868-4d8a7deb52c4",
  "photo-1508610048655-a06b669a39ae","photo-1592150621744-aca20da19c21","photo-1567225597155-75e53f69326f",
  "photo-1526047932273-341f58a3be51","photo-1455659817273-f96807779a3a","photo-1520763183423-f8867f567146",
  "photo-1562682451-8ed9ea5abc55","photo-1470509037660-2534937c12c5","photo-1496062031456-07a8aac258f0",
  "photo-1518894781327-4e9223bb9c55","photo-1462275646658-60b8e9e9e3ea","photo-1487550524285-726944f7e429",
  "photo-1495360010541-f48722b34f7d","photo-1501004318641-b39e6381bec6","photo-1525318799473-31d0906e8c7a",
  "photo-1533616688419-b7a585564325","photo-1545249390-6bdfa286032f","photo-1558618666-fcd25c85cd64",
  "photo-1563241527-773927059669","photo-1578662996442-48f601aeace8","photo-1586023492125-27b2c045efd7",
  "photo-1591886963788-632d271e4d0a","photo-1606041008023-4729775e2693","photo-1610631527038-6b596d2a5d2e",
  "photo-1616047006789-d2835d7b8b6a","photo-1622467826316-99680a2a2c2a","photo-1631670648848-a9774a8a4e8a"
)

$pixabay = @(
  "https://cdn.pixabay.com/photo/2013/07/31/bouquet-flowers-flower-arrangement-168831_1280.jpg",
  "https://cdn.pixabay.com/photo/2015/04/19/08/32/rose-729510_1280.jpg",
  "https://cdn.pixabay.com/photo/2018/02/08/22/27/flower-3140492_1280.jpg",
  "https://cdn.pixabay.com/photo/2016/11/29/09/16/flowers-1868771_1280.jpg",
  "https://cdn.pixabay.com/photo/2014/05/26/10/25/flower-348252_1280.jpg",
  "https://cdn.pixabay.com/photo/2018/04/05/14/01/rose-3293602_1280.jpg",
  "https://cdn.pixabay.com/photo/2020/04/09/16/19/flowers-5015506_1280.jpg",
  "https://cdn.pixabay.com/photo/2016/05/04/10/32/flowers-1371326_1280.jpg",
  "https://cdn.pixabay.com/photo/2015/09/02/13/25/sunflower-918507_1280.jpg",
  "https://cdn.pixabay.com/photo/2016/07/16/18/22/tulip-1518284_1280.jpg",
  "https://cdn.pixabay.com/photo/2017/02/15/13/40/tulips-2068692_1280.jpg",
  "https://cdn.pixabay.com/photo/2018/01/29/07/47/pink-3111835_1280.jpg",
  "https://cdn.pixabay.com/photo/2017/01/31/14/30/flowers-2027857_1280.jpg",
  "https://cdn.pixabay.com/photo/2018/03/28/09/47/magnolia-3268689_1280.jpg",
  "https://cdn.pixabay.com/photo/2016/07/07/21/07/wedding-1501615_1280.jpg",
  "https://cdn.pixabay.com/photo/2015/04/06/22/35/water-lily-71169_1280.jpg",
  "https://cdn.pixabay.com/photo/2016/11/29/03/53/flowers-1868725_1280.jpg",
  "https://cdn.pixabay.com/photo/2016/05/04/10/32/flowers-1371328_1280.jpg",
  "https://cdn.pixabay.com/photo/2018/01/04/09/31/roses-3052477_1280.jpg",
  "https://cdn.pixabay.com/photo/2017/02/08/08/20/flowers-2046550_1280.jpg",
  "https://cdn.pixabay.com/photo/2016/11/29/08/41/flower-1868680_1280.jpg",
  "https://cdn.pixabay.com/photo/2017/07/08/14/02/adult-2527458_1280.jpg",
  "https://cdn.pixabay.com/photo/2018/05/18/15/16/wedding-3415532_1280.jpg",
  "https://cdn.pixabay.com/photo/2017/08/02/01/01/living-room-2569325_1280.jpg",
  "https://cdn.pixabay.com/photo/2016/03/09/09/47/workplace-1245778_1280.jpg"
)

$count = 0
$target = 100

foreach ($id in $pexelsIds) {
  if ($count -ge $target) { break }
  $url = "https://images.pexels.com/photos/$id/pexels-photo-$id.jpeg?auto=compress&cs=tinysrgb&w=1200"
  $tmp = Join-Path $folder "_t.jpg"
  try {
    Invoke-WebRequest -Uri $url -OutFile $tmp -Headers $headers -UseBasicParsing -TimeoutSec 35 | Out-Null
    if ((Get-Item $tmp).Length -lt 18000) { Remove-Item $tmp; continue }
    $h = (Get-FileHash $tmp).Hash
    if ($hashes.ContainsKey($h)) { Remove-Item $tmp; continue }
    $count++
    Move-Item $tmp (Join-Path $folder ("florist-{0:D3}.jpg" -f $count)) -Force
    $hashes[$h] = $true
    if ($count % 10 -eq 0) { Write-Host "Progress: $count" }
  } catch { if (Test-Path $tmp) { Remove-Item $tmp } }
}

foreach ($slug in $unsplash) {
  if ($count -ge $target) { break }
  $url = "https://images.unsplash.com/$slug?fm=jpg&q=85&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3"
  $tmp = Join-Path $folder "_t.jpg"
  try {
    Invoke-WebRequest -Uri $url -OutFile $tmp -Headers $headers -UseBasicParsing -TimeoutSec 35 | Out-Null
    if ((Get-Item $tmp).Length -lt 18000) { Remove-Item $tmp; continue }
    $h = (Get-FileHash $tmp).Hash
    if ($hashes.ContainsKey($h)) { Remove-Item $tmp; continue }
    $count++
    Move-Item $tmp (Join-Path $folder ("florist-{0:D3}.jpg" -f $count)) -Force
    $hashes[$h] = $true
    if ($count % 10 -eq 0) { Write-Host "Progress: $count" }
  } catch { if (Test-Path $tmp) { Remove-Item $tmp } }
}

foreach ($url in $pixabay) {
  if ($count -ge $target) { break }
  $tmp = Join-Path $folder "_t.jpg"
  try {
    Invoke-WebRequest -Uri $url -OutFile $tmp -Headers $headers -UseBasicParsing -TimeoutSec 35 | Out-Null
    if ((Get-Item $tmp).Length -lt 18000) { Remove-Item $tmp; continue }
    $h = (Get-FileHash $tmp).Hash
    if ($hashes.ContainsKey($h)) { Remove-Item $tmp; continue }
    $count++
    Move-Item $tmp (Join-Path $folder ("florist-{0:D3}.jpg" -f $count)) -Force
    $hashes[$h] = $true
    if ($count % 10 -eq 0) { Write-Host "Progress: $count" }
  } catch { if (Test-Path $tmp) { Remove-Item $tmp } }
}

Write-Host "DONE: $count photos"
Get-ChildItem $folder -Filter "florist-*.jpg" | Get-FileHash | Group-Object Hash | Where-Object { $_.Count -gt 1 } | ForEach-Object { Write-Host "DUP!" }
Write-Host "Count:" (Get-ChildItem $folder -Filter "florist-*.jpg").Count
