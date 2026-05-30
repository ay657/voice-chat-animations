import fs from 'fs';
import path from 'path';

/**
 * File Handler Utility
 * Provides functions for managing animation assets
 */

export const SUPPORTED_FORMATS = {
  frames: ['png', 'webp'],
  gifts: ['mp4', 'json'],
  effects: ['svg', 'png']
};

export const ASSET_PATHS = {
  frames: path.resolve('./assets/frames'),
  gifts: path.resolve('./assets/gifts'),
  effects: path.resolve('./assets/effects')
};

/**
 * Get all files in a directory
 * @param {string} dirPath - Directory path
 * @returns {Promise<Array>} Array of file objects
 */
export const getFilesInDirectory = async (dirPath) => {
  try {
    const files = fs.readdirSync(dirPath);
    return files.map(file => ({
      name: file,
      path: path.join(dirPath, file),
      extension: path.extname(file)
    }));
  } catch (error) {
    console.error('Error reading directory:', error);
    return [];
  }
};

/**
 * Check if file exists
 * @param {string} filePath - File path
 * @returns {boolean} File exists or not
 */
export const fileExists = (filePath) => {
  return fs.existsSync(filePath);
};

/**
 * Get file info
 * @param {string} filePath - File path
 * @returns {Object} File information
 */
export const getFileInfo = (filePath) => {
  try {
    const stats = fs.statSync(filePath);
    return {
      path: filePath,
      size: stats.size,
      created: stats.birthtime,
      modified: stats.mtime,
      isFile: stats.isFile(),
      isDirectory: stats.isDirectory()
    };
  } catch (error) {
    console.error('Error getting file info:', error);
    return null;
  }
};

/**
 * Get file size in MB
 * @param {string} filePath - File path
 * @returns {number} File size in MB
 */
export const getFileSizeInMB = (filePath) => {
  try {
    const stats = fs.statSync(filePath);
    return (stats.size / (1024 * 1024)).toFixed(2);
  } catch (error) {
    console.error('Error getting file size:', error);
    return 0;
  }
};

/**
 * Validate file format
 * @param {string} filePath - File path
 * @param {Array} allowedFormats - Allowed formats
 * @returns {boolean} Is valid format
 */
export const isValidFormat = (filePath, allowedFormats) => {
  const extension = path.extname(filePath).replace('.', '').toLowerCase();
  return allowedFormats.includes(extension);
};

/**
 * Get all animation assets
 * @returns {Promise<Object>} All assets by type
 */
export const getAllAssets = async () => {
  try {
    const frames = await getFilesInDirectory(ASSET_PATHS.frames);
    const gifts = await getFilesInDirectory(ASSET_PATHS.gifts);
    const effects = await getFilesInDirectory(ASSET_PATHS.effects);
    
    return {
      frames,
      gifts,
      effects
    };
  } catch (error) {
    console.error('Error getting assets:', error);
    return { frames: [], gifts: [], effects: [] };
  }
};
