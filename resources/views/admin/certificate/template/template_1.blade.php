<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sertifikat 1!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sertifikat Tema Alam</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Open+Sans:wght@300;400;600&display=swap');

        body {
            margin: 0;
            padding: 40px 20px;
            background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #bbf7d0 100%);
            font-family: 'Open Sans', sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
        }

        .certificate {
            width: 800px;
            height: 600px;
            background: linear-gradient(135deg, #ffffff 0%, #f9fffe 100%);
            position: relative;
            box-shadow: 0 20px 60px rgba(6, 88, 63, 0.15);
            border-radius: 20px;
            overflow: hidden;
            border: 3px solid #06583f;
        }

        .certificate::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 120px;
            background: linear-gradient(135deg, #06583f 0%, #059669 30%, #10b981 70%, #34d399 100%);
            clip-path: polygon(0 0, 100% 0, 100% 70%, 50% 100%, 0 70%);
            z-index: 1;
        }

        .certificate::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 80px;
            background: linear-gradient(45deg, #06583f 0%, #059669 30%, #10b981 70%, #34d399 100%);
            clip-path: polygon(0 30%, 50% 0, 100% 30%, 100% 100%, 0 100%);
            z-index: 1;
        }

        .leaf-decoration {
            position: absolute;
            z-index: 2;
        }

        .leaf-svg {
            width: 40px;
            height: 40px;
            filter: drop-shadow(2px 2px 4px rgba(6, 88, 63, 0.2));
        }

        .leaf-1 {
            top: 140px;
            left: 30px;
            transform: rotate(-15deg);
        }

        .leaf-2 {
            top: 180px;
            right: 40px;
            transform: rotate(25deg);
        }

        .leaf-3 {
            bottom: 140px;
            left: 50px;
            transform: rotate(45deg);
        }

        .leaf-4 {
            bottom: 160px;
            right: 60px;
            transform: rotate(-30deg);
        }

        .leaf-5 {
            top: 200px;
            left: 150px;
            transform: rotate(60deg);
        }

        .leaf-6 {
            bottom: 180px;
            right: 150px;
            transform: rotate(-45deg);
        }

        .branch-decoration {
            position: absolute;
            top: 120px;
            right: 20px;
            z-index: 2;
            transform: rotate(15deg);
        }

        .branch-svg {
            width: 80px;
            height: 120px;
            filter: drop-shadow(2px 2px 4px rgba(6, 88, 63, 0.15));
        }

        .nature-pattern {
            position: absolute;
            top: 20px;
            left: 20px;
            right: 20px;
            bottom: 20px;
            border: 2px solid #a7f3d0;
            border-radius: 15px;
            z-index: 2;
            background-image:
                radial-gradient(circle at 20% 30%, rgba(16, 185, 129, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 70%, rgba(52, 211, 153, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 40% 80%, rgba(6, 88, 63, 0.05) 0%, transparent 50%);
        }

        .content {
            position: relative;
            z-index: 3;
            padding: 140px 60px 100px;
            text-align: center;
            height: calc(100% - 240px);
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        .logo {
            position: absolute;
            top: 30px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 4;
            background: white;
            padding: 15px 30px;
            border-radius: 50px;
            box-shadow: 0 5px 20px rgba(6, 88, 63, 0.2);
            border: 2px solid #06583f;
        }

        .logo-text {
            font-size: 18px;
            font-weight: 700;
            color: #06583f;
            letter-spacing: 2px;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .logo-text::before {
            content: '';
            display: inline-block;
            width: 20px;
            height: 20px;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><linearGradient id="logoLeaf" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%2334d399"/><stop offset="100%" style="stop-color:%23059669"/></linearGradient></defs><path d="M50 10 C30 20, 30 40, 50 60 C70 40, 70 20, 50 10 Z" fill="url(%23logoLeaf)" stroke="%2306583f" stroke-width="2"/><line x1="50" y1="10" x2="50" y2="60" stroke="%23047857" stroke-width="2"/></svg>') no-repeat center;
            background-size: contain;
            margin-right: 8px;
        }

        .certificate-title {
            font-family: 'Playfair Display', serif;
            font-size: 48px;
            font-weight: 700;
            color: #06583f;
            margin-bottom: 10px;
            text-shadow: 2px 2px 4px rgba(6, 88, 63, 0.1);
            position: relative;
        }

        .certificate-title::before,
        .certificate-title::after {
            content: '🌿';
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            font-size: 24px;
            color: #10b981;
        }

        .certificate-title::before {
            left: -40px;
        }

        .certificate-title::after {
            right: -40px;
            transform: translateY(-50%) scaleX(-1);
        }

        .certificate-subtitle {
            font-size: 18px;
            color: #047857;
            font-weight: 400;
            margin-bottom: 40px;
            letter-spacing: 3px;
            text-transform: uppercase;
            position: relative;
        }

        .certificate-subtitle::before {
            content: '';
            position: absolute;
            bottom: -10px;
            left: 50%;
            transform: translateX(-50%);
            width: 100px;
            height: 2px;
            background: linear-gradient(90deg, transparent, #10b981, transparent);
        }

        .recipient-section {
            margin: 40px 0;
        }

        .recipient-text {
            font-size: 16px;
            color: #065f46;
            margin-bottom: 15px;
            font-weight: 400;
        }

        .recipient-name {
            font-family: 'Playfair Display', serif;
            font-size: 42px;
            font-weight: 700;
            color: #dc7c00;
            margin: 20px 0;
            text-shadow: 1px 1px 2px rgba(220, 124, 0, 0.1);
            position: relative;
        }

        .recipient-name::before,
        .recipient-name::after {
            content: '';
            position: absolute;
            top: 50%;
            width: 80px;
            height: 1px;
            background: linear-gradient(90deg, transparent, #10b981, transparent);
        }

        .recipient-name::before {
            left: -100px;
        }

        .recipient-name::after {
            right: -100px;
        }

        .achievement-text {
            font-size: 16px;
            color: #065f46;
            line-height: 1.6;
            margin: 30px 0;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
            font-weight: 300;
        }

        .signature-section {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            margin-top: 50px;
            position: relative;
        }

        .date-section {
            text-align: left;
        }

        .date-label {
            font-size: 12px;
            color: #047857;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 5px;
            font-weight: 600;
        }

        .date-value {
            font-size: 16px;
            color: #06583f;
            font-weight: 600;
        }

        .signature {
            text-align: center;
        }

        .signature-line {
            width: 200px;
            height: 2px;
            background: linear-gradient(90deg, transparent, #06583f, transparent);
            margin: 0 auto 10px;
        }

        .signature-name {
            font-size: 16px;
            font-weight: 600;
            color: #06583f;
            margin-bottom: 5px;
        }

        .signature-title {
            font-size: 12px;
            color: #047857;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .certificate-id {
            position: absolute;
            bottom: 20px;
            right: 30px;
            font-size: 10px;
            color: #6b7280;
            z-index: 4;
        }

        .nature-seal {
            position: absolute;
            bottom: 120px;
            right: 80px;
            width: 80px;
            height: 80px;
            background: radial-gradient(circle, #06583f 0%, #10b981 100%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 5px 20px rgba(6, 88, 63, 0.3);
            z-index: 4;
            border: 3px solid #34d399;
        }

        .nature-seal::before {
            content: '';
            width: 30px;
            height: 30px;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><linearGradient id="sealLeaf" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%23ffffff"/><stop offset="100%" style="stop-color:%23f0fdf4"/></linearGradient></defs><path d="M50 15 C35 25, 30 45, 45 65 C50 70, 55 70, 60 65 C75 45, 70 25, 50 15 Z" fill="url(%23sealLeaf)"/><line x1="50" y1="15" x2="52" y2="65" stroke="%23ffffff" stroke-width="2"/><path d="M50 25 Q42 35, 50 45" stroke="%23ffffff" stroke-width="1" fill="none"/><path d="M50 35 Q58 45, 50 55" stroke="%23ffffff" stroke-width="1" fill="none"/></svg>') no-repeat center;
            background-size: contain;
        }

        .tree-decoration {
            position: absolute;
            bottom: 50px;
            left: 50px;
            font-size: 40px;
            color: #10b981;
            opacity: 0.3;
            z-index: 2;
        }

        .mountain-decoration {
            position: absolute;
            top: 150px;
            left: 20px;
            font-size: 30px;
            color: #047857;
            opacity: 0.4;
            z-index: 2;
        }

        @media print {
            body {
                background: white;
                padding: 0;
            }

            .certificate {
                box-shadow: none;
                border: 2px solid #06583f;
            }
        }
    </style>
</head>
<body>
    <div class="certificate">
        <div class="nature-pattern"></div>

        <!-- Dekorasi daun realistis -->
        <div class="leaf-decoration leaf-1">
            <svg class="leaf-svg" viewBox="0 0 100 100">
                <defs>
                    <linearGradient id="leafGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#34d399;stop-opacity:1" />
                        <stop offset="50%" style="stop-color:#10b981;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#059669;stop-opacity:1" />
                    </linearGradient>
                </defs>
                <path d="M50 5 C30 20, 30 40, 50 55 C70 40, 70 20, 50 5 Z" fill="url(#leafGradient1)" stroke="#06583f" stroke-width="1"/>
                <line x1="50" y1="5" x2="50" y2="55" stroke="#047857" stroke-width="1.5"/>
                <path d="M50 15 Q40 25, 50 35" stroke="#047857" stroke-width="0.8" fill="none"/>
                <path d="M50 25 Q60 35, 50 45" stroke="#047857" stroke-width="0.8" fill="none"/>
            </svg>
        </div>

        <div class="leaf-decoration leaf-2">
            <svg class="leaf-svg" viewBox="0 0 100 100">
                <defs>
                    <linearGradient id="leafGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#4ade80;stop-opacity:1" />
                        <stop offset="50%" style="stop-color:#22c55e;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#16a34a;stop-opacity:1" />
                    </linearGradient>
                </defs>
                <path d="M20 10 Q50 5, 80 20 Q85 50, 70 80 Q50 85, 30 70 Q15 50, 20 10 Z" fill="url(#leafGradient2)" stroke="#06583f" stroke-width="1"/>
                <line x1="25" y1="15" x2="65" y2="75" stroke="#047857" stroke-width="1.5"/>
                <path d="M35 25 Q45 35, 55 45" stroke="#047857" stroke-width="0.8" fill="none"/>
                <path d="M45 35 Q55 45, 65 55" stroke="#047857" stroke-width="0.8" fill="none"/>
            </svg>
        </div>

        <div class="leaf-decoration leaf-3">
            <svg class="leaf-svg" viewBox="0 0 100 100">
                <defs>
                    <linearGradient id="leafGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#86efac;stop-opacity:1" />
                        <stop offset="50%" style="stop-color:#4ade80;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#22c55e;stop-opacity:1" />
                    </linearGradient>
                </defs>
                <path d="M50 10 C65 15, 80 30, 85 50 C80 70, 65 85, 50 90 C35 85, 20 70, 15 50 C20 30, 35 15, 50 10 Z" fill="url(#leafGradient3)" stroke="#06583f" stroke-width="1"/>
                <line x1="50" y1="10" x2="50" y2="90" stroke="#047857" stroke-width="1.5"/>
                <path d="M50 20 Q35 30, 50 40" stroke="#047857" stroke-width="0.8" fill="none"/>
                <path d="M50 40 Q65 50, 50 60" stroke="#047857" stroke-width="0.8" fill="none"/>
                <path d="M50 60 Q35 70, 50 80" stroke="#047857" stroke-width="0.8" fill="none"/>
            </svg>
        </div>

        <div class="leaf-decoration leaf-4">
            <svg class="leaf-svg" viewBox="0 0 100 100">
                <defs>
                    <linearGradient id="leafGradient4" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#10b981;stop-opacity:1" />
                        <stop offset="50%" style="stop-color:#059669;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#047857;stop-opacity:1" />
                    </linearGradient>
                </defs>
                <path d="M30 15 Q50 10, 70 25 Q75 45, 65 65 Q50 70, 35 55 Q25 35, 30 15 Z" fill="url(#leafGradient4)" stroke="#06583f" stroke-width="1"/>
                <line x1="35" y1="20" x2="60" y2="60" stroke="#047857" stroke-width="1.5"/>
                <path d="M40 30 Q50 35, 55 45" stroke="#047857" stroke-width="0.8" fill="none"/>
                <path d="M45 40 Q55 45, 60 55" stroke="#047857" stroke-width="0.8" fill="none"/>
            </svg>
        </div>

        <div class="leaf-decoration leaf-5">
            <svg class="leaf-svg" viewBox="0 0 100 100">
                <defs>
                    <linearGradient id="leafGradient5" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#34d399;stop-opacity:1" />
                        <stop offset="50%" style="stop-color:#10b981;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#065f46;stop-opacity:1" />
                    </linearGradient>
                </defs>
                <path d="M50 15 C25 25, 20 45, 35 65 C45 75, 55 75, 65 65 C80 45, 75 25, 50 15 Z" fill="url(#leafGradient5)" stroke="#06583f" stroke-width="1"/>
                <line x1="50" y1="15" x2="50" y2="70" stroke="#047857" stroke-width="1.5"/>
                <path d="M50 25 Q40 35, 50 45" stroke="#047857" stroke-width="0.8" fill="none"/>
                <path d="M50 35 Q60 45, 50 55" stroke="#047857" stroke-width="0.8" fill="none"/>
            </svg>
        </div>

        <div class="leaf-decoration leaf-6">
            <svg class="leaf-svg" viewBox="0 0 100 100">
                <defs>
                    <linearGradient id="leafGradient6" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#6ee7b7;stop-opacity:1" />
                        <stop offset="50%" style="stop-color:#34d399;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#10b981;stop-opacity:1" />
                    </linearGradient>
                </defs>
                <path d="M40 20 Q60 15, 75 35 Q80 55, 65 70 Q50 75, 35 60 Q30 40, 40 20 Z" fill="url(#leafGradient6)" stroke="#06583f" stroke-width="1"/>
                <line x1="42" y1="25" x2="62" y2="65" stroke="#047857" stroke-width="1.5"/>
                <path d="M45 35 Q55 40, 60 50" stroke="#047857" stroke-width="0.8" fill="none"/>
                <path d="M50 45 Q60 50, 65 60" stroke="#047857" stroke-width="0.8" fill="none"/>
            </svg>
        </div>

        <!-- Dekorasi ranting -->
        <div class="branch-decoration">
            <svg class="branch-svg" viewBox="0 0 100 150">
                <defs>
                    <linearGradient id="branchGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#78716c;stop-opacity:1" />
                        <stop offset="50%" style="stop-color:#57534e;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#44403c;stop-opacity:1" />
                    </linearGradient>
                </defs>
                <path d="M50 140 Q52 120, 55 100 Q48 80, 45 60 Q52 40, 50 20" stroke="url(#branchGradient)" stroke-width="4" fill="none" stroke-linecap="round"/>
                <path d="M45 100 Q35 95, 25 90" stroke="url(#branchGradient)" stroke-width="2.5" fill="none" stroke-linecap="round"/>
                <path d="M55 80 Q65 75, 75 70" stroke="url(#branchGradient)" stroke-width="2.5" fill="none" stroke-linecap="round"/>
                <path d="M48 60 Q38 55, 30 50" stroke="url(#branchGradient)" stroke-width="2" fill="none" stroke-linecap="round"/>

                <!-- Daun kecil di ranting -->
                <ellipse cx="25" cy="88" rx="8" ry="12" fill="#22c55e" transform="rotate(-30 25 88)"/>
                <ellipse cx="75" cy="68" rx="8" ry="12" fill="#34d399" transform="rotate(20 75 68)"/>
                <ellipse cx="30" cy="48" rx="6" ry="10" fill="#10b981" transform="rotate(-45 30 48)"/>
            </svg>
        </div>



        <div class="logo">
            <div class="logo-text">SobatBumi</div>
        </div>

        <div class="content">
            <div class="header-section">
                <h1 class="certificate-title">CERTIFICATE</h1>
                <p class="certificate-subtitle">of environmental achievement</p>
            </div>

            <div class="recipient-section">
                <p class="recipient-text">This certificate is proudly presented to</p>
                <h2 class="recipient-name">John Doe</h2>
                <p class="achievement-text">
                    For outstanding commitment to environmental sustainability and successfully completing
                    the Green Initiative Program. Your dedication to protecting our planet and promoting
                    eco-friendly practices serves as an inspiration to others.
                </p>
            </div>

            <div class="signature-section">
                <div class="date-section">
                    <div class="date-label">Date of completion</div>
                    <div class="date-value">25 Juli 2025</div>
                </div>

                <div class="signature">
                    <div class="signature-line"></div>
                    <div class="signature-name">Dr. Green Smith</div>
                    <div class="signature-title">Environmental Director</div>
                </div>
            </div>
        </div>

        <div class="nature-seal"></div>
        <div class="certificate-id">Certificate ID: ECO-2025-001</div>
    </div>
</body>
</html>
