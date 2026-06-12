// ============================================================
// WORK EXPERIENCE DATA - EDIT THIS SECTION
// ============================================================
// Add your work experiences here. Each experience can have:
// - title: Job title / Role
// - company: Company name
// - date: Duration (e.g., "2023 - Present")
// - description: What you did
// - skills: Array of skills/tools
// - image: Optional image path (place in images/experience/ folder)
// ============================================================

const WORK_EXPERIENCES = [
  {
    id: 1,
    title: "Graphic Designer",
    company: "Guntabya Technologies",
    date: "(January 2025 – January 2026)",
    description: "Graphic Designer, Video Editor & Social Media Handler (January 2025 – January 2026). Designed creative graphics and digital marketing materials for social media. Edited promotional videos and short-form content for branding. Managed social media content to maintain consistent brand identity. Supported digital marketing campaigns through creative media.",
    skills: ["Adobe Photoshop", "Canva", "Capcut Pro", "social media management,premiere pro"],
    image: ""
  },
 
];

// Category configuration for design samples
const DESIGN_CATEGORIES = [
  { id: 1, name: "Poster Design Series", category: "Print & Poster", description: "Creative poster designs for events, music festivals, campaigns, and art exhibitions.", icon: "fa-poster", folder: "poster" },
  { id: 2, name: "Social Media Graphics", category: "Digital Design", description: "Engaging social media posts, stories, banners, and campaign visuals.", icon: "fa-chart-line", folder: "social" },
  { id: 3, name: "Packaging Design", category: "Product Design", description: "Creative packaging solutions for products including boxes and labels.", icon: "fa-box", folder: "packaging" },
  { id: 4, name: "UI/UX Design", category: "Web & App", description: "Modern user interface designs for websites, mobile apps, and dashboards.", icon: "fa-chart-pie", folder: "uiux" }
];

// ============================================================
// 📸 ADD YOUR IMAGES HERE - EDIT THIS SECTION
// ============================================================
// Just add your image filenames to the arrays below.
// No naming restrictions! Use any filename you want.
// Example: "my-awesome-poster.png", "summer-design.jpg", etc.
// ============================================================

const USER_IMAGES = {
  poster: [
    // Add your poster images here
    // "poster1.png", "poster2.png", "poster3.png"
  ],
  social: [
    // Add your social media images here
  ],
  packaging: [
    // Add your packaging images here
  ],
  uiux: [
    // Add your UI/UX images here
  ]
};

// Helper function to build image URL
function buildImageUrl(folder, filename) {
  return `images/${folder}/${filename}`;
}

// Get images from user configuration
function getImagesFromConfig(folderName) {
  const images = [];
  const imageFiles = USER_IMAGES[folderName] || [];
  
  for (let i = 0; i < imageFiles.length; i++) {
    const filename = imageFiles[i];
    images.push({
      id: i + 1,
      url: buildImageUrl(folderName, filename),
      title: `${folderName.toUpperCase()} Design ${i + 1}`,
      description: `Professional ${folderName} design showcase`
    });
  }
  return images;
}

// Auto-detect images with common patterns
async function autoDetectImages(folderName, maxTest = 100) {
  const detectedImages = [];
  const extensions = ['png', 'jpg', 'jpeg', 'webp', 'gif'];
  const patterns = [
    (i) => `${i}`,
    (i) => `${i}.png`,
    (i) => `img${i}`,
    (i) => `image${i}`,
    (i) => `design_${i}`,
    (i) => `${folderName}_${i}`,
    (i) => `${folderName}${i}`,
  ];
  
  for (let i = 1; i <= maxTest; i++) {
    let found = false;
    for (const ext of extensions) {
      for (const pattern of patterns) {
        const testName = pattern(i);
        const url = `images/${folderName}/${testName}.${ext}`;
        const exists = await testImageExists(url);
        if (exists) {
          detectedImages.push({
            id: i,
            url: url,
            title: `${folderName.toUpperCase()} Design ${detectedImages.length + 1}`,
            description: `Professional ${folderName} design`
          });
          found = true;
          break;
        }
      }
      if (found) break;
    }
    if (!found && i > 5 && detectedImages.length === 0) break;
    if (!found && detectedImages.length > 0 && i > detectedImages.length + 5) break;
  }
  
  return detectedImages;
}

