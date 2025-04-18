import { Injectable, NotFoundException, InternalServerErrorException } from "@nestjs/common";

import { PrismaService } from "../../database/prisma.service";
import { GuestRepository } from "../guest-repositories";
import { GuestModel } from "../../dtos/guest-model";
import { GuestEntity } from "../../entity/guest.entity";

@Injectable()
export class GuestPrismaRepository implements GuestRepository {
  constructor(private readonly prismaService: PrismaService) { }

  async createGuest(props: GuestModel): Promise<GuestEntity> {
    try {      
      const guest = await this.prismaService.guest.create({
        data: props,
      });

      if (!guest) throw new NotFoundException("Guest not found");

      return guest;
    } catch (error) {
      throw new InternalServerErrorException("Error creating guest", error);
    }
  }

  async getGuestById(id: string): Promise<GuestEntity> {
    try {
      const guest = await this.prismaService.guest.findUnique({
        where: { id },
      });

      if (!guest) throw new NotFoundException("Guest not found");

      return guest;
    } catch (error) {
      throw new InternalServerErrorException("Error getting guest", error);      
    }
  }

  async updateGuest(id: string, props: GuestModel): Promise<GuestEntity> {
    try {
      const guest = await this.prismaService.guest.update({
        where: { id },
        data: props,
      });

      if (!guest) throw new NotFoundException("Guest not found");

      return guest;
    } catch (error) {
      throw new InternalServerErrorException("Error updating guest", error);      
    }
  }

  async deleteGuest(id: string): Promise<GuestEntity> {
    try {
      const guest = await this.prismaService.guest.delete({
        where: { id },
      });

      if (!guest) throw new NotFoundException("Guest not found");

      return guest;
    } catch (error) {
      throw new InternalServerErrorException("Error deleting guest", error);      
    }
  }

  async getAllGuests(): Promise<GuestEntity[]> {
    const guests = await this.prismaService.guest.findMany();

    return guests;
  }
}