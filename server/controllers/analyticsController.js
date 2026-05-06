import Password from '../models/Password.js';

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

    // 4. Monthly activity (approximated by createdAt of passwords)
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

    // Format monthly activity for frontend chart
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