function testImageExists(url) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
}

// Load categories with images
async function loadCategories() {
  const categories = [];
  
  for (const category of DESIGN_CATEGORIES) {
    let images = getImagesFromConfig(category.folder);
    
    if (images.length === 0) {
      images = await autoDetectImages(category.folder, 100);
    }
    
    categories.push({
      ...category,
      images: images,
      imageCount: images.length
    });
  }
  
  return categories;
}

// Show toast notification
function showToast(message, isError = false) {
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toastMessage');
  
  if (!toast) return;
  
  toastMessage.textContent = message;
  toast.style.background = isError ? '#ff6f4a' : '#00d4c0';
  toast.classList.add('show');
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// Render Work Experience Section
function renderExperience() {
  const grid = document.getElementById('experienceGrid');
  if (!grid) return;
  
  if (WORK_EXPERIENCES.length === 0) {
    grid.innerHTML = `
      <div style="grid-column:1/-1; text-align:center; padding:60px; background:var(--bg-card); border-radius:40px; border:1px solid var(--border);">
        <i class="fas fa-briefcase" style="font-size:64px; color:var(--primary); margin-bottom:20px; display:block;"></i>
        <h3>No Work Experience Added Yet</h3>
        <p style="color:var(--text-secondary); margin-top:15px;">Add your work experiences to the WORK_EXPERIENCES array in script.js</p>
      </div>
    `;
    return;
  }
  
  grid.innerHTML = WORK_EXPERIENCES.map((exp, index) => {
    const hasImage = exp.image && exp.image !== '';
    const animationDelay = (index * 0.1) + 0.1;
    
    return `
      <div class="experience-card" style="animation-delay: ${animationDelay}s">
        <div class="exp-image">
          ${hasImage ? 
            `<img src="${exp.image}" alt="${exp.title}" onerror="this.parentElement.innerHTML='<i class=\\'fas fa-briefcase\\'></i>'">` : 
            `<i class="fas fa-briefcase"></i>`
          }
        </div>
        <div class="exp-info">
          <h3>${escapeHtml(exp.title)}</h3>
          <div class="exp-company"><i class="fas fa-building"></i> ${escapeHtml(exp.company)}</div>
          <div class="exp-date"><i class="fas fa-calendar-alt"></i> ${escapeHtml(exp.date)}</div>
          <p class="exp-description">${escapeHtml(exp.description)}</p>
          <div class="exp-skills">
            ${exp.skills.map(skill => `<span>${escapeHtml(skill)}</span>`).join('')}
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Open gallery INLINE (NO popup, NO blank page)
function openInlineGallery(category) {
  const images = category.images || [];
  
  if (images.length === 0) {
    showToast(`No images found in "${category.folder}" folder. Add your images to display them.`, true);
    return;
  }
  
  document.getElementById('galleryTitle').innerHTML = `<i class="fas ${category.icon}"></i> ${category.name}`;
  document.getElementById('galleryDesc').innerHTML = category.description;
  document.getElementById('galleryStats').innerHTML = `<span><i class="fas fa-images"></i> ${images.length} Design${images.length !== 1 ? 's' : ''}</span><span><i class="fas fa-tag"></i> ${category.category}</span>`;
  
  const grid = document.getElementById('galleryGrid');
  grid.innerHTML = images.map((img, idx) => `
    <div class="image-card" onclick="openFullscreenImage('${img.url}')" style="animation-delay: ${(idx * 0.05) + 0.1}s">
      <img src="${img.url}" alt="${img.title}" loading="lazy" onerror="this.src='https://placehold.co/800x600/262626/00d4c0?text=Image+Not+Found'">
      <div class="card-info">
        <h3><i class="fas fa-image"></i> ${img.title}</h3>
        <p>${img.description}</p>
      </div>
    </div>
  `).join('');
  
  document.getElementById('galleryModal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeGalleryModal() {
  document.getElementById('galleryModal').classList.remove('active');
  document.body.style.overflow = '';
}

function openFullscreenImage(url) {
  const modal = document.createElement('div');
  modal.className = 'fullscreen-modal';
  modal.onclick = () => modal.remove();
  
  const img = document.createElement('img');
  img.src = url;
  
  modal.appendChild(img);
  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';
  
  modal.onclick = () => {
    modal.remove();
    document.body.style.overflow = '';
  };
}

// Render samples grid on main page
async function renderSamples() {
  const grid = document.getElementById('samplesGrid');
  if (!grid) return;
  
  grid.innerHTML = '<div class="loading-spinner"><i class="fas fa-spinner"></i><p style="margin-top: 15px;">Loading your designs...</p></div>';
  
  const categories = await loadCategories();
  const hasAnyImages = categories.some(c => c.imageCount > 0);
  
  if (!hasAnyImages) {
    grid.innerHTML = `
      <div style="grid-column:1/-1; text-align:center; padding:60px; background:var(--bg-card); border-radius:40px; border:1px solid var(--border);">
        <i class="fas fa-folder-open" style="font-size:64px; color:var(--primary); margin-bottom:20px; display:block;"></i>
        <h3>📸 Add Your Design Images</h3>
        <p style="color:var(--text-secondary); margin-top:15px; max-width:550px; margin-left:auto; margin-right:auto;">
          <strong>Two ways to add your images:</strong><br><br>
          1️⃣ <strong>Easy way:</strong> Edit the <code style="background:#1a1a1a; padding:2px 6px; border-radius:4px;">USER_IMAGES</code> array in the JavaScript section<br><br>
          2️⃣ <strong>Auto-detect:</strong> Place PNG files in folders:<br>
          <code style="background:#1a1a1a; padding:8px 12px; border-radius:8px; display:inline-block; margin-top:10px;">
          images/poster/ (any filename)<br>
          images/social/ (any filename)<br>
          images/packaging/ (any filename)<br>
          images/uiux/ (any filename)
          </code>
        </p>
        <p style="color:var(--text-muted); margin-top:20px; font-size:0.85rem;">
          Works with ANY filenames - no naming restrictions!
        </p>
        <button onclick="showToast('Create an images folder and add your PNG files', false)" style="margin-top:20px; background:var(--primary); color:#070707; border:none; padding:10px 24px; border-radius:100px; cursor:pointer;">
          <i class="fas fa-question-circle"></i> Need Help?
        </button>
      </div>
    `;
    return;
  }
  
  grid.innerHTML = categories.map((cat, index) => `
    <div class="sample-card" onclick="openInlineGallery(${JSON.stringify(cat).replace(/"/g, '&quot;')})" style="animation-delay: ${(index * 0.1) + 0.1}s">
      <div class="sample-preview">
        <i class="fas ${cat.icon}"></i>
      </div>
      <div class="sample-info">
        <h3>${cat.name}</h3>
        <p>${cat.description.substring(0, 80)}...</p>
        <span class="sample-stats"><i class="fas fa-images"></i> ${cat.imageCount} design${cat.imageCount !== 1 ? 's' : ''}</span>
        <button class="view-gallery-btn" onclick="event.stopPropagation(); openInlineGallery(${JSON.stringify(cat).replace(/"/g, '&quot;')})">
          <i class="fas fa-images"></i> View Gallery (${cat.imageCount} images)
        </button>
      </div>
    </div>
  `).join('');
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  renderExperience();
  renderSamples();
  showToast('Welcome to my portfolio! 👋', false);
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeGalleryModal();
    const fullscreenModal = document.querySelector('.fullscreen-modal');
    if (fullscreenModal) {
      fullscreenModal.remove();
      document.body.style.overflow = '';
    }
  }
});

// Make functions globally available
window.openInlineGallery = openInlineGallery;
window.closeGalleryModal = closeGalleryModal;
window.openFullscreenImage = openFullscreenImage;
window.showToast = showToast;