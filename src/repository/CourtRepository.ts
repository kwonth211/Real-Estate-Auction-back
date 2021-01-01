import { EntityManager, Repository } from "typeorm";
import { Service } from "typedi";

import { Court } from "@/entity";
import { InjectRepository } from "@/decorators/InjectRepository";
import { InjectManager } from "@/decorators/InjectManager";

@Service()
export default class CourtRepository {
  @InjectManager()
  private entityManager: EntityManager;

  constructor(
    @InjectRepository(Court) private InjectRepository: Repository<Court>
  ) {}

  saveUsingManager(court: Court) {
    return this.entityManager.save(court);
  }
  //   saveUsingRepository(court: Court) {
  //     return this.InjectRepository.save(court);
  //   }

  findCourtList(relation) {
    return this.InjectRepository.find(relation);
  }
  delete(entity) {
    return this.InjectRepository.delete(entity);
  }

  clear() {
    return this.InjectRepository.clear();
  }
}
