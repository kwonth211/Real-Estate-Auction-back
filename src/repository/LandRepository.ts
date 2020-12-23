import { EntityManager, Repository } from "typeorm";
import { Service } from "typedi";

import { Land } from "@/entity";
import { InjectRepository } from "@/decorators/InjectRepository";
import { InjectManager } from "@/decorators/InjectManager";

@Service()
export default class LandRepository {
  @InjectManager()
  private entityManager: EntityManager;

  constructor(
    @InjectRepository(Land) private InjectRepository: Repository<Land>
  ) {}

  saveUsingManager(land: Land) {
    return this.entityManager.save(land);
  }
  saveUsingRepository(land: Land) {
    return this.InjectRepository.save(land);
  }

  findAll() {
    return this.InjectRepository.find();
  }
  remove(entity) {
    return this.entityManager.remove(entity);
  }
}
