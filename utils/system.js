/**
 * @File: system.js
 * @author: 夏花
 * @time: 2023-10-06
 */

import os from 'os';

/**
 * 获取系统信息
 * @returns {string} 包含平台、主机名、系统版本、当前用户、用户主目录、字节顺序的字符串
 */
const systemInformation = () => {
    const platform = os.platform();
    const hostname = os.hostname();
    const release = os.release();
    const username = os.userInfo().username;
    const homedir = os.homedir();
    const endianness = os.endianness();
    return `
    平台: ${platform},
    主机名: ${hostname},
    系统版本: ${release},
    当前用户: ${username},
    用户主目录: ${homedir},
    字节顺序: ${endianness}`;
};

/**
 * 获取操作系统类型
 * @returns {string} 操作系统类型字符串
 */
const osType = () => {
    return os.type();
};

/**
 * 包含系统信息和操作系统类型的对象
 * @type {Object}
 */
let system;

export default system = { systemInformation, osType };
