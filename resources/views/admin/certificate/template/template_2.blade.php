<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Sertifikat - {{ $volunteerName }}</title>
    <style>
        body { font-family: 'Helvetica', 'Arial', sans-serif; text-align: center; }
        .container { border: 10px solid #4A90E2; padding: 50px; height: 90%; position: relative; }
        .main-title { font-size: 48px; color: #333; margin-bottom: 20px; }
        .subtitle { font-size: 24px; color: #555; }
        .recipient-name { font-size: 40px; color: #4A90E2; margin: 60px 0; font-weight: bold; }
        .description { font-size: 18px; color: #666; }
        .date { position: absolute; bottom: 100px; left: 50px; }
        .signature { position: absolute; bottom: 100px; right: 50px; }
    </style>
</head>
<body>
    <div class="container">
        <h1 class="main-title">SERTIFIKAT PENGHARGAAN</h1>
        <p class="subtitle">Diberikan kepada:</p>
        <p class="recipient-name">{{ $volunteerName }}</p>
        <p class="description">
            Atas partisipasinya sebagai Volunteer dalam kegiatan<br>
            <strong>{{ $missionTitle }}</strong>
        </p>
        <div class="date">
            <p><strong>Tanggal:</strong> {{ \Carbon\Carbon::parse($certificateDate)->format('d F Y') }}</p>
        </div>
        <div class="signature">
            <p><strong>{{ $certificateTitle }}</strong></p>
            <br><br><br>
            <p>_________________________</p>
            <p>( Tanda Tangan )</p>
        </div>
    </div>
</body>
</html>
