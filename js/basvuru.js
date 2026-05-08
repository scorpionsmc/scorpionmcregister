// ===== BAŞVURU FORMU JS =====

let uploadedImageBase64 = null;

// Image upload handling
const screenshotInput = document.getElementById('screenshotInput');
const imagePreview = document.getElementById('imagePreview');
const previewImg = document.getElementById('previewImg');
const fileUploadArea = document.getElementById('fileUploadArea');

screenshotInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;

  if (!file.type.startsWith('image/')) {
    alert('Lütfen bir görsel dosyası seçin!');
    return;
  }

  // Max 5MB
  if (file.size > 5 * 1024 * 1024) {
    alert('Dosya boyutu 5MB\'dan küçük olmalıdır!');
    return;
  }

  const reader = new FileReader();
  reader.onload = (event) => {
    uploadedImageBase64 = event.target.result;
    previewImg.src = uploadedImageBase64;
    imagePreview.style.display = 'block';
    fileUploadArea.style.borderColor = 'var(--success)';
  };
  reader.readAsDataURL(file);
});

// Drag & drop
fileUploadArea.addEventListener('dragover', (e) => {
  e.preventDefault();
  fileUploadArea.style.borderColor = 'var(--accent)';
  fileUploadArea.style.background = 'rgba(255,107,0,0.05)';
});

fileUploadArea.addEventListener('dragleave', () => {
  fileUploadArea.style.borderColor = '';
  fileUploadArea.style.background = '';
});

fileUploadArea.addEventListener('drop', (e) => {
  e.preventDefault();
  fileUploadArea.style.borderColor = '';
  fileUploadArea.style.background = '';
  const file = e.dataTransfer.files[0];
  if (file) {
    screenshotInput.files = e.dataTransfer.files;
    screenshotInput.dispatchEvent(new Event('change'));
  }
});

// Form submission
const form = document.getElementById('applicationForm');
const submitBtn = document.getElementById('submitBtn');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const icName = document.getElementById('icName').value.trim();
  const oocName = document.getElementById('oocName').value.trim();
  const fivemYears = document.getElementById('fivemYears').value;
  const discordName = document.getElementById('discordName').value.trim();
  const notes = document.getElementById('notes').value.trim();

  if (!icName || !oocName || !fivemYears || !discordName) {
    alert('Lütfen tüm zorunlu alanları doldurun!');
    return;
  }

  if (!uploadedImageBase64) {
    alert('Lütfen Discord başvuru ekran görüntüsünü yükleyin!');
    return;
  }

  // Show loading
  submitBtn.classList.add('btn-loading');
  submitBtn.innerHTML = '<span class="loading-spinner"></span>';

  const applicationData = {
    icName,
    oocName,
    fivemYears: parseInt(fivemYears),
    discordName,
    notes: notes || '',
    screenshot: uploadedImageBase64,
    status: 'pending',
    createdAt: new Date().toISOString(),
    timestamp: Date.now()
  };

  try {
    await database.ref('applications').push(applicationData);
    // Show success modal
    document.getElementById('successModal').classList.add('active');
    form.reset();
    uploadedImageBase64 = null;
    imagePreview.style.display = 'none';
    fileUploadArea.style.borderColor = '';
  } catch (error) {
    console.error('Başvuru gönderme hatası:', error);
    alert('Hata: ' + error.message + '\n\nKod: ' + error.code);
  } finally {
    submitBtn.classList.remove('btn-loading');
    submitBtn.innerHTML = '<span>BAŞVURUYU GÖNDER</span>';
  }
});
