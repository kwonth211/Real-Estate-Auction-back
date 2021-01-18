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

  // saveUsingRepository(post: User) {
  //   return this.InjectRepository.save(post);
  // }

  saveUsingManager(user: User) {
    return this.entityManager.save(user);
  }

  findAll() {
    return this.InjectRepository.find();
  }
}
