export class CommonHelper {
  // const model: Article = CommonHelper.fromJS(Article, data);
  static fromJS<T>(type: (new () => T), data: any): T {
    if (!data) {
      return null;
    }
    data = typeof data === 'object' ? data : {};
    const result = new type();
    Object.assign(result, data);
    return result;
  }
}
