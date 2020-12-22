import { EntityManager, Repository } from "typeorm";
import { Service } from "typedi";

import { User } from "@/entity";
import { InjectRepository } from "@/decorators/InjectRepository";
import { InjectManager } from "@/decorators/InjectManager";

@Service()
export default class UserRepository {
  @InjectManager()
  private entityManager: EntityManager;

  constructor(
    @InjectRepository(User) private InjectRepository: Repository<User>
  ) {}

  saveUsingRepository(post: User) {
    return this.InjectRepository.save(post);
  }

  saveUsingManager(post: User) {
    return this.entityManager.save(post);
  }

  findAll() {
    return this.InjectRepository.find();
  }
}
