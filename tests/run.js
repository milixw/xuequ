'use strict';

// 测试入口：node tests/run.js
require('./answer.test.js');
require('./content.test.js');
require('./function-track.test.js');

process.exit(require('./harness').run() ? 1 : 0);
