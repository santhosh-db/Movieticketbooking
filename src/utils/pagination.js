const getPagingData = (list, page, limit, totalcount) => {
    const total = Number(totalcount);
    const currentPage = page ? Number(page) : 1;
    const totalPages = Math.ceil(total / limit);
    const pageMeta = {};
    pageMeta.size = Number(limit);
    pageMeta.page = currentPage;
    pageMeta.total = total;
    pageMeta.totalPages = totalPages;
    return {
      pageMeta,
      list
    };
  };
  
  module.exports = getPagingData;
  