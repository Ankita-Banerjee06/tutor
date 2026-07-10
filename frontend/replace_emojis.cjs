const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'src', 'pages');

const replacements = {
  "'📊'": "<LayoutDashboard size={18} />",
  "'📅'": "<Calendar size={18} />",
  "'📚'": "<BookOpen size={18} />",
  "'🤖'": "<Bot size={18} />",
  "'👑'": "<Crown size={18} />",
  "'📁'": "<Folder size={18} />",
  "'👥'": "<Users size={18} />",
  "'⚙️'": "<Settings size={18} />",
  "'🎓'": "<GraduationCap size={18} />"
};

const requiredImports = "import { LayoutDashboard, Calendar, BookOpen, Bot, Crown, Folder, Users, Settings, GraduationCap } from 'lucide-react';\n";

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  for (const [emoji, icon] of Object.entries(replacements)) {
    if (content.includes(emoji)) {
      content = content.replaceAll(emoji, icon);
      changed = true;
    }
  }

  // Also fix emojis inside the actual content (outside the links array)
  // e.g. 📅 Upcoming Sessions
  content = content.replaceAll('📅 Upcoming Sessions', '<Calendar size={20} className="inline mr-2" /> Upcoming Sessions');
  content = content.replaceAll('📚 Recent Materials', '<BookOpen size={20} className="inline mr-2" /> Recent Materials');
  content = content.replaceAll('🎓 Purchased Courses', '<GraduationCap size={20} className="inline mr-2" /> Purchased Courses');
  content = content.replaceAll('🤖 Need help with homework?', '<Bot size={20} className="inline mr-2" /> Need help with homework?');
  content = content.replaceAll('👑 Admin Actions', '<Crown size={20} className="inline mr-2" /> Admin Actions');
  content = content.replaceAll('⚙️ Platform Overview', '<Settings size={20} className="inline mr-2" /> Platform Overview');


  if (changed) {
    if (!content.includes('lucide-react')) {
      // add import after the first import
      const importIndex = content.indexOf('import ');
      if (importIndex !== -1) {
        const nextLineIndex = content.indexOf('\n', importIndex) + 1;
        content = content.substring(0, nextLineIndex) + requiredImports + content.substring(nextLineIndex);
      }
    }
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${filePath}`);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.jsx')) {
      processFile(fullPath);
    }
  }
}

walkDir(pagesDir);
