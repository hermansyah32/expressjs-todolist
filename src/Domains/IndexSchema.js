export default class IndexSchema {
  constructor(page = 1, count = 15, search = []) {
    this.page = page;
    this.count = count;
    this.search = search; // TODO: filter search not implemented yet
  }
}
