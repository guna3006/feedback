import { Injectable } from '@nestjs/common';
import { FeedbackDto } from './dto/feedback.dto';

@Injectable()
export class FeedbackService {
  private feedbackData: FeedbackDto[] = [];

  submit(feedback: FeedbackDto): any {
    this.feedbackData.push(feedback);
    return this.feedbackData;
  }

  async getAll(): Promise<FeedbackDto[]> {
    return this.feedbackData;
  }
}
