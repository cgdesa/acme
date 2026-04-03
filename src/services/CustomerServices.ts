
import prisma from '@/lib/prisma';
import {
  Customer,
  CreateCustomerData,
  UpdateCustomerData,
  FindAllCustomersParams,
  PaginatedReponse
} from '@/types';

const SORTABLE_FIELDS = ['name', 'email'] as const;

type SortableFields = (typeof SORTABLE_FIELDS)[number];

function isSortableFields(value: string): value is SortableFields {
  return (SORTABLE_FIELDS as readonly string[]).includes(value);
};

export async function findAllCustomers(
  params: FindAllCustomersParams
): Promise<PaginatedReponse<Customer>> {

  const {
    search,
    page = 1,
    limit = 10,
    sortBy = 'name',
    order = 'asc'
  } = params;

  const safePage = Math.max(1, page);
  const safeLimit = Math.min(Math.max(1, limit), 100);
  const skip = (safePage - 1) * safeLimit;

  const safeSortBy = isSortableFields(sortBy) ? sortBy : 'name';

  const where = search ? {
    OR: [
      { name: { contains: search, mode: 'insensitive' as const } },
      { email: { contains: search, mode: 'insensitive' as const } },
    ]
  } : undefined;

  const [customer, total] = await Promise.all([
    prisma.customer.findMany({
      where,
      orderBy: { [safeSortBy]: order },
      take: safeLimit,
      skip
    }),
    prisma.customer.count({ where })
  ]);

  const totalPages = Math.ceil(total / safeLimit);

  return {
    data: customer,
    meta: {
      total,
      page: safePage,
      limit: safeLimit,
      totalPages,
      hasMore: safePage < totalPages
    }
  };
};

export async function findCustomerById(
  id: string
): Promise<Customer | null> {

  const customer = await prisma.customer.findUnique({
    where: { id }
  });

  return customer;
};

export async function createCustomer(
  data: CreateCustomerData
): Promise<Customer> {

  const customer = await prisma.customer.create({
    data
  });

  return customer;
};

export async function updateCustomer(
  id: string,
  data: UpdateCustomerData
): Promise<Customer> {

  const customer = await prisma.customer.update({
    where: { id },
    data
  });

  return customer;
};

export async function deleteCustomer(
  id: string
): Promise<void> {

  await prisma.customer.delete({
    where: { id }
  });
};
