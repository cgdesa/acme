import prisma from '@/lib/prisma';
import {
    Customer,
    CreateCustomerData,
    UpdateCustomerData
} from '@/types';

interface FindallParamrs {
    Search?: string;
}

async function findAllCustomers(
    params: FindAllParams = {}
): Promise<Customer[]> {

    const { search } = params;

    const customers = await prisma.customer.findMany({
        where: search ? {
            OR: [
                { name: { contains: search, mode: 'insensitive'} },
                { email: { contains: search, mode: 'insensitive'} }
            ]
        } : undefined,
        orderBy : { name : 'asc'}
    });
    
    return customers;
};

export async function findCustomerByid(
    id: string
): Promise<Customer | null> {

    const customer = await prisma.customer.findUnique({
        where: {id}
    });

    return customer;
};

export async function CreateCustomer (
    data: CreateCustomerData
): Promise<Customer>  {

    const customer = await prisma.customer.create({
        data
    });
    
};

export async function updateCustomer(
  id: string,
  data: UpdateCustomerData
): Promise<Customer> {

  const customer = await prisma.customer.update({
    where: { id },
    data
  });
};

export async function deleteCustomer(
    id: string
): Promise<void> {

    await prisma.customer.delete({
        where: { id },
    })
}
