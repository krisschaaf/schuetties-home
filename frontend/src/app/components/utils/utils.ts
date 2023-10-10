export abstract class Utils {
    // https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value
    static dynamicSort(property: string) {
      let sortOrder = 1;
      if (property[0] === "-") {
        sortOrder = -1;
        property = property.substring(1);
      }
      return (a: any, b: any) => {
        const result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
      }
    }
}