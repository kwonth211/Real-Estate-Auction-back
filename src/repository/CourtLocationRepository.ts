import { EntityManager, Repository } from "typeorm";
import { Service } from "typedi";

import { CourtLocation } from "@/entity";
import { InjectRepository } from "@/decorators/InjectRepository";
import { InjectManager } from "@/decorators/InjectManager";

@Service()
export default class CourtlocationRepository {
  @InjectManager()
  private entityManager: EntityManager;

  constructor(
    @InjectRepository(CourtLocation)
    private InjectRepository: Repository<CourtLocation>
  ) {}

  saveUsingManager(courtLocation: CourtLocation) {
    return this.entityManager.save(courtLocation);
  }
  //   saveUsingRepository(court: Court) {
  //     return this.InjectRepository.save(court);
  //   }

  findAll() {
    return this.InjectRepository.find();
  }
  remove(entity) {
    return this.entityManager.remove(entity);
  }
  clear() {
    return this.InjectRepository.clear();
  }
}
