import { Body, Controller, Get, HttpStatus, Post, Res, Response } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { FeedbackDto } from './dto/feedback.dto';

@Controller('feedback')
export class FeedbackController {
  feedbackData: FeedbackDto[] = [];
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post()
  submitFeedback(@Res() res, @Body() feedback: any): Response {
    this.feedbackService.submit(feedback);
    return res.status(HttpStatus.CREATED).json('Feedback submitted successfully');
  }
  
  @Get()
  async getAllFeedback(@Res() res): Promise<Response> {
    const feedbackData: FeedbackDto[] = await this.feedbackService.getAll();
    return res.status(HttpStatus.OK).json(feedbackData);
  }
}
