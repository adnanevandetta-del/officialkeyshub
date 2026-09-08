// Script to download official Microsoft product images
// NO API KEY NEEDED - Uses official Microsoft CDN and product images

const axios = require('axios');
const fs = require('fs');
const path = require('path');

const products = [
  // Windows - Official Microsoft Images
  { name: 'windows-11-pro', url: 'https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/MSFT_Windows_11_Pro_1920x1080?scl=1' },
  { name: 'windows-11-pro-online', url: 'https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/Windows-11-Product-Pro-Hero?scl=1' },
  { name: 'windows-11-pro-phone', url: 'https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/MSFT_Windows_11_Pro_1920x1080?scl=1' },
  { name: 'windows-11-home', url: 'https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/Windows-11-Product-Home-Hero?scl=1' },
  { name: 'windows-10-pro', url: 'https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/Windows_10_Pro_Logo?scl=1' },
  { name: 'windows-10-pro-online', url: 'https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/Windows_10_Pro_Logo?scl=1' },
  { name: 'windows-10-pro-phone', url: 'https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/Windows_10_Pro_Logo?scl=1' },
  { name: 'windows-10-home', url: 'https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/windows-10-home-logo?scl=1' },
  { name: 'windows-8-1-pro', url: 'https://compass-ssl.microsoft.com/assets/57/62/576280d2-2ecc-4edb-a227-37c38b8a2a29.jpg?n=Windows8-1_Icon_150x150.jpg' },
  { name: 'windows-7-professional', url: 'https://compass-ssl.microsoft.com/assets/91/82/9182e6b9-cc8f-4d11-8e9a-6f54f9c44d1d.jpg?n=Windows_7_Pro_80x80.jpg' },
  { name: 'windows-365-business', url: 'https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/Blade008_CrossSell_VP5_1920x720_2x?scl=1' },
  
  // Office - Official Microsoft Images  
  { name: 'office-2021-professional-plus', url: 'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE4LqQI?ver=3ed5' },
  { name: 'office-2021-pro-plus-online', url: 'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE4LqQI?ver=3ed5' },
  { name: 'office-2021-pro-plus-bind', url: 'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE4LqQI?ver=3ed5' },
  { name: 'office-2021-pro-plus-phone', url: 'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE4LqQI?ver=3ed5' },
  { name: 'office-2021-home-business', url: 'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RWyKPw?ver=50c5' },
  { name: 'office-2019-professional-plus', url: 'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE2OXIL?ver=60ba' },
  { name: 'office-2019-pro-plus-online', url: 'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE2OXIL?ver=60ba' },
  { name: 'office-2019-pro-plus-bind', url: 'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE2OXIL?ver=60ba' },
  { name: 'office-2019-pro-plus-phone', url: 'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE2OXIL?ver=60ba' },
  { name: 'office-2016-professional-plus', url: 'https://compass-ssl.microsoft.com/assets/c7/e0/c7e0b15b-a685-4bce-92d9-f7c6e8703f6a.jpg?n=Office2016_Icon_195x139.jpg' },
  { name: 'office-2013-professional-plus', url: 'https://compass-ssl.microsoft.com/assets/9f/d5/9fd5d1c1-7f5a-4c3b-b6c5-9c6f8f7a8b2c.jpg?n=Office2013_Icon_195x139.jpg' },
  { name: 'office-365-1-year', url: 'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE2FvOl?ver=7b3e' },
  
  // Server - Official Microsoft Images
  { name: 'windows-server-2022-standard', url: 'https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/Server-2022-Blade006-Feature-A-960x540?scl=1' },
  { name: 'windows-server-2022-online', url: 'https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/Server-2022-Blade006-Feature-A-960x540?scl=1' },
  { name: 'windows-server-2019-standard', url: 'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE2OXKN?ver=7d7a' },
  { name: 'windows-server-2019-online', url: 'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE2OXKN?ver=7d7a' },
  { name: 'windows-server-2022-datacenter', url: 'https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/Server-2022-Blade006-Feature-A-960x540?scl=1' },
  { name: 'windows-server-2016-standard', url: 'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE1YfDn?ver=ab1c' },
  
  // Visio - Official Microsoft Images
  { name: 'visio-professional-2021', url: 'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RWyKQa?ver=b55d' },
  { name: 'visio-professional-2021-online', url: 'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RWyKQa?ver=b55d' },
  { name: 'visio-professional-2021-phone', url: 'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RWyKQa?ver=b55d' },
  { name: 'visio-standard-2021', url: 'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RWyKQa?ver=b55d' },
  { name: 'visio-professional-2019', url: 'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE2OX7R?ver=b9d5' },
  { name: 'visio-professional-2019-online', url: 'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE2OX7R?ver=b9d5' },
  
  // Project - Official Microsoft Images
  { name: 'project-professional-2021', url: 'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RWyKQ4?ver=3f4a' },
  { name: 'project-professional-2021-online', url: 'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RWyKQ4?ver=3f4a' },
  { name: 'project-professional-2021-phone', url: 'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RWyKQ4?ver=3f4a' },
  { name: 'project-standard-2021', url: 'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RWyKQ4?ver=3f4a' },
  { name: 'project-professional-2019', url: 'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE2OX7V?ver=dc3f' },
  { name: 'project-professional-2019-online', url: 'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE2OX7V?ver=dc3f' },
  
  // SQL Server - Official Microsoft Images
  { name: 'sql-server-2022-standard', url: 'https://cloudblogs.microsoft.com/uploads/prod/sites/32/2022/11/SQL-Server-2022-featured-image-960x540-1.png' },
  { name: 'sql-server-2022-online', url: 'https://cloudblogs.microsoft.com/uploads/prod/sites/32/2022/11/SQL-Server-2022-featured-image-960x540-1.png' },
  { name: 'sql-server-2019-standard', url: 'https://www.microsoft.com/en-us/sql-server/blog/wp-content/uploads/sites/113/2023/03/SQL_Server_2019.png' },
  { name: 'sql-server-2019-online', url: 'https://www.microsoft.com/en-us/sql-server/blog/wp-content/uploads/sites/113/2023/03/SQL_Server_2019.png' },
  { name: 'sql-server-2017-standard', url: 'https://cloudblogs.microsoft.com/uploads/prod/sites/32/2017/09/sql-server-2017-1.png' },
  
  // Visual Studio - Official Microsoft Images
  { name: 'visual-studio-2022-professional', url: 'https://visualstudio.microsoft.com/wp-content/uploads/2021/10/Product-Icon.svg' },
  { name: 'visual-studio-2022-enterprise', url: 'https://visualstudio.microsoft.com/wp-content/uploads/2021/10/Product-Icon.svg' },
  { name: 'visual-studio-2019-professional', url: 'https://visualstudio.microsoft.com/wp-content/uploads/2019/06/BrandVisualStudioWin2019-3.svg' },
  { name: 'visual-studio-code-extensions', url: 'https://code.visualstudio.com/assets/images/code-stable.png' },
  
  // Antivirus - Official Brand Images
  { name: 'kaspersky-total-security', url: 'https://www.kaspersky.com/content/en-global/images/b2c/product-screenshot/screen-KTSMD-2-EN.png' },
  { name: 'norton-360-deluxe', url: 'https://us.norton.com/content/dam/norton/global/images/non-product/misc/norton-360-deluxe-box.png' },
  { name: 'bitdefender-total-security', url: 'https://www.bitdefender.com/content/dam/bitdefender/consumers/solutions/images/total-security-box-2024.png' },
  { name: 'mcafee-total-protection', url: 'https://www.mcafee.com/content/dam/consumer/en-us/product-box-shots/2022/total-protection-boxshot-2022.png' },
  { name: 'eset-internet-security', url: 'https://www.eset.com/fileadmin/ESET/INT/Products/Home/EIS/Product_banner_EIS.jpg' },
  { name: 'avast-premium-security', url: 'https://static3.avast.com/1/web/i/v2/components/product-box/premium-security.png' },
  { name: 'trend-micro-maximum-security', url: 'https://www.trendmicro.com/content/dam/trendmicro/global/en/consumer/products/maximum-security/images/box-maximum-security.png' },
];

