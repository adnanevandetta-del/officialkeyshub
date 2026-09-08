// Node.js script to download product images from Unsplash
// Install required package: npm install axios

const axios = require('axios');
const fs = require('fs');
const path = require('path');

const UNSPLASH_ACCESS_KEY = 'YOUR_UNSPLASH_ACCESS_KEY'; // Get from https://unsplash.com/developers

const products = [
  // Windows
  { name: 'windows-11-pro', query: 'windows 11 computer blue screen' },
  { name: 'windows-11-pro-online', query: 'windows 11 laptop modern' },
  { name: 'windows-11-pro-phone', query: 'windows 11 desktop blue' },
  { name: 'windows-11-home', query: 'windows 11 home office' },
  { name: 'windows-10-pro', query: 'windows 10 professional workspace' },
  { name: 'windows-10-pro-online', query: 'windows 10 computer setup' },
  { name: 'windows-10-pro-phone', query: 'windows 10 desktop pc' },
  { name: 'windows-10-home', query: 'windows 10 laptop home' },
  { name: 'windows-8-1-pro', query: 'windows 8 computer screen' },
  { name: 'windows-7-professional', query: 'windows 7 classic desktop' },
  { name: 'windows-365-business', query: 'cloud computing microsoft office' },
  
  // Office
  { name: 'office-2021-professional-plus', query: 'microsoft office 2021 orange workspace' },
  { name: 'office-2021-pro-plus-online', query: 'office 365 laptop orange' },
  { name: 'office-2021-pro-plus-bind', query: 'microsoft office documents orange' },
  { name: 'office-2021-pro-plus-phone', query: 'office apps orange theme' },
  { name: 'office-2021-home-business', query: 'office word excel powerpoint' },
  { name: 'office-2019-professional-plus', query: 'microsoft office 2019 workspace' },
  { name: 'office-2019-pro-plus-online', query: 'office 2019 laptop orange' },
  { name: 'office-2019-pro-plus-bind', query: 'office suite documents' },
  { name: 'office-2019-pro-plus-phone', query: 'office productivity orange' },
  { name: 'office-2016-professional-plus', query: 'microsoft office 2016 desktop' },
  { name: 'office-2013-professional-plus', query: 'office 2013 workspace' },
  { name: 'office-365-1-year', query: 'office 365 cloud purple theme' },
  
  // Server
  { name: 'windows-server-2022-standard', query: 'server rack datacenter technology' },
  { name: 'windows-server-2022-online', query: 'data center servers gray' },
  { name: 'windows-server-2019-standard', query: 'server room technology' },
  { name: 'windows-server-2019-online', query: 'network servers gray' },
  { name: 'windows-server-2022-datacenter', query: 'enterprise datacenter servers' },
  { name: 'windows-server-2016-standard', query: 'server infrastructure' },
  
  // Visio
  { name: 'visio-professional-2021', query: 'business diagram flowchart teal' },
  { name: 'visio-professional-2021-online', query: 'data visualization diagram' },
  { name: 'visio-professional-2021-phone', query: 'flowchart business process' },
  { name: 'visio-standard-2021', query: 'organizational chart diagram' },
  { name: 'visio-professional-2019', query: 'network diagram teal theme' },
  { name: 'visio-professional-2019-online', query: 'process diagram visualization' },
  
  // Project
  { name: 'project-professional-2021', query: 'project management gantt chart green' },
  { name: 'project-professional-2021-online', query: 'project timeline green theme' },
  { name: 'project-professional-2021-phone', query: 'project planning workspace' },
  { name: 'project-standard-2021', query: 'project management chart' },
  { name: 'project-professional-2019', query: 'project schedule green' },
  { name: 'project-professional-2019-online', query: 'project management green theme' },
  
  // SQL Server
  { name: 'sql-server-2022-standard', query: 'database server technology' },
  { name: 'sql-server-2022-online', query: 'sql database technology' },
  { name: 'sql-server-2019-standard', query: 'database management system' },
  { name: 'sql-server-2019-online', query: 'data server technology' },
  { name: 'sql-server-2017-standard', query: 'database infrastructure' },
  
  // Visual Studio
  { name: 'visual-studio-2022-professional', query: 'coding programming developer workspace' },
  { name: 'visual-studio-2022-enterprise', query: 'software development code editor' },
  { name: 'visual-studio-2019-professional', query: 'programming ide developer' },
  { name: 'visual-studio-code-extensions', query: 'code editor programming laptop' },
  
  // Antivirus
  { name: 'kaspersky-total-security', query: 'cybersecurity protection shield' },
  { name: 'norton-360-deluxe', query: 'internet security antivirus' },
  { name: 'bitdefender-total-security', query: 'computer security shield' },
  { name: 'mcafee-total-protection', query: 'antivirus protection security' },
  { name: 'eset-internet-security', query: 'malware protection security' },
  { name: 'avast-premium-security', query: 'virus protection firewall' },
  { name: 'trend-micro-maximum-security', query: 'security software protection' },
];

async function downloadImage(product) {
  try {
    const response = await axios.get('https://api.unsplash.com/search/photos', {
      params: {
        query: product.query,
        per_page: 1,
        orientation: 'landscape'
      },
      headers: {
        'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`
      }
    });

    if (response.data.results.length > 0) {
      const imageUrl = response.data.results[0].urls.regular;
      const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
      
      const dir = path.join(__dirname, 'public', 'products');
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      
      const filePath = path.join(dir, `${product.name}.jpg`);
      fs.writeFileSync(filePath, imageResponse.data);
      
      console.log(`✓ Downloaded: ${product.name}.jpg`);
    } else {
      console.log(`✗ No image found for: ${product.name}`);
    }
  } catch (error) {
    console.error(`✗ Error downloading ${product.name}:`, error.message);
  }
}

async function downloadAll() {
  console.log(`Starting download of ${products.length} images...\n`);
  
  for (const product of products) {
    await downloadImage(product);
    // Wait 1 second between requests to respect rate limits
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('\n✓ All downloads complete!');
}

downloadAll();
