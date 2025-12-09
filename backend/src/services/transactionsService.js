function getSort(sortBy, sortDir) {
  const direction = sortDir === "asc" ? 1 : -1;
  if (sortBy === "quantity") return { quantity: direction };
  if (sortBy === "customerName") return { customerName: direction };
  return { date: direction };
}

function toArray(value) {
  if (!value) return null;
  if (Array.isArray(value)) return value;
  return String(value)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function buildPipeline(query) {
  const {
    q,
    customerRegion,
    gender,
    ageMin,
    ageMax,
    productCategory,
    tags,
    paymentMethod,
    dateFrom,
    dateTo,
    sortBy = "date",
    sortDir = "desc",
    page = 1,
    limit = 10,
  } = query;

  const filters = {};

  if (toArray(customerRegion)) filters.customerRegion = { $in: toArray(customerRegion) };
  if (toArray(gender)) filters.gender = { $in: toArray(gender) };
  if (toArray(productCategory)) filters.productCategory = { $in: toArray(productCategory) };
  if (toArray(paymentMethod)) filters.paymentMethod = { $in: toArray(paymentMethod) };

  if (ageMin || ageMax) {
    filters.age = {};
    if (ageMin) filters.age.$gte = Number(ageMin);
    if (ageMax) filters.age.$lte = Number(ageMax);
  }

  if (dateFrom || dateTo) {
    filters.date = {};
    if (dateFrom) filters.date.$gte = new Date(dateFrom);
    if (dateTo) filters.date.$lte = new Date(dateTo);
  }

  if (toArray(tags)) filters.tags = { $in: toArray(tags) };

  const pipeline = [];
  if (Object.keys(filters).length) pipeline.push({ $match: filters });

  if (q) {
    pipeline.push({
      $match: {
        $or: [
          { phoneNumber: { $regex: q, $options: "i" } },
          { customerName: { $regex: q, $options: "i" } },
          { productName: { $regex: q, $options: "i" } },
          { transactionId: { $regex: q, $options: "i" } },
        ],
      },
    });
  }

  pipeline.push({
    $facet: {
      meta: [{ $count: "total" }],
      data: [
        { $sort: getSort(sortBy, sortDir) },
        { $skip: (Number(page) - 1) * Number(limit) },
        { $limit: Number(limit) },
      ],
    },
  });

  return pipeline;
}
