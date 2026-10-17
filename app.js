// Data Sistem Utama & Password Owner
let currentAdminPIN = localStorage.getItem("umkm_admin_pin") || "1234";
let currentTheme = localStorage.getItem("umkm_theme") || "theme-amber";

const themeLabels = {
  "theme-amber": "Amber Cokelat",
  "theme-abu": "Abu Modern",
  "theme-hijau": "Hijau Segar",
  "theme-merah": "Merah Cabai",
  "theme-biru": "Biru Khas",
};

// Menerapkan Tema Warna ke Body & Dropdown Label
function terapkanTema(namaTema) {
  document.body.className = `${namaTema} antialiased selection:bg-amber-100 selection:text-amber-900`;
  currentTheme = namaTema;
  localStorage.setItem("umkm_theme", namaTema);

  const selectAdmin = document.getElementById("admin-input-tema-default");
  const dropdownLabel = document.getElementById("selected-theme-label");

  if (selectAdmin) selectAdmin.value = namaTema;
  if (dropdownLabel && themeLabels[namaTema])
    dropdownLabel.innerText = themeLabels[namaTema];

  const dropdownMenu = document.getElementById("theme-dropdown-menu");
  if (dropdownMenu) dropdownMenu.classList.add("hidden");
}

// Dropdown Toggle Handlers
document.addEventListener("DOMContentLoaded", function () {
  const themeBtn = document.getElementById("theme-dropdown-btn");
  const themeMenu = document.getElementById("theme-dropdown-menu");

  if (themeBtn && themeMenu) {
    themeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      themeMenu.classList.toggle("hidden");
    });

    document.addEventListener("click", (e) => {
      if (!themeBtn.contains(e.target) && !themeMenu.contains(e.target)) {
        themeMenu.classList.add("hidden");
      }
    });
  }
});

// Toast Notification
function showToast(message) {
  const toast = document.getElementById("custom-toast");
  document.getElementById("toast-msg").innerText = message;
  toast.classList.remove("translate-x-full", "opacity-0");
  setTimeout(() => {
    toast.classList.add("translate-x-full", "opacity-0");
  }, 3000);
}

// Custom Confirm Modal
let confirmCallback = null;
function showCustomConfirm(title, text, callback) {
  document.getElementById("confirm-title").innerText = title;
  document.getElementById("confirm-text").innerText = text;
  confirmCallback = callback;
  document.getElementById("custom-confirm-modal").classList.remove("hidden");
}

document.getElementById("confirm-cancel-btn").addEventListener("click", () => {
  document.getElementById("custom-confirm-modal").classList.add("hidden");
  confirmCallback = null;
});

document.getElementById("confirm-yes-btn").addEventListener("click", () => {
  document.getElementById("custom-confirm-modal").classList.add("hidden");
  if (confirmCallback) confirmCallback();
  confirmCallback = null;
});

// Helper untuk Tautan WhatsApp
function buatTautanWA(pesan) {
  const noWA = (kontakUsaha.wa || "081234567890").replace(/[^0-9]/g, "");
  return `https://wa.me/${noWA}?text=${encodeURIComponent(pesan)}`;
}

// Data Identitas Utama
const defaultIdentitas = {
  namaUsaha: "Keripik Singkong Maknyus",
  labelKecil: "Keripik rumahan khas Singosari",
  slogan: "Renyahnya Bikin Nagih, Gurihnya Pas di Hati!",
  lokasi: "Singosari, Malang",
  logoUrl:
    "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=200&h=200&q=80",
};
let identitasUsaha =
  JSON.parse(localStorage.getItem("umkm_identitas")) || defaultIdentitas;

function renderIdentitasUsaha() {
  document.getElementById("store-name-display").innerText =
    identitasUsaha.namaUsaha;
  if (document.getElementById("footer-store-name"))
    document.getElementById("footer-store-name").innerText =
      identitasUsaha.namaUsaha;
  document.getElementById("hero-title-display").innerText =
    identitasUsaha.namaUsaha;
  document.getElementById("hero-label-display").innerText =
    identitasUsaha.labelKecil;
  document.getElementById("hero-slogan-display").innerText =
    identitasUsaha.slogan;
  document.getElementById("store-location-display").innerText =
    identitasUsaha.lokasi;
  document.getElementById("store-logo-display").src = identitasUsaha.logoUrl;

  // Form Admin Values
  document.getElementById("admin-input-nama-usaha").value =
    identitasUsaha.namaUsaha;
  document.getElementById("admin-input-label-kecil").value =
    identitasUsaha.labelKecil;
  document.getElementById("admin-input-slogan").value = identitasUsaha.slogan;
  document.getElementById("admin-input-lokasi").value = identitasUsaha.lokasi;
}

