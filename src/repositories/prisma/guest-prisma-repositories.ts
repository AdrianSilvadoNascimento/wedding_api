import { Injectable, NotFoundException, InternalServerErrorException } from "@nestjs/common";

import { PrismaService } from "../../database/prisma.service";
import { GuestRepository } from "../guest-repositories";
import { GuestModel } from "../../dtos/guest-model";
import { GuestEntity } from "../../entity/guest.entity";

@Injectable()
export class GuestPrismaRepository implements GuestRepository {
  constructor(private readonly prismaService: PrismaService) { }

  async createGuest(props: GuestModel): Promise<GuestEntity[]> {
    try {
      if (props.name.includes(',')) {
        const registeredGuests = await this.prismaService.guest.findMany()
        const guests = props.name.split(',').map((name: string) => name.trim())
        
        const newGuests = guests.filter((name: string) => {
          return !registeredGuests.some((guest: GuestEntity) => guest.name === name)
        })

        await this.prismaService.guest.createMany({
          data: newGuests.map((name: string) => ({
            name,
            is_by_hellen: props.is_by_hellen,
          })),
        });

        const createdGuests = await this.prismaService.guest.findMany({
          where: {
            name: { in: newGuests },
          },
        });

        return createdGuests;
      } else {
        const guest = await this.prismaService.guest.create({
          data: props,
        });
  
        if (!guest) throw new NotFoundException("Guest not found");
  
        return [guest];
      }
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

  async deleteGuest(id: string): Promise<GuestEntity[]> {
    try {
      const guest = await this.prismaService.guest.delete({
        where: { id },
      });

      if (!guest) throw new NotFoundException("Guest not found");

      return await this.prismaService.guest.findMany();
    } catch (error) {
      throw new InternalServerErrorException("Error deleting guest", error);      
    }
  }

  async getAllGuests(): Promise<GuestEntity[]> {
    const guests = await this.prismaService.guest.findMany();

    return guests;
  }
}