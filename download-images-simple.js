// Simple Node.js script to download product images (NO API KEY NEEDED)
// Install required package: npm install axios

const axios = require('axios');
const fs = require('fs');
const path = require('path');

const products = [
  // Windows
  { name: 'windows-11-pro', url: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&h=600&fit=crop&q=80' },
  { name: 'windows-11-pro-online', url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop&q=80' },
  { name: 'windows-11-pro-phone', url: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&h=600&fit=crop&q=80' },
  { name: 'windows-11-home', url: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&h=600&fit=crop&q=80' },
  { name: 'windows-10-pro', url: 'https://images.unsplash.com/photo-1593642532400-2682810df593?w=800&h=600&fit=crop&q=80' },
  { name: 'windows-10-pro-online', url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop&q=80' },
  { name: 'windows-10-pro-phone', url: 'https://images.unsplash.com/photo-1593642532400-2682810df593?w=800&h=600&fit=crop&q=80' },
  { name: 'windows-10-home', url: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&h=600&fit=crop&q=80' },
  { name: 'windows-8-1-pro', url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop&q=80' },
  { name: 'windows-7-professional', url: 'https://images.unsplash.com/photo-1593642532400-2682810df593?w=800&h=600&fit=crop&q=80' },
  { name: 'windows-365-business', url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop&q=80' },
  
  // Office (Orange theme)
  { name: 'office-2021-professional-plus', url: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&h=600&fit=crop&q=80' },
  { name: 'office-2021-pro-plus-online', url: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=600&fit=crop&q=80' },
  { name: 'office-2021-pro-plus-bind', url: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&h=600&fit=crop&q=80' },
  { name: 'office-2021-pro-plus-phone', url: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=600&fit=crop&q=80' },
  { name: 'office-2021-home-business', url: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&h=600&fit=crop&q=80' },
  { name: 'office-2019-professional-plus', url: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=600&fit=crop&q=80' },
  { name: 'office-2019-pro-plus-online', url: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&h=600&fit=crop&q=80' },
  { name: 'office-2019-pro-plus-bind', url: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=600&fit=crop&q=80' },
  { name: 'office-2019-pro-plus-phone', url: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&h=600&fit=crop&q=80' },
  { name: 'office-2016-professional-plus', url: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=600&fit=crop&q=80' },
  { name: 'office-2013-professional-plus', url: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&h=600&fit=crop&q=80' },
  { name: 'office-365-1-year', url: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=600&fit=crop&q=80' },
  
  // Server (Gray theme)
  { name: 'windows-server-2022-standard', url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop&q=80' },
  { name: 'windows-server-2022-online', url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop&q=80' },
  { name: 'windows-server-2019-standard', url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop&q=80' },
  { name: 'windows-server-2019-online', url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop&q=80' },
  { name: 'windows-server-2022-datacenter', url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop&q=80' },
  { name: 'windows-server-2016-standard', url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop&q=80' },
  
  // Visio (Teal theme)
  { name: 'visio-professional-2021', url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80' },
  { name: 'visio-professional-2021-online', url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80' },
  { name: 'visio-professional-2021-phone', url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80' },
  { name: 'visio-standard-2021', url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80' },
  { name: 'visio-professional-2019', url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80' },
  { name: 'visio-professional-2019-online', url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80' },
  
  // Project (Green theme)
  { name: 'project-professional-2021', url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop&q=80' },
  { name: 'project-professional-2021-online', url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop&q=80' },
  { name: 'project-professional-2021-phone', url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop&q=80' },
  { name: 'project-standard-2021', url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop&q=80' },
  { name: 'project-professional-2019', url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop&q=80' },
  { name: 'project-professional-2019-online', url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop&q=80' },
  
  // SQL Server
  { name: 'sql-server-2022-standard', url: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&h=600&fit=crop&q=80' },
  { name: 'sql-server-2022-online', url: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&h=600&fit=crop&q=80' },
  { name: 'sql-server-2019-standard', url: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&h=600&fit=crop&q=80' },
  { name: 'sql-server-2019-online', url: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&h=600&fit=crop&q=80' },
  { name: 'sql-server-2017-standard', url: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&h=600&fit=crop&q=80' },
  
  // Visual Studio
  { name: 'visual-studio-2022-professional', url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop&q=80' },
  { name: 'visual-studio-2022-enterprise', url: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop&q=80' },
  { name: 'visual-studio-2019-professional', url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop&q=80' },
  { name: 'visual-studio-code-extensions', url: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&h=600&fit=crop&q=80' },
  
  // Antivirus
  { name: 'kaspersky-total-security', url: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&h=600&fit=crop&q=80' },
  { name: 'norton-360-deluxe', url: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop&q=80' },
  { name: 'bitdefender-total-security', url: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&h=600&fit=crop&q=80' },
  { name: 'mcafee-total-protection', url: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&h=600&fit=crop&q=80' },
  { name: 'eset-internet-security', url: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop&q=80' },
  { name: 'avast-premium-security', url: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&h=600&fit=crop&q=80' },
  { name: 'trend-micro-maximum-security', url: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&h=600&fit=crop&q=80' },
];

async function downloadImage(product) {
  try {
    const response = await axios.get(product.url, { 
      responseType: 'arraybuffer',
      timeout: 10000
    });
    
    const dir = path.join(__dirname, 'public', 'products');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    const filePath = path.join(dir, `${product.name}.jpg`);
    fs.writeFileSync(filePath, response.data);
    
    console.log(`✓ Downloaded: ${product.name}.jpg`);
    return true;
  } catch (error) {
    console.error(`✗ Error downloading ${product.name}:`, error.message);
    return false;
  }
}

async function downloadAll() {
  console.log(`Starting download of ${products.length} images...\n`);
  
  let successCount = 0;
  let failCount = 0;
  
  for (const product of products) {
    const success = await downloadImage(product);
    if (success) {
      successCount++;
    } else {
      failCount++;
    }
    // Small delay to avoid overwhelming the server
    await new Promise(resolve => setTimeout(resolve, 200));
  }
  
  console.log(`\n========================================`);
  console.log(`✓ Successfully downloaded: ${successCount} images`);
  console.log(`✗ Failed: ${failCount} images`);
  console.log(`📁 Location: public/products/`);
  console.log(`========================================`);
}

downloadAll();
