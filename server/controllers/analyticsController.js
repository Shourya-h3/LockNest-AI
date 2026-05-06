import Password from '../models/Password.js';
import { decrypt } from '../utils/encryption.js';

// @desc    Get dashboard analytics
// @route   GET /api/analytics
// @access  Private
export const getDashboardAnalytics = async (req, res) => {
  try {
    const userId = req.user._id;

    // 1. Category Distribution
    const categoryDistribution = await Password.aggregate([
      { $match: { createdBy: userId } },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      }
    ]);

    // 2. Favorite count
    const favoriteCount = await Password.countDocuments({ createdBy: userId, favorite: true });

    // 3. Total Passwords
    const totalPasswords = await Password.countDocuments({ createdBy: userId });

    // 4. Monthly activity
    const monthlyActivity = await Password.aggregate([
      { $match: { createdBy: userId } },
      {
        $group: {
          _id: { $month: '$createdAt' },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const formattedMonthlyActivity = monthlyActivity.map(item => ({
      month: monthNames[item._id - 1],
      count: item.count
    }));

    res.json({
      totalPasswords,
      favoritePasswords: favoriteCount,
      categoryDistribution,
      monthlyActivity: formattedMonthlyActivity
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Perform AI security audit on vault
// @route   GET /api/analytics/audit
// @access  Private
export const getSecurityAudit = async (req, res) => {
  try {
    const userId = req.user._id;
    const passwords = await Password.find({ createdBy: userId });

    if (passwords.length === 0) {
      return res.json({
        score: 100,
        stats: { weak: 0, reused: 0, strong: 0 },
        recommendations: ["Start adding passwords to your vault to begin the AI security audit."]
      });
    }

    let weakCount = 0;
    let reusedCount = 0;
    let strongCount = 0;
    const passwordMap = new Map();
    const insights = [];

    passwords.forEach(p => {
      const decrypted = decrypt(p.password);
      
      if (passwordMap.has(decrypted)) {
        reusedCount++;
        passwordMap.set(decrypted, passwordMap.get(decrypted) + 1);
      } else {
        passwordMap.set(decrypted, 1);
      }

      const hasUpper = /[A-Z]/.test(decrypted);
      const hasLower = /[a-z]/.test(decrypted);
      const hasNumber = /[0-9]/.test(decrypted);
      const hasSpecial = /[^A-Za-z0-9]/.test(decrypted);
      
      const strengthPoints = [hasUpper, hasLower, hasNumber, hasSpecial].filter(Boolean).length;
      
      if (decrypted.length < 8 || strengthPoints < 2) {
        weakCount++;
      } else if (decrypted.length >= 12 && strengthPoints >= 3) {
        strongCount++;
      }
    });

    const total = passwords.length;
    const reusePenalty = (reusedCount / total) * 40;
    const weaknessPenalty = (weakCount / total) * 40;
    const score = Math.max(0, Math.min(100, 100 - (reusePenalty + weaknessPenalty)));

    if (weakCount > 0) insights.push(`You have ${weakCount} weak passwords. We recommend using at least 12 characters with symbols.`);
    if (reusedCount > 0) insights.push(`Security alert: ${reusedCount} passwords are being reused. Reusing passwords across sites is a major risk.`);
    if (score > 90) insights.push("Excellent work! Your vault security posture is elite.");
    else if (score > 70) insights.push("Good security, but there is room for optimization.");
    else insights.push("Urgent: Your security posture is vulnerable. Follow the recommendations above.");

    res.json({
      score: Math.round(score),
      stats: {
        weak: weakCount,
        reused: reusedCount,
        strong: strongCount,
        total: total
      },
      recommendations: insights
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
