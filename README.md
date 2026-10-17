# Panipur-Zila-school
<!DOCTYPE html>
<html lang="bn">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>অনলাইন ভর্তি ও প্রবেশপত্র পোর্টাল - পানিপুর জেলা স্কুল</title>
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Lucide Icons CDN -->
    <script src="https://unpkg.com/lucide@latest"></script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Kalpurush&family=Noto+Serif+Bengali:wght@400;600;700&display=swap');
        body {
            font-family: 'Noto Serif Bengali', 'Kalpurush', sans-serif;
            background-color: #f3f4f6;
        }
        @media print {
            body * {
                visibility: hidden;
            }
            #printable-admit-card, #printable-admit-card * {
                visibility: visible;
            }
            #printable-admit-card {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                margin: 0;
                padding: 15px;
                box-shadow: none !important;
                border: 2px solid #000 !important;
            }
            .no-print {
                display: none !important;
            }
        }
    </style>
</head>
<body class="min-h-screen flex flex-col justify-between text-gray-800">

    <!-- Header Section -->
    <header class="bg-emerald-900 text-white shadow-lg border-b-4 border-yellow-500 no-print">
        <div class="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <div class="flex items-center gap-4 text-center md:text-left">
                <div class="bg-white p-2 rounded-full shadow-inner border border-yellow-400">
                    <i data-lucide="school" class="w-10 h-10 text-emerald-900"></i>
                </div>
                <div>
                    <h1 class="text-2xl md:text-3xl font-bold tracking-wide">পানিপুর জেলা স্কুল</h1>
                    <p class="text-xs md:text-sm text-yellow-300">একটি ঐতিহ্যবাহী মন্টেশ্বরী শিক্ষা প্রতিষ্ঠান</p>
                    <p class="text-xs text-emerald-200">হাটকালুপাড়া মহাসড়ক, পানিপুর</p>
                </div>
            </div>
            <nav class="flex gap-2">
                <button onclick="switchTab('apply')" id="nav-apply" class="px-4 py-2 text-sm font-semibold rounded-lg bg-yellow-500 text-emerald-950 hover:bg-yellow-400 transition">ভর্তি আবেদন</button>
                <button onclick="switchTab('admit')" id="nav-admit" class="px-4 py-2 text-sm font-semibold rounded-lg bg-emerald-800 hover:bg-emerald-700 transition">এডমিট কার্ড</button>
                <button onclick="switchTab('admin')" id="nav-admin" class="px-4 py-2 text-sm font-semibold rounded-lg bg-emerald-800 hover:bg-emerald-700 transition">এডমিন লগইন</button>
            </nav>
        </div>
    </header>

    <!-- Main Container -->
    <main class="max-w-5xl mx-auto w-full p-4 md:p-6 flex-grow">

        <!-- Admission Banner -->
        <div class="bg-gradient-to-r from-emerald-800 to-teal-800 text-white p-6 rounded-xl shadow-md mb-6 no-print flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
                <h2 class="text-xl md:text-2xl font-bold mb-1">শিক্ষাবর্ষ ২০২৬ - ভর্তি বিজ্ঞপ্তী (৩য়, ৬ষ্ঠ ও ৯মে শ্রেণি)</h2>
                <p class="text-sm text-emerald-100">ভর্তি পরীক্ষার মাধ্যমে শিক্ষার্থী ভর্তি করা হবে। আবেদন ফি: <strong>২৫০.০০ টাকা</strong></p>
            </div>
            <div class="bg-yellow-400 text-emerald-950 px-4 py-2 rounded-lg font-bold text-center text-sm shadow">
                পরীক্ষার মাধ্যমে ভর্তি
            </div>
        </div>

        <!-- Section 1: Admission Form -->
        <section id="tab-apply" class="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <h3 class="text-2xl font-bold text-emerald-900 mb-6 border-b pb-2 flex items-center gap-2">
                <i data-lucide="file-text" class="w-6 h-6"></i> ভর্তি আবেদনের ফরম
            </h3>

            <form id="admission-form" onsubmit="handleFormSubmit(event)" class="space-y-6">
                <!-- Class Selection -->
                <div class="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
                    <label class="block font-bold text-emerald-900 mb-2">আবেদনকৃত শ্রেণি *</label>
                    <div class="grid grid-cols-3 gap-4">
                        <label class="flex items-center gap-2 cursor-pointer bg-white p-3 rounded border hover:border-emerald-500">
                            <input type="radio" name="targetClass" value="৩য়" required onchange="toggleGroupSelection()"> ৩য় শ্রেণি
                        </label>
                        <label class="flex items-center gap-2 cursor-pointer bg-white p-3 rounded border hover:border-emerald-500">
                            <input type="radio" name="targetClass" value="৬ষ্ঠ" onchange="toggleGroupSelection()"> ৬ষ্ঠ শ্রেণি
                        </label>
                        <label class="flex items-center gap-2 cursor-pointer bg-white p-3 rounded border hover:border-emerald-500">
                            <input type="radio" name="targetClass" value="৯ম" onchange="toggleGroupSelection()"> ৯মে শ্রেণি
                        </label>
                    </div>

                    <!-- Group Selection for Class 9 -->
                    <div id="group-selection" class="hidden mt-4 pt-3 border-t border-emerald-200">
                        <label class="block font-bold text-emerald-900 mb-2">বিভাগ (৯ম শ্রেণির জন্য) *</label>
                        <div class="grid grid-cols-3 gap-4">
                            <label class="flex items-center gap-2 cursor-pointer bg-white p-2 rounded border">
                                <input type="radio" name="studentGroup" value="বিজ্ঞান"> বিজ্ঞান
                            </label>
                            <label class="flex items-center gap-2 cursor-pointer bg-white p-2 rounded border">
                                <input type="radio" name="studentGroup" value="মানবিক"> মানবিক
                            </label>
                            <label class="flex items-center gap-2 cursor-pointer bg-white p-2 rounded border">
                                <input type="radio" name="studentGroup" value="ব্যবসায় শিক্ষা"> ব্যবসায় শিক্ষা
                            </label>
                        </div>
                    </div>
                </div>

                <!-- Student Personal Info -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block font-semibold text-gray-700 mb-1">শিক্ষার্থীর পূর্ণ নাম *</label>
                        <input type="text" id="studentName" required class="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="বাংলায় লিখুন">
                    </div>
                    <div>
                        <label class="block font-semibold text-gray-700 mb-1">জন্ম নিবন্ধন সনদ নম্বর *</label>
                        <input type="text" id="birthRegNo" required class="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="১৭ ডিজিটের সনদ নম্বর">
                    </div>
                    <div>
                        <label class="block font-semibold text-gray-700 mb-1">পিতার নাম *</label>
                        <input type="text" id="fatherName" required class="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none">
                    </div>
                    <div>
                        <label class="block font-semibold text-gray-700 mb-1">পিতার পেশা *</label>
                        <input type="text" id="fatherOccupation" required class="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none">
                    </div>
                    <div>
                        <label class="block font-semibold text-gray-700 mb-1">মাতার নাম *</label>
                        <input type="text" id="motherName" required class="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none">
                    </div>
                    <div>
                        <label class="block font-semibold text-gray-700 mb-1">মাতার পেশা *</label>
                        <input type="text" id="motherOccupation" required class="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none">
                    </div>
                </div>

                <!-- Guardian Info (Optional) -->
                <div class="bg-gray-50 p-4 rounded-lg border">
                    <h4 class="font-bold text-gray-700 mb-3">পিতা-মাতার অবর্তমানে অভিভাবকের তথ্য (যদি থাকে)</h4>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-semibold text-gray-600 mb-1">অভিভাবকের নাম</label>
                            <input type="text" id="guardianName" class="w-full p-2 border rounded-lg outline-none">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-600 mb-1">অভিভাবকের পেশা</label>
                            <input type="text" id="guardianOccupation" class="w-full p-2 border rounded-lg outline-none">
                        </div>
                    </div>
                </div>

                <!-- Academic Info -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block font-semibold text-gray-700 mb-1">পূর্ববর্তী প্রতিষ্ঠানের নাম *</label>
                        <input type="text" id="prevSchool" required class="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none">
                    </div>
                    <div>
                        <label class="block font-semibold text-gray-700 mb-1">পূর্ববর্তী শ্রেণির ফলাফল (GPA/শ্রেণি স্থান) *</label>
                        <input type="text" id="prevResult" required class="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="যেমন: GPA 5.00 বা ১ম">
                    </div>
                </div>

                <!-- Contact & Address -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block font-semibold text-gray-700 mb-1">অভিভাবকের মোবাইল নম্বর *</label>
                        <input type="tel" id="mobileNo" required pattern="[0-9]{11}" class="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="017xxxxxxxx">
                    </div>
                    <div>
                        <label class="block font-semibold text-gray-700 mb-1">সম্পূর্ণ ঠিকানা (গ্রাম, ডাকঘর, উপজেলা, জেলা) *</label>
                        <textarea id="address" required rows="2" class="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"></textarea>
                    </div>
                </div>

                <!-- Quota Selection -->
                <div>
                    <label class="block font-semibold text-gray-700 mb-1">বিশেষ কোটা (যদি প্রযোজ্য হয়)</label>
                    <select id="quota" class="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none">
                        <option value="সাধারণ">সাধারণ (কোন কোটা নেই)</option>
                        <option value="মুক্তিযোদ্ধা কোটা">মুক্তিযোদ্ধা কোটা</option>
                        <option value="ভাই-বোন কোটা">ভাই-বোন কোটা (বিদ্যালয়ে অধ্যয়নরত)</option>
                        <option value="প্রাথমিক বিদ্যালয় কোটা">প্রাথমিক বিদ্যালয় কোটা</option>
                        <option value="প্রতিবন্ধী কোটা">প্রতিবন্ধী কোটা</option>
                    </select>
                </div>

                <!-- Payment Option -->
                <div class="bg-yellow-50 border border-yellow-300 p-4 rounded-lg">
                    <h4 class="font-bold text-yellow-900 mb-2 flex items-center gap-2">
                        <i data-lucide="credit-card" class="w-5 h-5"></i> ই-পেমেন্ট বিবরণী (ভর্তি ফর্ম ফি)
                    </h4>
                    <p class="text-sm text-yellow-800 mb-3">আবেদন সম্পূর্ণ করতে ফর্মের নির্ধারিত ফি <strong>২৫০.০০ টাকা</strong> মোবাইল ব্যাংকিংয়ের মাধ্যমে পরিশোধ করতে হবে।</p>
                    
                    <div class="flex gap-4 items-center">
                        <label class="flex items-center gap-2 cursor-pointer font-bold text-pink-600">
                            <input type="radio" name="paymentMethod" value="bkash" checked> বিকাশ (bKash)
                        </label>
                        <label class="flex items-center gap-2 cursor-pointer font-bold text-orange-600">
                            <input type="radio" name="paymentMethod" value="nagad"> নগদ (Nagad)
                        </label>
                    </div>
                </div>

                <button type="submit" class="w-full bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-3 rounded-lg shadow-lg text-lg transition flex justify-center items-center gap-2">
                    <i data-lucide="check-circle" class="w-5 h-5"></i> তথ্য জমা দিন ও ২৫০ টাকা ফি প্রদান করুন
                </button>
            </form>
        </section>

        <!-- Section 2: Admit Card Search & Display -->
        <section id="tab-admit" class="hidden space-y-6">
            <div class="bg-white rounded-xl shadow-md p-6 border border-gray-200 no-print">
                <h3 class="text-xl font-bold text-emerald-900 mb-4 flex items-center gap-2">
                    <i data-lucide="search" class="w-5 h-5"></i> এডমিট কার্ড অনুসন্ধান ও ডাউনলোড
                </h3>
                <div class="flex flex-col md:flex-row gap-3">
                    <input type="text" id="searchRoll" placeholder="রোল নম্বর অথবা মোবাইল নম্বর দিন" class="flex-grow p-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-emerald-500">
                    <button onclick="searchAdmitCard()" class="bg-emerald-800 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-emerald-900 transition">খুঁজুন</button>
                </div>
            </div>

            <!-- Admit Card Printable View -->
            <div id="admit-card-container" class="hidden">
                <div id="printable-admit-card" class="bg-white p-8 rounded-xl border-2 border-emerald-900 shadow-xl max-w-2xl mx-auto relative">
                    <!-- School Watermark / Header -->
                    <div class="text-center border-b-2 border-emerald-800 pb-4 mb-6">
                        <h2 class="text-2xl font-bold text-emerald-900">পানিপুর জেলা স্কুল</h2>
                        <p class="text-xs text-gray-600">হাটকালুপাড়া মহাসড়ক, পানিপুর</p>
                        <span class="inline-block bg-emerald-900 text-white text-sm font-bold px-4 py-1 rounded-full mt-2">প্রবেশপত্র (Admit Card) - ২০২৬</span>
                    </div>

                    <!-- Admit Details -->
                    <div class="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
                        <p><strong>রোল নম্বর:</strong> <span id="ac-roll" class="font-bold text-emerald-800 text-base"></span></p>
                        <p><strong>শ্রেণি:</strong> <span id="ac-class" class="font-bold"></span></p>
                        <p><strong>বিভাগ:</strong> <span id="ac-group">প্রযোজ্য নয়</span></p>
                        <p><strong>শিক্ষার্থীর নাম:</strong> <span id="ac-name"></span></p>
                        <p><strong>পিতার নাম:</strong> <span id="ac-father"></span></p>
                        <p><strong>মাতার নাম:</strong> <span id="ac-mother"></span></p>
                        <p><strong>মোবাইল নম্বর:</strong> <span id="ac-mobile"></span></p>
                        <p><strong>কোটা:</strong> <span id="ac-quota"></span></p>
                    </div>

                    <!-- Exam Details Box -->
                    <div class="mt-6 bg-emerald-50 p-4 rounded-lg border border-emerald-200">
                        <h4 class="font-bold text-emerald-900 text-sm mb-2 border-b pb-1">ভর্তি পরীক্ষার সময়সূচি:</h4>
                        <p class="text-xs mb-1"><strong>তারিখ ও সময়:</strong> <span id="ac-exam-date">এডমিন প্যানেলে কনফিগার করা হয়নি</span></p>
                        <p class="text-xs"><strong>পরীক্ষার স্থান:</strong> <span id="ac-exam-venue">পানিপুর জেলা স্কুল প্রধান ভবন</span></p>
                    </div>

                    <!-- Instructions -->
                    <div class="mt-4 text-xs text-gray-600 space-y-1 border-t pt-3">
                        <p class="font-bold text-gray-700">পরীক্ষার্থীদের জন্য নির্দেশাবলী:</p>
                        <p>১. পরীক্ষার ৩০ মিনিট পূর্বে কেন্দ্রে উপস্থিত হতে হবে।</p>
                        <p>২. প্রবেশপত্রটি সাথে আনা বাধ্যতামূলক।</p>
                    </div>

                    <!-- Signatures -->
                    <div class="mt-12 flex justify-between items-end text-xs pt-4 border-t border-dashed">
                        <div class="text-center">
                            <p class="border-t border-gray-400 px-4 pt-1">শিক্ষার্থীর স্বাক্ষর</p>
                        </div>
                        <div class="text-center">
                            <p class="font-bold">প্রধান শিক্ষক</p>
                            <p class="border-t border-gray-400 px-4 pt-1">পানিপুর জেলা স্কুল</p>
                        </div>
                    </div>
                </div>

                <!-- Action Button -->
                <div class="text-center mt-4 no-print">
                    <button onclick="window.print()" class="bg-yellow-500 hover:bg-yellow-400 text-emerald-950 font-bold px-6 py-2.5 rounded-lg shadow-md transition inline-flex items-center gap-2">
                        <i data-lucide="printer" class="w-5 h-5"></i> প্রিন্ট বা PDF হিসেবে সেভ করুন
                    </button>
                </div>
            </div>
        </section>

        <!-- Section 3: Admin Dashboard -->
        <section id="tab-admin" class="hidden">
            <!-- Login Form -->
            <div id="admin-login-box" class="bg-white rounded-xl shadow-md p-6 max-w-md mx-auto border border-gray-200 no-print">
                <h3 class="text-xl font-bold text-emerald-900 mb-4 text-center flex items-center justify-center gap-2">
                    <i data-lucide="lock" class="w-5 h-5"></i> এডমিন লগইন
                </h3>
                <form onsubmit="handleAdminLogin(event)" class="space-y-4">
                    <div>
                        <label class="block text-sm font-semibold mb-1">ইউজার আইডি</label>
                        <input type="text" id="adminUser" required class="w-full p-2 border rounded outline-none focus:ring-2 focus:ring-emerald-500" placeholder="admin">
                    </div>
                    <div>
                        <label class="block text-sm font-semibold mb-1">পাসওয়ার্ড</label>
                        <input type="password" id="adminPass" required class="w-full p-2 border rounded outline-none focus:ring-2 focus:ring-emerald-500" placeholder="panipur2026">
                    </div>
                    <button type="submit" class="w-full bg-emerald-800 text-white font-bold py-2 rounded hover:bg-emerald-900 transition">লগইন করুন</button>
                </form>
            </div>

            <!-- Admin Panel Content (Hidden initially) -->
            <div id="admin-dashboard" class="hidden space-y-6">
                <div class="flex justify-between items-center bg-white p-4 rounded-xl shadow border">
                    <h3 class="text-xl font-bold text-emerald-900">বিদ্যালয় ব্যবস্থাপনা ড্যাশবোর্ড</h3>
                    <button onclick="adminLogout()" class="bg-red-600 text-white text-sm px-4 py-1.5 rounded hover:bg-red-700">লগআউট</button>
                </div>

                <!-- Exam Configuration Box -->
                <div class="bg-white p-6 rounded-xl shadow border border-gray-200">
                    <h4 class="font-bold text-emerald-900 mb-4 border-b pb-2 flex items-center gap-2">
                        <i data-lucide="settings" class="w-5 h-5"></i> পরীক্ষা ও আসন কনফিগারেশন
                    </h4>
                    <form onsubmit="saveExamConfig(event)" class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                            <label class="block font-semibold mb-1">৩য় শ্রেণির পরীক্ষার তারিখ ও আসন</label>
                            <input type="text" id="config-3" class="w-full p-2 border rounded mb-2" placeholder="তারিখ: ১৫ ডিসেম্বার, আসন: ১০০">
                        </div>
                        <div>
                            <label class="block font-semibold mb-1">৬ষ্ঠ শ্রেণির পরীক্ষার তারিখ ও আসন</label>
                            <input type="text" id="config-6" class="w-full p-2 border rounded mb-2" placeholder="তারিখ: ১৬ ডিসেম্বার, আসন: ১২০">
                        </div>
                        <div>
                            <label class="block font-semibold mb-1">৯ম শ্রেণির পরীক্ষার তারিখ ও আসন (বিজ্ঞান/মানবিক/ব্যবসায়)</label>
                            <input type="text" id="config-9" class="w-full p-2 border rounded mb-2" placeholder="তারিখ: ১৭ ডিসেম্বার, আসন:১৫০">
                        </div>
                        <div class="md:col-span-3">
                            <button type="submit" class="bg-emerald-800 text-white px-4 py-2 rounded font-bold hover:bg-emerald-900">কনফিগারেশন সেভ করুন</button>
                        </div>
                    </form>
                </div>

                <!-- Application Stats -->
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                    <div class="bg-white p-4 rounded-xl border shadow">
                        <p class="text-sm text-gray-500">মোট আবেদন</p>
                        <p id="stat-total" class="text-3xl font-bold text-emerald-900">0</p>
                    </div>
                    <div class="bg-white p-4 rounded-xl border shadow">
                        <p class="text-sm text-gray-500">৩য় শ্রেণি</p>
                        <p id="stat-3" class="text-3xl font-bold text-emerald-700">0</p>
                    </div>
                    <div class="bg-white p-4 rounded-xl border shadow">
                        <p class="text-sm text-gray-500">৬ষ্ঠ শ্রেণি</p>
                        <p id="stat-6" class="text-3xl font-bold text-emerald-700">0</p>
                    </div>
                    <div class="bg-white p-4 rounded-xl border shadow">
                        <p class="text-sm text-gray-500">৯ম শ্রেণি</p>
                        <p id="stat-9" class="text-3xl font-bold text-emerald-700">0</p>
                    </div>
                </div>

                <!-- Application Table -->
                <div class="bg-white p-6 rounded-xl shadow border overflow-x-auto">
                    <h4 class="font-bold text-emerald-900 mb-4">আবেদনকারীদের পূর্ণাঙ্গ তালিকা</h4>
                    <table class="w-full text-left text-xs md:text-sm border-collapse">
                        <thead>
                            <tr class="bg-emerald-900 text-white">
                                <th class="p-2.5 border">রোল</th>
                                <th class="p-2.5 border">নাম</th>
                                <th class="p-2.5 border">শ্রেণি (বিভাগ)</th>
                                <th class="p-2.5 border">পিতার নাম</th>
                                <th class="p-2.5 border">মোবাইল</th>
                                <th class="p-2.5 border">কোটা</th>
                                <th class="p-2.5 border">পেমেন্ট</th>
                            </tr>
                        </thead>
                        <tbody id="applicant-table-body">
                            <!-- Dynamic Content -->
                        </tbody>
                    </table>
                </div>
            </div>
        </section>

    </main>

    <!-- Footer -->
    <footer class="bg-emerald-950 text-emerald-300 text-center py-4 text-xs no-print border-t border-emerald-800">
        <p>© ২০২৬ পানিপুর জেলা স্কুল | মন্টেশ্বরী শিক্ষা প্রতিষ্ঠান | সর্বস্বত্ব সংরক্ষিত</p>
    </footer>

    <!-- JavaScript Logic -->
    <script>
        // Initialize Lucide Icons
        lucide.createIcons();

        // Local Storage Initializations
        let applicants = JSON.parse(localStorage.getItem('panipur_applicants')) || [];
        let examConfigs = JSON.parse(localStorage.getItem('panipur_configs')) || {
            '৩য়': '১৮ ডিসেম্বর ২০২৬, সকাল ১০:০০ টা',
            '৬ষ্ঠ': '১৯ ডিসেম্বর ২০২৬, সকাল ১০:০০ টা',
            '৯ম': '২০ ডিসেম্বর ২০২৬, সকাল ১০:০০ টা'
        };

        // Navigation Switcher
        function switchTab(tabName) {
            ['apply', 'admit', 'admin'].forEach(t => {
                document.getElementById(`tab-${t}`).classList.add('hidden');
                document.getElementById(`nav-${t}`).classList.remove('bg-yellow-500', 'text-emerald-950');
                document.getElementById(`nav-${t}`).classList.add('bg-emerald-800');
            });
            document.getElementById(`tab-${tabName}`).classList.remove('hidden');
            document.getElementById(`nav-${tabName}`).classList.add('bg-yellow-500', 'text-emerald-950');
        }

        // Toggle Group for Class 9
        function toggleGroupSelection() {
            const selectedClass = document.querySelector('input[name="targetClass"]:checked')?.value;
            const groupDiv = document.getElementById('group-selection');
            if (selectedClass === '৯ম') {
                groupDiv.classList.remove('hidden');
            } else {
                groupDiv.classList.add('hidden');
            }
        }

        // Form Submit Handler
        function handleFormSubmit(e) {
            e.preventDefault();
            
            const targetClass = document.querySelector('input[name="targetClass"]:checked').value;
            const group = targetClass === '৯ম' ? (document.querySelector('input[name="studentGroup"]:checked')?.value || 'সাধারণ') : 'N/A';
            
            const newRoll = targetClass.charAt(0) + Math.floor(1000 + Math.random() * 9000);
            
            const applicantData = {
                roll: newRoll,
                targetClass,
                group,
                name: document.getElementById('studentName').value,
                birthRegNo: document.getElementById('birthRegNo').value,
                fatherName: document.getElementById('fatherName').value,
                fatherOccupation: document.getElementById('fatherOccupation').value,
                motherName: document.getElementById('motherName').value,
                motherOccupation: document.getElementById('motherOccupation').value,
                guardianName: document.getElementById('guardianName').value || 'N/A',
                guardianOccupation: document.getElementById('guardianOccupation').value || 'N/A',
                prevSchool: document.getElementById('prevSchool').value,
                prevResult: document.getElementById('prevResult').value,
                mobile: document.getElementById('mobileNo').value,
                address: document.getElementById('address').value,
                quota: document.getElementById('quota').value,
                paymentStatus: 'Paid (২৫০ টাকা)'
            };

            applicants.push(applicantData);
            localStorage.setItem('panipur_applicants', JSON.stringify(applicants));

            alert(`আবেদন সফল হয়েছে!\nআপনার রোল নম্বর: ${newRoll}\nঅনুগ্রহ করে এডমিট কার্ড সেকশন থেকে এডমিট কার্ড ডাউনলোড করে নিন।`);
            
            document.getElementById('admission-form').reset();
            switchTab('admit');
            document.getElementById('searchRoll').value = newRoll;
            searchAdmitCard();
        }

        // Search Admit Card
        function searchAdmitCard() {
            const query = document.getElementById('searchRoll').value.trim();
            const result = applicants.find(a => a.roll === query || a.mobile === query);

            if (result) {
                document.getElementById('ac-roll').innerText = result.roll;
                document.getElementById('ac-class').innerText = result.targetClass;
                document.getElementById('ac-group').innerText = result.group;
                document.getElementById('ac-name').innerText = result.name;
                document.getElementById('ac-father').innerText = result.fatherName;
                document.getElementById('ac-mother').innerText = result.motherName;
                document.getElementById('ac-mobile').innerText = result.mobile;
                document.getElementById('ac-quota').innerText = result.quota;
                
                document.getElementById('ac-exam-date').innerText = examConfigs[result.targetClass] || 'শীঘ্রই জানানো হবে';

                document.getElementById('admit-card-container').classList.remove('hidden');
            } else {
                alert('কোনো তথ্য পাওয়া যায়নি! সঠিক রোল নম্বর অথবা মোবাইল নম্বর দিন।');
                document.getElementById('admit-card-container').classList.add('hidden');
            }
        }

        // Admin Auth
        function handleAdminLogin(e) {
            e.preventDefault();
            const u = document.getElementById('adminUser').value;
            const p = document.getElementById('adminPass').value;

            if (u === 'admin' && p === 'panipur2026') {
                document.getElementById('admin-login-box').classList.add('hidden');
                document.getElementById('admin-dashboard').classList.remove('hidden');
                loadAdminData();
            } else {
                alert('ভুল পাসওয়ার্ড বা ইউজার আইডি!');
            }
        }

        function adminLogout() {
            document.getElementById('admin-dashboard').classList.add('hidden');
            document.getElementById('admin-login-box').classList.remove('hidden');
        }

        // Save Configs
        function saveExamConfig(e) {
            e.preventDefault();
            examConfigs['৩য়'] = document.getElementById('config-3').value || examConfigs['৩য়'];
            examConfigs['৬ষ্ঠ'] = document.getElementById('config-6').value || examConfigs['৬ষ্ঠ'];
            examConfigs['৯ম'] = document.getElementById('config-9').value || examConfigs['৯ম'];
            localStorage.setItem('panipur_configs', JSON.stringify(examConfigs));
            alert('পরীক্ষা ও আসন কনফিগারেশন সেভ হয়েছে!');
        }

        // Load Admin Table & Stats
        function loadAdminData() {
            document.getElementById('stat-total').innerText = applicants.length;
            document.getElementById('stat-3').innerText = applicants.filter(a => a.targetClass === '৩য়').length;
            document.getElementById('stat-6').innerText = applicants.filter(a => a.targetClass === '৬ষ্ঠ').length;
            document.getElementById('stat-9').innerText = applicants.filter(a => a.targetClass === '৯ম').length;

            const tbody = document.getElementById('applicant-table-body');
            tbody.innerHTML = '';

            applicants.forEach(a => {
                const tr = document.createElement('tr');
                tr.className = 'border-b hover:bg-gray-50';
                tr.innerHTML = `
                    <td class="p-2 border font-bold text-emerald-900">${a.roll}</td>
                    <td class="p-2 border">${a.name}</td>
                    <td class="p-2 border">${a.targetClass} ${a.group !== 'N/A' ? '(' + a.group + ')' : ''}</td>
                    <td class="p-2 border">${a.fatherName}</td>
                    <td class="p-2 border">${a.mobile}</td>
                    <td class="p-2 border">${a.quota}</td>
                    <td class="p-2 border text-green-700 font-bold">${a.paymentStatus}</td>
                `;
                tbody.appendChild(tr);
            });
        }
    </script>
</body>
</html>
