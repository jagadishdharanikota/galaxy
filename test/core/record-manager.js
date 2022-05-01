class RecordManager {
  constructor() {
    this.recordStore = {};
  }

  addRecord(name, record) {
    if (name && record) {
      this.recordStore[name] = record;
    }
  }

  getRecord(name) {
    return name ? this.recordStore[name] : undefined;
  }
}

export default new RecordManager();
