import { Test, TestingModule } from "@nestjs/testing";
import { ORDERS_REPOSITORY, OrdersRepository } from "../repositories/orders.repository.interface";
import { OrdersService } from "./orders.service";
import { OrderNotFoundException } from '../../../common/exceptions/order-not-found.exception';
import { PAYMENTS_REPOSITORY, PaymentsRepository } from "../../payments/repositories/payments.repository.interface";

describe('OrdersService', () => {
    let service: OrdersService;
    let ordersRepository: jest.Mocked<OrdersRepository>;
    let paymentsRepository: jest.Mocked<PaymentsRepository>;

    beforeEach(async () => {
        const ordersRepositoryMock: jest.Mocked<OrdersRepository> = {
            findById: jest.fn(),
            save: jest.fn(),
        };

        const paymentsRepositoryMock: jest.Mocked<PaymentsRepository> = {
            findByOrderId: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OrdersService,
                {
                    provide: ORDERS_REPOSITORY,
                    useValue: ordersRepositoryMock,
                },
                {
                    provide: PAYMENTS_REPOSITORY,
                    useValue: paymentsRepositoryMock,
                },
            ],
        }).compile();

        service = module.get<OrdersService>(OrdersService);
        ordersRepository = module.get(ORDERS_REPOSITORY);
        paymentsRepository = module.get(PAYMENTS_REPOSITORY);
    });


    it('should fail when order does not exist', async () => {
        ordersRepository.findById.mockResolvedValue(null);

        await expect(service.confirmOrder('order-1')).rejects.toThrow(
            OrderNotFoundException,
        );

        expect(ordersRepository.findById).toHaveBeenCalledWith('order-1');
        expect(paymentsRepository.findByOrderId).not.toHaveBeenCalled();
        expect(ordersRepository.save).not.toHaveBeenCalled();
    });
});