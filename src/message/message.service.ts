import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMessageDto } from './dto';

@Injectable()
export class MessageService {
  constructor(private prisma: PrismaService) { }

  // Create a new message
  async createMessage(dto: CreateMessageDto) {
    try {
      return await this.prisma.message.create({
        data: {
          senderId: dto.senderId,
          receiverId: dto.receiverId,
          text: dto.text,
          isReceived: false,
        },
      });

    } catch (error) {
      throw new Error('Failed to create message: ' + error.message);
    }
  }

  // Retrieve new messages for a specific receiver
  async getNewMessages(receiverId: number) {
    try {
      return await this.prisma.message.findMany({
        where: {
          receiverId,
          isReceived: false,
        },
      });

    } catch (error) {
      throw new Error('Failed to retrieve new messages: ' + error.message);
    }
  }

  // Mark messages as received
  async markMessagesAsReceived(messageIds: number[]) {
    try {
      await this.prisma.$transaction(
        messageIds.map(id =>
          this.prisma.message.update({
            where: { id },
            data: { isReceived: true },
          }),
        ),
      );

      return { message: 'Messages marked as viewed.' };

    } catch (error) {
      throw new Error('Failed to mark messages as received: ' + error.message);
    }
  }

  // Count the number of viewed messages for a receiver
  async numberOfViewedMessages(receiverId: number) {
    try {
      return await this.prisma.message.count({
        where: {
          receiverId,
          isReceived: true,
        },
      });

    } catch (error) {
      throw new Error('Failed to count viewed messages: ' + error.message);
    }
  }

  // Delete all messages for a receiver
  async deleteAllMessages(receiverId: number) {
    try {
      await this._bulkDeleteMessages(receiverId);

    } catch (error) {
      throw new Error('Failed to delete messages: ' + error.message);
    }
  }

  // Private method to handle bulk message deletion
  private async _bulkDeleteMessages(userId: number) {
    await this.prisma.message.deleteMany({
      where: {
        OR: [
          { senderId: userId },
          { receiverId: userId },
        ],
      },
    });
  }
}