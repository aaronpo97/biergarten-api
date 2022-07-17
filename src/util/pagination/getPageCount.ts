/**
 * Helper function to determine the page count of an collection of resources.
 *
 * @param pageSize The size of each page.
 * @param totalCount The total count of resources.
 * @returns
 */
const getPageCount = (pageSize: number, totalCount: number) =>
  totalCount < pageSize ? 1 : Math.ceil(totalCount / pageSize);

export default getPageCount;