async function downloadImage(product, retryCount = 0) {
  try {
    console.log(`Downloading: ${product.name}...`);
    
    const response = await axios.get(product.url, { 
      responseType: 'arraybuffer',
      timeout: 15000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    
    const dir = path.join(__dirname, 'public', 'products');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    // Determine file extension from content-type or URL
    let ext = '.jpg';
    const contentType = response.headers['content-type'];
    if (contentType) {
      if (contentType.includes('png')) ext = '.png';
      else if (contentType.includes('svg')) ext = '.svg';
      else if (contentType.includes('webp')) ext = '.webp';
    } else if (product.url.includes('.png')) {
      ext = '.png';
    } else if (product.url.includes('.svg')) {
      ext = '.svg';
    }
    
    const filePath = path.join(dir, `${product.name}${ext}`);
    fs.writeFileSync(filePath, response.data);
    
    console.log(`✓ Downloaded: ${product.name}${ext}`);
    return { success: true, ext };
  } catch (error) {
    if (retryCount < 2) {
      console.log(`⚠ Retrying ${product.name}... (${retryCount + 1}/2)`);
      await new Promise(resolve => setTimeout(resolve, 2000));
      return downloadImage(product, retryCount + 1);
    }
    console.error(`✗ Failed: ${product.name} - ${error.message}`);
    return { success: false };
  }
}

async function downloadAll() {
  console.log(`\n========================================`);
  console.log(`Downloading Official Microsoft Product Images`);
  console.log(`Total: ${products.length} products`);
  console.log(`========================================\n`);
  
  let successCount = 0;
  let failCount = 0;
  const failed = [];
  
  for (const product of products) {
    const result = await downloadImage(product);
    if (result.success) {
      successCount++;
    } else {
      failCount++;
      failed.push(product.name);
    }
    // Delay between downloads
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  console.log(`\n========================================`);
  console.log(`DOWNLOAD COMPLETE`);
  console.log(`========================================`);
  console.log(`✓ Successfully downloaded: ${successCount} images`);
  console.log(`✗ Failed: ${failCount} images`);
  console.log(`📁 Location: public/products/`);
  
  if (failed.length > 0) {
    console.log(`\n⚠ Failed downloads:`);
    failed.forEach(name => console.log(`  - ${name}`));
  }
  
  console.log(`========================================\n`);
}

downloadAll();
