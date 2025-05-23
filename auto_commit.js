const { execSync } = require("child_process");

// ข้อความ commit อัตโนมัติ
const commitMessage = `Auto commit on ${new Date().toLocaleString()}`;

try {
  execSync('git config --global user.email "icafez4444@gmail.com"');
  execSync('git config --global user.name "kittipongrks"');

  execSync("git add .");
  execSync('git commit -m "${commitMessage}"');
  execSync("git push origin main");
  console.log("✅ Code committed & pushed successfully!");
} catch (error) {
  console.error("❌ Error:", error.message);
}
