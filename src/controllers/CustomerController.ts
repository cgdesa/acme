// zod - validador de regex.

import { z } from 'zod';
import {
    findAllCustomers,
    findCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer
} from '@/services/CustomerServices';
import { ApiError } from '@/types';
import { email } from 'zod/v4';
import { parse } from 'path';
import { parsedType } from 'zod/v4/locales/en.cjs';

const CreateCustomerSchema = z.object({
    name: z
    .string({ required_error: 'O campo é obrigatório.' }) 
    .min(1) 
    .max(100),
    email: z
    .string({ required_error: 'O campo é obrigatório.'})
    .email('O campo possui o formato inválido.'),
    imageUrl: z
    .string({ required_error: 'O campo é obritório' })
    .url('O campo possui formato inválido')
});

const UpdateCustomerSchema = CreateCustomerSchema.partial();

export type createCustomerDTO = z.infer<typeof CreateCustomerSchema>;
export type UpdateCustomerSchema = z.infer<typeof UpdateCustomerSchema>;

function buildErrorResponse (
    message: string,
    details?: Record<string, string[]>
): ApiError {

    if (details) {
        return {error: message, details };
    };

    return { error: message };
};

export const CustomerController = {
    async getAll(searchParams: URLSearchParams) {
        const search = searchParams.get('search') ?? undefined;

        const customers = await findAllCustomers({ search });

        return {
            status: 200,
            body: customers
        };
    },
    async getById(id: string) {
        const customer = await findCustomerById(id);

        if (!customer) {
            return {
                status: 404,
                body: buildErrorResponse('Cliente não encontrado')
            };
        };

        return {
            status: 200,
            body: customer
        };
    },
    async create(data: unknown) {
        const parsed = CreateCustomerSchema.safeParse(data);

        if (!parsed.success) {
            return {
                status: 400,
                body: buildErrorResponse(
                    'Dados inválidos',
                    parsed.error.flatten().fieldErrors as Record<string, string[]>
                )
            };
        };

        const customer = await createCustomer(parse.data);

        return {
            status: 201,
            body: customer
        };
    },
    async update(id: string, data: unknown) {
     const existing = await findCustomerById(id);
     
       if (!parsed.success) {
            return {
                status: 400,
                body: buildErrorResponse(
                    'Dados inválidos',
                    parsed.error.flatten().fieldErrors as Record<string, string[]>
                )
            };
        };

        const customer = await updateCustomer(id, parsed.data);
    },
    async remove(id: string) {
        const existing = await findCustomerById(id);

    if (!existing) {
      return {
        status: 404,
        body: buildErrorResponse('Cliente não encontrado.')
      };
    };

    await deleteCustomer(id);
    return{
        status: 200,
        body: { message: 'Cliente removido com sucesso.'}
    }
    }
}; 