// Data Kontak Usaha
const defaultKontak = {
  alamat: "Jl. Raya Singosari No. 45, Malang, Jawa Timur",
  wa: "0812-3456-7890",
  medsos: "@keripiksingkongsingosari",
  jamSenin: "08.00 - 17.00 WIB",
  jamMinggu: "Tutup",
  mapsUrl: "https://maps.google.com/?q=Singosari+Malang",
};
let kontakUsaha =
  JSON.parse(localStorage.getItem("umkm_kontak")) || defaultKontak;

function renderKontakUsaha() {
  document.getElementById("display-alamat").innerText = kontakUsaha.alamat;
  document.getElementById("display-wa").innerText = kontakUsaha.wa;
  document.getElementById("display-medsos").innerText = kontakUsaha.medsos;
  document.getElementById("display-jambuka-senin").innerText =
    kontakUsaha.jamSenin;
  document.getElementById("display-jambuka-minggu").innerText =
    kontakUsaha.jamMinggu;

  const linkWA = buatTautanWA(
    "Halo Kak, saya ingin bertanya mengenai produk Keripik Singkong Maknyus.",
  );
  document.getElementById("contact-wa-btn").href = linkWA;
  document.getElementById("hero-wa-btn").href = linkWA;
  document.getElementById("floating-wa-btn").href = linkWA;

  if (kontakUsaha.mapsUrl) {
    document.getElementById("display-maps-link").href = kontakUsaha.mapsUrl;
  }

  if (document.getElementById("admin-alamat"))
    document.getElementById("admin-alamat").value = kontakUsaha.alamat;
  if (document.getElementById("admin-wa"))
    document.getElementById("admin-wa").value = kontakUsaha.wa;
  if (document.getElementById("admin-medsos"))
    document.getElementById("admin-medsos").value = kontakUsaha.medsos;
  if (document.getElementById("admin-jambuka-senin"))
    document.getElementById("admin-jambuka-senin").value = kontakUsaha.jamSenin;
  if (document.getElementById("admin-jambuka-minggu"))
    document.getElementById("admin-jambuka-minggu").value =
      kontakUsaha.jamMinggu;
  if (document.getElementById("admin-maps-url"))
    document.getElementById("admin-maps-url").value = kontakUsaha.mapsUrl;
}

// Data Cerita Usaha
const defaultCerita = {
  teks: "Keripik Singkong Maknyus dibuat dari singkong pilihan hasil tani lokal Singosari dengan resep turun-temurun. Kami mengutamakan kebersihan dan rasa gurih alami di setiap gigitannya untuk kepuasan pelanggan setia.",
  tahun: "2018",
  pemilik: "Ibu Siti",
  karyawan: "5 Orang",
};
let ceritaUsaha =
  JSON.parse(localStorage.getItem("umkm_cerita")) || defaultCerita;

function renderCeritaUsaha() {
  document.getElementById("cerita-usaha-display").innerText = ceritaUsaha.teks;
  document.getElementById("stat-tahun-display").innerText = ceritaUsaha.tahun;
  document.getElementById("stat-pemilik-display").innerText =
    ceritaUsaha.pemilik;
  document.getElementById("stat-karyawan-display").innerText =
    ceritaUsaha.karyawan;

  if (document.getElementById("admin-cerita-teks"))
    document.getElementById("admin-cerita-teks").value = ceritaUsaha.teks;
  if (document.getElementById("admin-stat-tahun"))
    document.getElementById("admin-stat-tahun").value = ceritaUsaha.tahun;
  if (document.getElementById("admin-stat-pemilik"))
    document.getElementById("admin-stat-pemilik").value = ceritaUsaha.pemilik;
  if (document.getElementById("admin-stat-karyawan"))
    document.getElementById("admin-stat-karyawan").value = ceritaUsaha.karyawan;
}

