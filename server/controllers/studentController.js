import Student from '../models/Student.js';

// @desc    Register a student
// @route   POST /api/students
// @access  Private (or Public depending on use case, assuming Private for Dashboard)
export const registerStudent = async (req, res) => {
  const { name, regNo, marks, address, email, phone } = req.body;

  try {
    const studentExists = await Student.findOne({ $or: [{ email }, { regNo }] });

    if (studentExists) {
      return res.status(400).json({ message: 'Student with this email or Reg No already exists' });
    }

    const student = await Student.create({
      name,
      regNo,
      marks,
      address,
      email,
      phone
    });

    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all students (sorted by marks desc, projected fields)
// @route   GET /api/students
// @access  Private
export const getStudents = async (req, res) => {
  try {
    // 3. Sort by marks desc, 4. Projection
    const students = await Student.find({}, 'name regNo marks email phone')
      .sort({ marks: -1 });
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get student statistics (Aggregation Pipeline)
// @route   GET /api/students/stats
// @access  Private
export const getStudentStats = async (req, res) => {
  try {
    // 1 & 2: Group by marks range & count
    const marksDistribution = await Student.aggregate([
      {
        $project: {
          range: {
            $switch: {
              branches: [
                { case: { $lte: ['$marks', 40] }, then: '0-40' },
                { case: { $lte: ['$marks', 70] }, then: '41-70' },
                { case: { $lte: ['$marks', 100] }, then: '71-100' }
              ],
              default: 'Unknown'
            }
          }
        }
      },
      {
        $group: {
          _id: '$range',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    // 5 & 6: Average, Highest, Lowest
    const overallStats = await Student.aggregate([
      {
        $group: {
          _id: null,
          averageMarks: { $avg: '$marks' },
          highestScore: { $max: '$marks' },
          lowestScore: { $min: '$marks' },
          totalStudents: { $sum: 1 }
        }
      }
    ]);

    res.json({
      distribution: marksDistribution,
      stats: overallStats[0] || { averageMarks: 0, highestScore: 0, lowestScore: 0, totalStudents: 0 }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
