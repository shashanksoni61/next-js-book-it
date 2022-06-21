export class APIFeature {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const location = this.queryStr.location
      ? {
          address: {
            $regex: this.queryStr.location,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...location });
    return this;
  }

  filter() {
    const queryStrCopy = { ...this.queryStr };

    const removeFields = ["location"];
    removeFields.forEach((f) => delete queryStrCopy[f]);

    this.query = this.query.find(queryStrCopy);
    return this;
  }
}
