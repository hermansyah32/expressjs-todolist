import IndexSchema from "../../../Domains/IndexSchema";
import RegisterUser from "../../../Domains/users/schemas/RegisterUser";

export default class UserManUserCase {
  constructor(userRepository) {
    this._userRepository = userRepository;
  }

  async index(payload) {
    const indexSchema = new IndexSchema(payload);
    const result = await this._userRepository.index(indexSchema);
    return result;
  }

  async indexTrashed(payload) {
    const indexSchema = new IndexSchema(payload);
    const result = await this._userRepository.indexTrashed(indexSchema);
    return result;
  }

  async store(payload){
    const registerUser = new RegisterUser(payload);
    const result = await this._userRepository.store(registerUser);
    return result;
  }

  async show(id){
    const result = await this._userRepository.getBy('id', id);
    return result;
  }

  async showTrashed(id){
    const result = await this._userRepository.getTrashedBy('id', id);
    return result;
  }

  async update(id, payload){
    const result = await this._userRepository.updateBy('id', id, payload);
    return result;
  }

  async restore(id){
    const result = await this._userRepository.restoreBy('id', id);
    return result;
  }

  async destroy(id){
    const result = await this._userRepository.destroyBy('id', id);
    return result;
  }

  async permanentDestroy(id){
    const result = await this._userRepository.permanentDestroyBy('id', id);
    return result;
  }
}
