export const getPaginationData = requestMeta => ({
  current: requestMeta['page-number'],
  total: requestMeta['filtered-count'] / requestMeta['page-size'],
});

export const getDetailedPaginationData = ({ result, meta }, entity) => {
  if (!result) return {};

  const count = result.length;
  const current = meta['page-number'];
  const size = meta['page-size'];
  const start = (current * size) + 1;
  const end = (current * size) + count;
  const paginationRangeString = count > 0 ? `${start}-${end} of` : '';
  const filteredCount = meta.filtered_count;
  const text = `Showing ${paginationRangeString} ${filteredCount} ${entity}`;
  const show = filteredCount > size;
  const todayCount = meta.due_today_count;
  const overdueCount = meta.over_due_count;
  const upcomingCount = meta.upcoming_count;
  const completedCount = meta.completed_count;

  return ({
    current,
    size,
    total: meta.filtered_count / meta['page-size'],
    totalCount: meta.total_count,
    filteredCount,
    text,
    show,
    todayCount,
    overdueCount,
    upcomingCount,
    completedCount,
  });
};
