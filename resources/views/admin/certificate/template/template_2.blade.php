<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sertifikat Prestasi</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        body {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background: linear-gradient(135deg, #4CAF50 0%, #81C784 50%, #A5D6A7 100%);
            padding: 20px;
        }

        .certificate-container {
            width: 100%;
            max-width: 1200px;
            position: relative;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
            border-radius: 12px;
            overflow: hidden;
        }

        .certificate {
            position: relative;
            width: 100%;
            height: 0;
            padding-bottom: 70.7%; /* Aspect ratio A4 landscape */
            background: linear-gradient(145deg, #f1f8e9, #e8f5e8);
            background-image:
                radial-gradient(circle at 15% 25%, rgba(76, 175, 80, 0.08) 0%, transparent 20%),
                radial-gradient(circle at 85% 75%, rgba(129, 199, 132, 0.08) 0%, transparent 20%),
                radial-gradient(circle at 50% 50%, rgba(165, 214, 167, 0.05) 0%, transparent 30%);
            border: 15px solid #66BB6A;
            box-shadow: inset 0 0 30px rgba(76, 175, 80, 0.1);
        }

        .certificate-content {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            padding: 40px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
        }

        .header {
            margin-bottom: 25px;
        }

        .header h1 {
            font-size: 42px;
            color: #2E7D32;
            letter-spacing: 6px;
            text-transform: uppercase;
            margin-bottom: 8px;
            text-shadow: 0 3px 6px rgba(46, 125, 50, 0.2);
            font-weight: 700;
        }

        .header p {
            font-size: 20px;
            color: #388E3C;
            font-weight: 600;
            letter-spacing: 1.5px;
        }

        .main-content {
            margin: 30px 0;
            max-width: 750px;
            padding: 0 20px;
        }

        .main-content p {
            font-size: 18px;
            color: #2E7D32;
            line-height: 1.6;
            margin-bottom: 20px;
            font-weight: 500;
        }

        .name {
            font-size: 44px;
            font-weight: 800;
            color: #1B5E20;
            margin: 25px 0;
            padding: 12px 40px;
            border-bottom: 4px solid #66BB6A;
            border-top: 2px solid #A5D6A7;
            display: inline-block;
            text-transform: uppercase;
            letter-spacing: 2px;
            background: rgba(165, 214, 167, 0.1);
            border-radius: 8px;
        }

        .event-name {
            font-size: 28px;
            color: #2E7D32;
            font-weight: 700;
            margin: 18px 0;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            background: linear-gradient(90deg, #4CAF50, #66BB6A);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .footer {
            width: 100%;
            display: flex;
            justify-content: space-between;
            margin-top: 35px;
            padding: 0 80px;
        }

        .signature {
            text-align: center;
            margin-top: 20px;
        }

        .signature p {
            font-size: 16px;
            color: #2E7D32;
            margin-top: 50px;
            font-weight: 600;
        }

        .signature-line {
            width: 220px;
            height: 2px;
            background: linear-gradient(90deg, #4CAF50, #66BB6A);
            margin: 0 auto;
            margin-top: 60px;
            border-radius: 1px;
        }

        .code-section {
            margin-top: 30px;
            background: linear-gradient(145deg, rgba(165, 214, 167, 0.15), rgba(129, 199, 132, 0.15));
            padding: 20px 30px;
            border-radius: 12px;
            border: 2px dashed #66BB6A;
            box-shadow: 0 4px 15px rgba(76, 175, 80, 0.1);
        }

        .code-section p {
            font-size: 16px;
            color: #2E7D32;
            margin-bottom: 8px;
            font-weight: 600;
        }

        .code {
            font-family: 'Courier New', monospace;
            font-size: 20px;
            font-weight: bold;
            color: #1B5E20;
            letter-spacing: 2px;
            background: rgba(255, 255, 255, 0.7);
            padding: 8px 16px;
            border-radius: 6px;
            display: inline-block;
        }

        .date {
            font-size: 16px;
            color: #388E3C;
            margin-top: 8px;
            font-weight: 500;
        }

        .logo {
            position: absolute;
            top: 30px;
            left: 30px;
            width: 100px;
            height: 100px;
            background: linear-gradient(145deg, #ffffff, #f5f5f5);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 8px 25px rgba(76, 175, 80, 0.2);
            border: 3px solid #66BB6A;
        }

        .logo img {
            width: 70%;
            height: 70%;
            object-fit: contain;
        }

        .watermark {
            position: absolute;
            opacity: 0.04;
            font-size: 160px;
            font-weight: 900;
            color: #4CAF50;
            transform: translate(-50%, -50%) rotate(-25deg);
            top: 50%;
            left: 50%;
            pointer-events: none;
            z-index: 0;
            user-select: none;
            letter-spacing: 8px;
        }

        .decoration {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            pointer-events: none;
            z-index: 1;
        }

        .corner {
            position: absolute;
            width: 80px;
            height: 80px;
        }

        .top-left {
            top: 25px;
            left: 25px;
            border-top: 4px solid #66BB6A;
            border-left: 4px solid #66BB6A;
            border-radius: 4px 0 0 0;
        }

        .top-right {
            top: 25px;
            right: 25px;
            border-top: 4px solid #66BB6A;
            border-right: 4px solid #66BB6A;
            border-radius: 0 4px 0 0;
        }

        .bottom-left {
            bottom: 25px;
            left: 25px;
            border-bottom: 4px solid #66BB6A;
            border-left: 4px solid #66BB6A;
            border-radius: 0 0 0 4px;
        }

        .bottom-right {
            bottom: 25px;
            right: 25px;
            border-bottom: 4px solid #66BB6A;
            border-right: 4px solid #66BB6A;
            border-radius: 0 0 4px 0;
        }

        /* Tambahan dekorasi */
        .certificate::before {
            content: '';
            position: absolute;
            top: 10px;
            left: 10px;
            right: 10px;
            bottom: 10px;
            border: 1px solid rgba(102, 187, 106, 0.3);
            border-radius: 6px;
            pointer-events: none;
        }

        @media print {
            body {
                background: none;
                padding: 0;
            }

            .certificate-container {
                box-shadow: none;
                max-width: 100%;
            }
        }

        @media (max-width: 768px) {
            .certificate-content {
                padding: 25px;
            }

            .header h1 {
                font-size: 32px;
                letter-spacing: 4px;
            }

            .name {
                font-size: 32px;
                padding: 10px 25px;
            }

            .event-name {
                font-size: 22px;
            }

            .footer {
                padding: 0 40px;
                flex-direction: column;
                gap: 30px;
            }

            .logo {
                width: 80px;
                height: 80px;
                top: 20px;
                left: 20px;
            }
        }
    </style>
</head>
<body>
    <div class="certificate-container">
        <div class="certificate">
            <div class="decoration">
                <div class="corner top-left"></div>
                <div class="corner top-right"></div>
                <div class="corner bottom-left"></div>
                <div class="corner bottom-right"></div>
            </div>

            <div class="watermark">SERTIFIKAT</div>

            <div class="certificate-content">
                <div class="logo">
                    <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2366BB6A'%3E%3Cpath d='M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z'/%3E%3C/svg%3E" alt="Logo">
                </div>

                <div class="header">
                    <h1>Sertifikat Prestasi</h1>
                    <p>Diberikan kepada:</p>
                </div>

                <div class="name" id="nama">John Doe</div>

                <div class="main-content">
                    <p>Atas partisipasi dan prestasi luar biasa dalam kegiatan</p>
                    <div class="event-name" id="nama-event">Web Development Masterclass 2023</div>
                    <p>Yang diselenggarakan pada tanggal 15-17 November 2023 secara online</p>
                </div>

                <div class="code-section">
                    <p>Kode Verifikasi Sertifikat:</p>
                    <div class="code" id="code">SERT-2023-WDMC-8765</div>
                    <div class="date" id="tanggal-dibuat">Diterbitkan pada: 20 November 2023</div>
                </div>

                <div class="footer">
                    <div class="signature">
                        <div class="signature-line"></div>
                        <p>Direktur Pelaksana</p>
                    </div>

                    <div class="signature">
                        <div class="signature-line"></div>
                        <p>Ketua Panitia</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        // Fungsi untuk mengupdate data sertifikat
        function updateCertificate() {
            // Mengambil nilai dari URL parameter jika ada
            const urlParams = new URLSearchParams(window.location.search);

            // Mengupdate data sertifikat
            document.getElementById('nama').textContent = urlParams.get('nama') || 'John Doe';
            document.getElementById('nama-event').textContent = urlParams.get('event') || 'Web Development Masterclass 2023';
            document.getElementById('code').textContent = urlParams.get('code') || 'SERT-2023-WDMC-8765';
            document.getElementById('tanggal-dibuat').textContent = 'Diterbitkan pada: ' + (urlParams.get('tanggal') || '20 November 2023');
        }

        // Panggil fungsi saat halaman dimuat
        window.onload = updateCertificate;
    </script>
</body>
</html>
