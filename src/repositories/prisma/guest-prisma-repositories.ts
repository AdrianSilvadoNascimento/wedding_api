import { PrismaService } from "../../database/prisma.service";
import { GuestRepository } from "../guest-repositories";

export class GuestPrismaRepository implements GuestRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createGuest(props: any): Promise<any> {}
  async getGuestById(id: string): Promise<any> {}
  async updateGuest(id: string, props: any): Promise<any> {}
  async deleteGuest(id: string): Promise<any> {}
  async getAllGuests(): Promise<any[]> {
    const guests = await this.prismaService.guest.findMany();

    return guests;
  }
}