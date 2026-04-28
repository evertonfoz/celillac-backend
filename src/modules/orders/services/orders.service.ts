import { Inject, Injectable } from '@nestjs/common';
import { ORDERS_REPOSITORY } from '../repositories/orders.repository.interface';
import { PAYMENTS_REPOSITORY } from '../../payments/repositories/payments.repository.interface';
import type { OrdersRepository } from '../repositories/orders.repository.interface';
import type { PaymentsRepository } from '../../payments/repositories/payments.repository.interface';
import { OrderNotFoundException } from '../../../common/exceptions/order-not-found.exception';

@Injectable()
export class OrdersService {
    constructor(
        @Inject(ORDERS_REPOSITORY)
        private readonly ordersRepository: OrdersRepository,
        @Inject(PAYMENTS_REPOSITORY)
        private readonly paymentsRepository: PaymentsRepository,
    ) { }

    async confirmOrder(orderId: string) {
        const order = await this.ordersRepository.findById(orderId);

        if (!order) {
            throw new OrderNotFoundException(orderId);
        }

        throw new Error('Not implemented yet');
    }
}