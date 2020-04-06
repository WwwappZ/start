var createReport = require('docx-templates');
const config = require('../config')
class Exporter {
  async word(event) {
    return await  createReport({template: config.PROJECT_DIR+ '/services/templates/evenementen.docx', output: config.PROJECT_DIR+ '/services/templates/evenementen-output.docx', data: event});
  }
}



module.exports = Exporter;
