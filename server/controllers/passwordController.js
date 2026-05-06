import Password from '../models/Password.js';
import { encrypt, decrypt } from '../utils/encryption.js';

// @desc    Get all passwords for a user
// @route   GET /api/passwords
// @access  Private
export const getPasswords = async (req, res) => {
  try {
    const passwords = await Password.find({ createdBy: req.user._id }).sort({ createdAt: -1 });
    
    // Decrypt passwords before sending to frontend
    const decryptedPasswords = passwords.map(pwd => {
      const p = pwd.toObject();
      p.password = decrypt(p.password);
      return p;
    });

    res.json(decryptedPasswords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add a new password
// @route   POST /api/passwords
// @access  Private
export const createPassword = async (req, res) => {
  const { website, username, password, category, notes, favorite } = req.body;

  if (!website || !username || !password) {
    return res.status(400).json({ message: 'Please provide website, username, and password' });
  }

  try {
    const encryptedPassword = encrypt(password);

    const newPassword = await Password.create({
      website,
      username,
      password: encryptedPassword,
      category,
      notes,
      favorite,
      createdBy: req.user._id
    });

    res.status(201).json(newPassword);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a password
// @route   PUT /api/passwords/:id
// @access  Private
export const updatePassword = async (req, res) => {
  const { website, username, password, category, notes, favorite } = req.body;

  try {
    const pwd = await Password.findById(req.params.id);

    if (!pwd) {
      return res.status(404).json({ message: 'Password not found' });
    }

    if (pwd.createdBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    pwd.website = website || pwd.website;
    pwd.username = username || pwd.username;
    if (password) {
      pwd.password = encrypt(password);
    }
    pwd.category = category || pwd.category;
    pwd.notes = notes !== undefined ? notes : pwd.notes;
    pwd.favorite = favorite !== undefined ? favorite : pwd.favorite;

    const updatedPassword = await pwd.save();
    res.json(updatedPassword);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a password
// @route   DELETE /api/passwords/:id
// @access  Private
export const deletePassword = async (req, res) => {
  try {
    const pwd = await Password.findById(req.params.id);

    if (!pwd) {
      return res.status(404).json({ message: 'Password not found' });
    }

    if (pwd.createdBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    await pwd.deleteOne();
    res.json({ message: 'Password removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
