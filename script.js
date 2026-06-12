/* ===== script.js ===== */
// Graphic Design Portfolio - Interactive Gallery

// Design categories with sample data (20-40 images per category)
const designCategories = [
  {
    id: 1,
    name: "Brand Identity Design",
    category: "Logo & Branding",
    description: "Complete brand identity packages including logos, color palettes, business cards, and brand guidelines.",
    icon: "fa-trademark",
    imageCount: 28,
    imagePrefix: "brand"
  },
  {
    id: 2,
    name: "Poster Design Series",
    category: "Print & Poster",
    description: "Creative poster designs for events, music festivals, campaigns, and art exhibitions.",
    icon: "fa-poster",
    imageCount: 35,
    imagePrefix: "poster"
  },
  {
    id: 3,
    name: "Social Media Graphics",
    category: "Digital Design",
    description: "Engaging social media posts, stories, banners, and campaign visuals for various platforms.",
    icon: "fa-chart-line",
    imageCount: 42,
    imagePrefix: "social"
  },
  {
    id: 4,
    name: "Packaging Design",
    category: "Product Design",
    description: "Creative packaging solutions for products including boxes, labels, and sustainable materials.",
    icon: "fa-box",
    imageCount: 25,
    imagePrefix: "packaging"
  },
  {
    id: 5,
    name: "UI/UX Design",
    category: "Web & App",
    description: "Modern user interface designs for websites, mobile apps, and dashboards.",
    icon: "fa-chart-pie",
    imageCount: 30,
    imagePrefix: "uiux"
  },
  {
    id: 6,
    name: "Editorial & Magazine",
    category: "Print Layout",
    description: "Magazine spreads, brochures, catalogs, and editorial layouts.",
    icon: "fa-newspaper",
    imageCount: 22,
    imagePrefix: "editorial"
  }
];

// Generate placeholder images with beautiful gradients
// REPLACE THIS FUNCTION with your actual PNG image paths
function getSampleImageUrl(categoryId, index) {
  // Color palette for variety
  const colors = ['00d4c0', 'ff6f4a', '8b5cf6', 'ec4899', 'f59e0b', '3b82f6', '10b981', 'ef4444', '06b6d4', 'd946ef'];
  const color = colors[index % colors.length];
  
  // Category name for text overlay
  let categoryName = "";
  switch(categoryId) {
    case 1: categoryName = "Brand Identity"; break;
    case 2: categoryName = "Poster Design"; break;
    case 3: categoryName = "Social Media"; break;
    case 4: categoryName = "Packaging"; break;
    case 5: categoryName = "UI/UX Design"; break;
    case 6: categoryName = "Editorial"; break;
    default: categoryName = "Design";
  }
  
  // Generate placeholder image with text
  // 🔴 IMPORTANT: Replace this with your actual images:
  // Example: return `images/brand_${index + 1}.png`;
  return `https://placehold.co/800x600/${color}/1a1a1a?text=${encodeURIComponent(categoryName)}+Sample+${index + 1}`;
}

// Generate full image array for a category
function getCategoryImages(category) {
  const images = [];
  const count = category.imageCount;
  for (let i = 0; i < count; i++) {
    images.push({
      id: i + 1,
      url: getSampleImageUrl(category.id, i),
      title: `${category.name} - Design ${i + 1}`,
      description: `Professional ${category.name.toLowerCase()} showcasing creativity and modern design principles.`
    });
  }
  return images;
}

// Open detailed gallery window for a category
function openCategoryGallery(category) {
  const images = getCategoryImages(category);
  const galleryWindow = window.open('', '_blank');
  
  if (!galleryWindow) {
    alert("Please allow pop-ups to view the gallery. Your browser blocked the new window.");
    return;
  }
  
  let galleryHTML = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${category.name} | Neshan Shrestha Design Gallery</title>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          font-family: 'Inter', sans-serif;
          background: #070707;
          color: #ffffff;
          padding: 40px 20px;
        }
        .gallery-container { max-width: 1400px; margin: 0 auto; }
        .gallery-header {
          text-align: center;
          margin-bottom: 50px;
          padding-bottom: 30px;
          border-bottom: 1px solid #262626;
        }
        .gallery-header h1 {
          font-size: 2.5rem;
          background: linear-gradient(135deg, #00d4c0, #ff6f4a);
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          margin-bottom: 15px;
        }
        .gallery-header p { color: #c0c0c0; max-width: 600px; margin: 0 auto; }
        .stats {
          display: flex;
          justify-content: center;
          gap: 30px;
          margin-top: 20px;
          color: #00d4c0;
        }
        .close-top {
          position: fixed;
          top: 20px;
          right: 30px;
          background: #00d4c0;
          color: #070707;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          cursor: pointer;
          border: none;
          z-index: 1000;
          transition: all 0.3s;
        }
        .close-top:hover { transform: scale(1.1); background: #ff6f4a; }
        .image-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 25px;
        }
        .image-card {
          background: #0f0f0f;
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid #262626;
          transition: all 0.3s;
          cursor: pointer;
        }
        .image-card:hover { transform: translateY(-8px); border-color: #00d4c0; box-shadow: 0 20px 40px rgba(0,212,192,0.2); }
        .image-card img {
          width: 100%;
          height: 