// Data 3 Fakta Utama
const defaultFakta = [
  {
    id: 1,
    judul: "100% Singkong Lokal",
    deskripsi: "Bahan baku segar dari petani lokal Singosari.",
  },
  {
    id: 2,
    judul: "Tanpa Pengawet Buatan",
    deskripsi: "Olahan alami dan renyah tahan lama secara higienis.",
  },
  {
    id: 3,
    judul: "Rasa Otentik",
    deskripsi: "Resep khas warisan bumbu rempah pilihan.",
  },
];
let faktaList = JSON.parse(localStorage.getItem("umkm_fakta")) || defaultFakta;

function renderFakta() {
  const container = document.getElementById("fakta-singkat-container");
  if (!container) return;
  container.innerHTML = "";

  faktaList.forEach((f) => {
    const elem = document.createElement("div");
    elem.className =
      "p-5 rounded-2xl bg-white border border-gray-200 shadow-sm";
    elem.innerHTML = `
            <h4 class="font-bold text-gray-900 text-base mb-1">${f.judul}</h4>
            <p class="text-sm text-gray-600">${f.deskripsi}</p>
        `;
    container.appendChild(elem);
  });

  const adminInputs = document.getElementById("admin-fakta-inputs");
  if (adminInputs) {
    adminInputs.innerHTML = "";
    faktaList.forEach((f) => {
      const div = document.createElement("div");
      div.className =
        "p-3.5 bg-gray-50 rounded-2xl border border-gray-200 space-y-2";
      div.innerHTML = `
                <p class="font-bold text-gray-900 text-xs">Poin Fakta ${f.id}</p>
                <input type="text" id="fakta-judul-${f.id}" value="${f.judul}" class="w-full px-3 py-1.5 rounded-xl border border-gray-300 text-sm">
                <textarea id="fakta-desc-${f.id}" rows="2" class="w-full px-3 py-1.5 rounded-xl border border-gray-300 text-sm">${f.deskripsi}</textarea>
            `;
      adminInputs.appendChild(div);
    });
  }
}

// Data Keunggulan
const defaultKeunggulan = [
  {
    id: 1,
    judul: "Singkong segar pilihan petani lokal",
    deskripsi:
      "Dipetik langsung dari lahan petani terbaik di kawasan Singosari.",
  },
  {
    id: 2,
    judul: "Bumbu rempah tradisional berkualitas",
    deskripsi: "Menggunakan racikan rempah murni tanpa bahan kimia tambahan.",
  },
  {
    id: 3,
    judul: "Proses higienis dan terjamin",
    deskripsi:
      "Dibuat dengan standar kebersihan tinggi untuk menjaga kualitas produk.",
  },
];
let keunggulanList =
  JSON.parse(localStorage.getItem("umkm_keunggulan")) || defaultKeunggulan;

function renderKeunggulan() {
  const container = document.getElementById("keunggulan-list-display");
  if (!container) return;
  container.innerHTML = "";

  keunggulanList.forEach((item, index) => {
    const elem = document.createElement("div");
    elem.className =
      "flex items-start space-x-4 p-4 rounded-xl bg-dynamic-light border border-dynamic-border";
    elem.innerHTML = `
            <div class="w-8 h-8 rounded-full bg-dynamic-primary text-white flex items-center justify-center font-bold flex-shrink-0 text-sm">${index + 1}</div>
            <div>
                <h4 class="font-bold text-gray-900">${item.judul}</h4>
                <p class="text-sm text-gray-600 mt-0.5">${item.deskripsi}</p>
            </div>
        `;
    container.appendChild(elem);
  });
}

// Data Produk dengan Foto Gaya PAP / Realistis
const defaultProduk = [
  {
    id: 1,
    nama: "Keripik Singkong Original",
    berat: "250 gram",
    harga: "Rp 12.000",
    deskripsi: "Rasa gurih klasik dengan garam pilihan yang renyah dan nikmat.",
    foto: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    nama: "Keripik Singkong Pedas Manis",
    berat: "250 gram",
    harga: "Rp 14.000",
    deskripsi:
      "Perpaduan cabai segar dan gula jawa asli yang menggugah selera.",
    foto: "https://images.unsplash.com/photo-1528751014936-863e6e7a319c?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    nama: "Keripik Singkong Balado",
    berat: "250 gram",
    harga: "Rp 14.000",
    deskripsi: "Bumbu balado khas Nusantara dengan sensasi pedas nendang.",
    foto: "https://images.unsplash.com/photo-1621447504864-d8686e12698c?auto=format&fit=crop&w=600&q=80",
  },
];

