'use strict';

require('./answer.test.js');
require('./content.test.js');
require('./exam.test.js');
require('./function-track.test.js');
require('./solids.test.js');
require('./24.test.js');
require('./nim.test.js');
require('./accounts.test.js');
require('./account-ui.test.js');

process.exit(require('./harness').run() ? 1 : 0);
