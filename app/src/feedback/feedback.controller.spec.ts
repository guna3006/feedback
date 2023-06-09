import { Test, TestingModule } from '@nestjs/testing';
import { FeedbackController } from './feedback.controller';
import { FeedbackService } from './feedback.service';

describe('FeedbackController', () => {
  let controller: FeedbackController;
  let service: FeedbackService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeedbackController],
      providers: [FeedbackService],
    }).compile();

    controller = module.get<FeedbackController>(FeedbackController);
    service = module.get<FeedbackService>(FeedbackService);
  });

  describe('submitFeedback', () => {
    it('should submit feedback and return success message', () => {
      const feedback = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      const expectedResponse = 'Feedback submitted successfully';

      jest.spyOn(service, 'submit').mockImplementation(() => {});

      controller.submitFeedback(res, feedback);

      expect(service.submit).toHaveBeenCalledWith(feedback);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(expectedResponse);
    });
  });

  describe('getAllFeedback', () => {
    it('should return all feedback data', async () => {
      const feedbackData = [];
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      jest.spyOn(service, 'getAll').mockResolvedValue(feedbackData);

      await controller.getAllFeedback(res);

      expect(service.getAll).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(feedbackData);
    });
  });
});