let produkList =
  JSON.parse(localStorage.getItem("umkm_produk")) || defaultProduk;

function renderProduk() {
  const productGrid = document.getElementById("product-grid");
  if (!productGrid) return;
  productGrid.innerHTML = "";

  produkList.forEach(function (p) {
    const pesanProduk = `Halo Kak, saya ingin memesan ${p.nama} (${p.berat}) seharga ${p.harga}.`;
    const linkWA = buatTautanWA(pesanProduk);

    const card = document.createElement("div");
    card.className =
      "bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition border border-gray-200 flex flex-col justify-between";

    card.innerHTML = `
            <div>
                <div class="relative h-48 overflow-hidden bg-gray-100">
                    <img src="${p.foto}" onerror="this.src='https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=600&q=80'" alt="${p.nama}" class="w-full h-full object-cover hover:scale-105 transition duration-300">
                </div>
                <div class="p-6 space-y-3">
                    <div class="flex justify-between items-start">
                        <h3 class="font-bold text-gray-900 text-lg">${p.nama}</h3>
                        <span class="text-xs font-semibold px-2.5 py-1 bg-dynamic-accent text-dynamic-dark rounded-full">${p.berat}</span>
                    </div>
                    <p class="text-sm text-gray-600 line-clamp-2">${p.deskripsi}</p>
                    <div class="text-lg font-extrabold text-dynamic-primary pt-1">${p.harga}</div>
                </div>
            </div>
            <div class="p-6 pt-0 flex space-x-2">
                <a href="${linkWA}" target="_blank" rel="noopener noreferrer" class="flex-1 inline-flex justify-center items-center px-4 py-2.5 bg-dynamic-primary hover:bg-dynamic-hover text-white font-semibold rounded-xl text-sm transition shadow-sm">
                    Pesan
                </a>
                <button onclick="bukaEditProduk(${p.id})" class="p-2.5 text-dynamic-primary hover:bg-dynamic-accent border border-dynamic-border rounded-xl transition" title="Edit Produk">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                </button>
                <button onclick="konfirmasiHapusProduk(${p.id})" class="p-2.5 text-rose-600 hover:bg-rose-50 border border-rose-200 rounded-xl transition" title="Hapus Produk">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </button>
            </div>
        `;
    productGrid.appendChild(card);
  });

  renderAdminProductList();
}

function renderAdminProductList() {
  const adminListContainer = document.getElementById("admin-product-list");
  if (!adminListContainer) return;
  adminListContainer.innerHTML = "";

  produkList.forEach((p) => {
    const item = document.createElement("div");
    item.className =
      "flex items-center justify-between p-3.5 bg-dynamic-light border border-dynamic-border rounded-2xl shadow-sm transition";

    item.innerHTML = `
            <div class="flex items-center space-x-3 sm:space-x-4 min-w-0">
                <div class="w-12 h-12 rounded-xl bg-dynamic-primary text-white font-bold text-xs flex items-center justify-center flex-shrink-0 overflow-hidden">
                    <img src="${p.foto}" alt="${p.nama}" class="w-full h-full object-cover">
                </div>
                <div class="min-w-0">
                    <h5 class="font-bold text-gray-900 text-sm truncate">${p.nama}</h5>
                    <p class="text-xs text-gray-600">${p.berat} · <span class="text-dynamic-primary font-bold">${p.harga}</span></p>
                </div>
            </div>
            <div class="flex items-center space-x-1.5 flex-shrink-0 ml-2">
                <button onclick="bukaEditProduk(${p.id})" class="px-3 py-1.5 bg-dynamic-accent hover:bg-dynamic-border text-dynamic-dark font-bold text-xs rounded-xl transition">
                    Edit
                </button>
                <button onclick="konfirmasiHapusProduk(${p.id})" class="p-1.5 text-rose-600 hover:bg-rose-50 rounded-xl transition">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </button>
            </div>
        `;
    adminListContainer.appendChild(item);
  });
}

