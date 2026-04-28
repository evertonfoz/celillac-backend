import { Order } from '../entities/order.entity';

export const ORDERS_REPOSITORY = 'ORDERS_REPOSITORY';

export interface OrdersRepository {
    findById(id: string): Promise<Order | null>;
    save(order: Order): Promise<Order>;
}