function bukaEditProduk(id) {
  const target = produkList.find((p) => p.id === id);
  if (!target) return;

  document.getElementById("admin-modal").classList.remove("hidden");
  document.getElementById("admin-auth-box").classList.add("hidden");
  document.getElementById("admin-content-box").classList.remove("hidden");

  // Buka Tab Kelola Produk
  switchAdminTab("tab-produk-btn", "form-kelola-produk");

  const uploadForm = document.getElementById("upload-product-form");
  uploadForm.classList.remove("hidden");
  document.getElementById("prod-edit-id").value = target.id;
  document.getElementById("prod-name").value = target.nama;
  document.getElementById("prod-weight").value = target.berat;
  document.getElementById("prod-price").value = target.harga;
  document.getElementById("prod-desc").value = target.deskripsi;
  document.getElementById("edit-prod-title").innerText = target.nama;
  document.getElementById("edit-indicator").classList.remove("hidden");
  document.getElementById("submit-prod-btn").innerText =
    "Simpan Perubahan Produk";

  // Scroll otomatis ke formulir edit produk
  setTimeout(() => {
    uploadForm.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 100);
}

function konfirmasiHapusProduk(id) {
  showCustomConfirm(
    "Hapus Produk",
    "Apakah Anda yakin ingin menghapus produk ini dari daftar?",
    () => {
      produkList = produkList.filter((p) => p.id !== id);
      localStorage.setItem("umkm_produk", JSON.stringify(produkList));
      renderProduk();
      showToast("Produk berhasil dihapus!");
    },
  );
}

// Tab Navigation Admin Panel
function switchAdminTab(activeBtnId, activeFormId) {
  const tabs = [
    "tab-identitas-btn",
    "tab-hero-btn",
    "tab-fakta-btn",
    "tab-cerita-btn",
    "tab-kontak-btn",
    "tab-produk-btn",
  ];
  const forms = [
    "form-identitas-password",
    "form-foto-logo",
    "form-beranda-fakta",
    "form-tentang-usaha",
    "form-kontak-jam",
    "form-kelola-produk",
  ];

  forms.forEach((fId) => {
    const el = document.getElementById(fId);
    if (el) el.classList.add("hidden");
  });

  tabs.forEach((tId) => {
    const el = document.getElementById(tId);
    if (el)
      el.className =
        "admin-tab-btn flex items-center space-x-2 whitespace-nowrap py-2.5 px-3.5 border-b-2 font-semibold text-xs rounded-t-xl transition-all border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300";
  });

  const currentActiveBtn = document.getElementById(activeBtnId);
  const currentActiveForm = document.getElementById(activeFormId);

  if (currentActiveBtn)
    currentActiveBtn.className =
      "admin-tab-btn flex items-center space-x-2 whitespace-nowrap py-2.5 px-3.5 border-b-2 font-semibold text-xs rounded-t-xl transition-all border-dynamic-primary text-dynamic-primary bg-dynamic-accent";
  if (currentActiveForm) currentActiveForm.classList.remove("hidden");
}

// Event Listener Inisialisasi
document.addEventListener("DOMContentLoaded", function () {
  // Pasang Tema
  terapkanTema(currentTheme);

  // Render Tampilan Awal
  renderIdentitasUsaha();
  renderKontakUsaha();
  renderCeritaUsaha();
  renderFakta();
  renderKeunggulan();
  renderProduk();

  // Quick Theme Select Event
  const quickThemeSelect = document.getElementById("quick-theme-select");
  if (quickThemeSelect) {
    quickThemeSelect.addEventListener("change", (e) =>
      terapkanTema(e.target.value),
    );
  }

  const quickThemeSelectMobile = document.getElementById(
    "quick-theme-select-mobile",
  );
  if (quickThemeSelectMobile) {
    quickThemeSelectMobile.addEventListener("change", (e) =>
      terapkanTema(e.target.value),
    );
  }

  // Mobile Menu Toggle
  const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  if (menuBtn)
    menuBtn.addEventListener("click", () =>
      mobileMenu.classList.toggle("hidden"),
    );

  // Modal Controls
  const adminModal = document.getElementById("admin-modal");
  const openAdminBtn = document.getElementById("open-admin-btn");
  const openAdminMobile = document.getElementById("open-admin-btn-mobile");
  const closeAdminBtn = document.getElementById("close-admin-btn");

  const openModalFunc = () => adminModal.classList.remove("hidden");
  openAdminBtn.addEventListener("click", openModalFunc);
  openAdminMobile.addEventListener("click", openModalFunc);
  closeAdminBtn.addEventListener("click", () =>
    adminModal.classList.add("hidden"),
  );

  // Admin Auth
  const adminAuthBox = document.getElementById("admin-auth-box");
  const adminContentBox = document.getElementById("admin-content-box");
  const adminLoginBtn = document.getElementById("admin-login-btn");
  const pinInput = document.getElementById("admin-pin-input");
  const pinError = document.getElementById("pin-error-msg");

  adminLoginBtn.addEventListener("click", () => {
    if (pinInput.value === currentAdminPIN) {
      adminAuthBox.classList.add("hidden");
      adminContentBox.classList.remove("hidden");
      pinError.classList.add("hidden");
      pinInput.value = "";
    } else {
      pinError.classList.remove("hidden");
    }
  });

  // Tab Click Events
  document
    .getElementById("tab-identitas-btn")
    .addEventListener("click", () =>
      switchAdminTab("tab-identitas-btn", "form-identitas-password"),
    );
  document
    .getElementById("tab-hero-btn")
    .addEventListener("click", () =>
      switchAdminTab("tab-hero-btn", "form-foto-logo"),
    );
  document
    .getElementById("tab-fakta-btn")
    .addEventListener("click", () =>
      switchAdminTab("tab-fakta-btn", "form-beranda-fakta"),
    );
  document
    .getElementById("tab-cerita-btn")
    .addEventListener("click", () =>
      switchAdminTab("tab-cerita-btn", "form-tentang-usaha"),
    );
  document
    .getElementById("tab-kontak-btn")
    .addEventListener("click", () =>
      switchAdminTab("tab-kontak-btn", "form-kontak-jam"),
    );
  document
    .getElementById("tab-produk-btn")
    .addEventListener("click", () =>
      switchAdminTab("tab-produk-btn", "form-kelola-produk"),
    );

  // Submit Form Identitas & Password
  document
    .getElementById("form-identitas-password")
    .addEventListener("submit", (e) => {
      e.preventDefault();
      identitasUsaha.namaUsaha =
        document.getElementById("admin-input-nama-usaha").value.trim() ||
        identitasUsaha.namaUsaha;
      identitasUsaha.labelKecil =
        document.getElementById("admin-input-label-kecil").value.trim() ||
        identitasUsaha.labelKecil;
      identitasUsaha.slogan =
        document.getElementById("admin-input-slogan").value.trim() ||
        identitasUsaha.slogan;

      // Ganti Password Owner jika diisi
      const newPass = document
        .getElementById("admin-input-password-baru")
        .value.trim();
      if (newPass !== "") {
        currentAdminPIN = newPass;
        localStorage.setItem("umkm_admin_pin", currentAdminPIN);
        document.getElementById("admin-input-password-baru").value = "";
      }

      // Ganti Tema
      const selectedTheme = document.getElementById(
        "admin-input-tema-default",
      ).value;
      terapkanTema(selectedTheme);

      localStorage.setItem("umkm_identitas", JSON.stringify(identitasUsaha));
      renderIdentitasUsaha();
      showToast("Identitas Usaha, Sandi & Tema berhasil diperbarui!");
      adminModal.classList.add("hidden");
    });

  // Submit Form Foto & Logo
  document
    .getElementById("form-foto-logo")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      const lokasiVal = document
        .getElementById("admin-input-lokasi")
        .value.trim();
      if (lokasiVal) identitasUsaha.lokasi = lokasiVal;

      const logoFileInput = document.getElementById("logo-file-input");
      const logoUrlInput = document.getElementById("logo-url-input");
      if (logoFileInput.files[0]) {
        identitasUsaha.logoUrl = await fileToBase64(logoFileInput.files[0]);
      } else if (logoUrlInput.value) {
        identitasUsaha.logoUrl = logoUrlInput.value;
      }

      const heroFileInput = document.getElementById("hero-file-input");
      const heroUrlInput = document.getElementById("hero-url-input");
      if (heroFileInput.files[0]) {
        document.getElementById("hero-display-img").src = await fileToBase64(
          heroFileInput.files[0],
        );
      } else if (heroUrlInput.value) {
        document.getElementById("hero-display-img").src = heroUrlInput.value;
      }

      localStorage.setItem("umkm_identitas", JSON.stringify(identitasUsaha));
      renderIdentitasUsaha();
      showToast("Foto & Logo berhasil diperbarui!");
      adminModal.classList.add("hidden");
    });

  // Helper Base64
  function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  // Submit Form Poin Fakta
  document
    .getElementById("form-beranda-fakta")
    .addEventListener("submit", (e) => {
      e.preventDefault();
      faktaList.forEach((f) => {
        const tInput = document.getElementById(`fakta-judul-${f.id}`);
        const dInput = document.getElementById(`fakta-desc-${f.id}`);
        if (tInput && dInput) {
          f.judul = tInput.value;
          f.deskripsi = dInput.value;
        }
      });
      localStorage.setItem("umkm_fakta", JSON.stringify(faktaList));
      renderFakta();
      showToast("3 Poin Fakta berhasil diperbarui!");
      adminModal.classList.add("hidden");
    });

  // Submit Form Tentang Usaha
  document
    .getElementById("form-tentang-usaha")
    .addEventListener("submit", (e) => {
      e.preventDefault();
      ceritaUsaha.teks = document.getElementById("admin-cerita-teks").value;
      ceritaUsaha.tahun = document.getElementById("admin-stat-tahun").value;
      ceritaUsaha.pemilik = document.getElementById("admin-stat-pemilik").value;
      ceritaUsaha.karyawan = document.getElementById(
        "admin-stat-karyawan",
      ).value;

      localStorage.setItem("umkm_cerita", JSON.stringify(ceritaUsaha));
      renderCeritaUsaha();
      showToast("Cerita Usaha berhasil diperbarui!");
      adminModal.classList.add("hidden");
    });

  // Submit Form Kontak & Jam Buka
  document.getElementById("form-kontak-jam").addEventListener("submit", (e) => {
    e.preventDefault();
    kontakUsaha.alamat = document.getElementById("admin-alamat").value;
    kontakUsaha.wa = document.getElementById("admin-wa").value;
    kontakUsaha.medsos = document.getElementById("admin-medsos").value;
    kontakUsaha.jamSenin = document.getElementById("admin-jambuka-senin").value;
    kontakUsaha.jamMinggu = document.getElementById(
      "admin-jambuka-minggu",
    ).value;
    kontakUsaha.mapsUrl = document.getElementById("admin-maps-url").value;

    localStorage.setItem("umkm_kontak", JSON.stringify(kontakUsaha));
    renderKontakUsaha();
    showToast("Kontak & Jam Operasional berhasil diperbarui!");
    adminModal.classList.add("hidden");
  });

  // Upload Product Controls
  document
    .getElementById("open-add-new-prod-btn")
    .addEventListener("click", () => {
      document.getElementById("upload-product-form").reset();
      document.getElementById("prod-edit-id").value = "";
      document.getElementById("upload-product-form").classList.remove("hidden");
      document.getElementById("edit-indicator").classList.add("hidden");
      document.getElementById("submit-prod-btn").innerText =
        "+ Tambah Produk Baru";
    });

  document.getElementById("cancel-edit-btn").addEventListener("click", () => {
    document.getElementById("upload-product-form").classList.add("hidden");
  });

  document
    .getElementById("upload-product-form")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      const editId = document.getElementById("prod-edit-id").value;
      const prodFileInput = document.getElementById("prod-file-input");
      const prodUrlInput = document.getElementById("prod-url-input");

      let imageSrc = prodUrlInput.value;
      if (prodFileInput.files[0]) {
        imageSrc = await fileToBase64(prodFileInput.files[0]);
      }

      if (editId) {
        const targetIndex = produkList.findIndex((p) => p.id == editId);
        if (targetIndex !== -1) {
          const existing = produkList[targetIndex];
          produkList[targetIndex] = {
            ...existing,
            nama: document.getElementById("prod-name").value,
            berat: document.getElementById("prod-weight").value,
            harga: document.getElementById("prod-price").value,
            deskripsi: document.getElementById("prod-desc").value,
            foto: imageSrc || existing.foto,
          };
        }
        showToast("Produk berhasil diperbarui!");
      } else {
        const newProd = {
          id: Date.now(),
          nama: document.getElementById("prod-name").value,
          berat: document.getElementById("prod-weight").value,
          harga: document.getElementById("prod-price").value,
          deskripsi: document.getElementById("prod-desc").value,
          foto:
            imageSrc ||
            "https://placehold.co/400x300/7A3E1D/ffffff?text=Produk+Makanan",
        };
        produkList.unshift(newProd);
        showToast("Produk baru berhasil ditambahkan!");
      }

      localStorage.setItem("umkm_produk", JSON.stringify(produkList));
      renderProduk();
      document.getElementById("upload-product-form").classList.add("hidden");
    });
});
